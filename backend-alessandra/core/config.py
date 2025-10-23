import os
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER", "alessandra")
DB_PASSWORD = os.getenv("DB_PASSWORD", "lagartija")
DB_HOST = os.getenv("DB_HOST", "52.201.187.123")
DB_PORT = os.getenv("DB_PORT", "3306")
DB_NAME = os.getenv("DB_NAME", "db_ulloa_")

TUNOMBRE = os.getenv("TUNOMBRE", "Alessandra")
TUAPELLIDO = os.getenv("TUAPELLIDO", "Ulloa")

DATABASE_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
