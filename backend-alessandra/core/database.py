from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
import time
from .config import DATABASE_URL

Base = declarative_base()

# Intentar conectar con reintentos
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

SessionLocal = sessionmaker(bind=engine)
