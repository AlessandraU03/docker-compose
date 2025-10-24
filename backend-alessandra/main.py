from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import libro
from core.config import TUNOMBRE, TUAPELLIDO
from core.database import Base, engine

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title=f"Librería de {TUNOMBRE} {TUAPELLIDO}")

# CORS
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://52.201.187.123:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas principales
@app.get("/")
def root():
    return {"mensaje": f"Librería de {TUNOMBRE} {TUAPELLIDO}"}

@app.get("/ulloa")
def nombre_completo():
    return {"nombreCompleto": "Alessandra Guadalupe Ulloa López"}

# Registrar router de libros
app.include_router(libro.router)
