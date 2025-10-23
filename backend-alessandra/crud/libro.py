from sqlalchemy.orm import Session
from models.libro import Libro
from schemas.libro import LibroCreate

def get_libros(db: Session):
    return db.query(Libro).all()

def get_libro(db: Session, libro_id: int):
    return db.query(Libro).filter(Libro.id == libro_id).first()

def create_libro(db: Session, libro: LibroCreate):
    nuevo = Libro(**libro.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

def update_libro(db: Session, libro_id: int, libro: LibroCreate):
    existente = get_libro(db, libro_id)
    if not existente:
        return None
    for key, value in libro.dict().items():
        setattr(existente, key, value)
    db.commit()
    db.refresh(existente)
    return existente

def delete_libro(db: Session, libro_id: int):
    libro = get_libro(db, libro_id)
    if not libro:
        return None
    db.delete(libro)
    db.commit()
    return libro
