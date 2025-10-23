from sqlalchemy import Column, Integer, String
from core.database import Base

class Libro(Base):
    __tablename__ = "libros"

    id = Column(Integer, primary_key=True, autoincrement=True)
    titulo = Column(String(100), nullable=False)
    autor = Column(String(100), nullable=False)
    anio = Column(Integer, nullable=False)
