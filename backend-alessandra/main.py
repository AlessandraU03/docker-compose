from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
import os
import time
from dotenv import load_dotenv

load_dotenv()

# Variables de entorno
DB_USER = os.getenv("DB_USER", "alessandra")
DB_PASSWORD = os.getenv("DB_PASSWORD", "lagartija")
DB_HOST = os.getenv("DB_HOST", "52.201.187.123")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "db_ulloa_")

TUNOMBRE = os.getenv("TUNOMBRE", "Alessandra")
TUAPELLIDO = os.getenv("TUAPELLIDO", "Ulloa")

DATABASE_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Esperar a que la base de datos esté lista
for i in range(10):
    try:
        engine = create_engine(DATABASE_URL, echo=False)
        with engine.connect() as conn:
            print("✅ Conectado a la base de datos correctamente.")
            break
    except Exception as e:
        print(f"DB no lista ({e}), reintentando... ({i+1}/10)")
        time.sleep(2)
else:
    raise Exception("❌ No se pudo conectar a la base de datos después de varios intentos.")

# Configuración de SQLAlchemy
Base = declarative_base()

class Libro(Base):
    __tablename__ = "libros"
    id = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(100), nullable=False)
    autor = Column(String(100), nullable=False)
    anio = Column(Integer, nullable=False)

Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)

# Crear FastAPI
app = FastAPI(title=f"Librería de {TUNOMBRE} {TUAPELLIDO}")

# -------------------
# CORS
# -------------------
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo Pydantic
class LibroCreate(BaseModel):
    titulo: str
    autor: str
    anio: int

# Endpoints
@app.get("/")
def root():
    return {"mensaje": f"Librería de {TUNOMBRE} {TUAPELLIDO}"}

@app.get(f"/{TUAPELLIDO.lower()}")
def nombre_completo():
    return {"nombreCompleto": f"{TUNOMBRE} {TUAPELLIDO}"}

@app.get("/api/libros")
def listar_libros():
    session = SessionLocal()
    libros = session.query(Libro).all()
    session.close()
    return libros

@app.post("/api/libros")
def crear_libro(libro: LibroCreate):
    session = SessionLocal()
    nuevo = Libro(titulo=libro.titulo, autor=libro.autor, anio=libro.anio)
    session.add(nuevo)
    session.commit()
    session.refresh(nuevo)
    session.close()
    return nuevo

@app.put("/api/libros/{libro_id}")
def actualizar_libro(libro_id: int, libro: LibroCreate):
    session = SessionLocal()
    existente = session.query(Libro).filter(Libro.id == libro_id).first()
    if not existente:
        session.close()
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    existente.titulo = libro.titulo
    existente.autor = libro.autor
    existente.anio = libro.anio
    session.commit()
    session.refresh(existente)
    session.close()
    return existente

@app.delete("/api/libros/{libro_id}")
def eliminar_libro(libro_id: int):
    session = SessionLocal()
    libro = session.query(Libro).filter(Libro.id == libro_id).first()
    if not libro:
        session.close()
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    session.delete(libro)
    session.commit()
    session.close()
    return {"mensaje": "Libro eliminado correctamente"}
