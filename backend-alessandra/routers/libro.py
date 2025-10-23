from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.database import SessionLocal
from schemas.libro import LibroCreate, LibroResponse
from crud import libro as crud

router = APIRouter(prefix="/api/libros", tags=["Libros"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[LibroResponse])
def listar_libros(db: Session = Depends(get_db)):
    return crud.get_libros(db)

@router.post("/", response_model=LibroResponse)
def crear_libro(libro: LibroCreate, db: Session = Depends(get_db)):
    return crud.create_libro(db, libro)

@router.put("/{libro_id}", response_model=LibroResponse)
def actualizar_libro(libro_id: int, libro: LibroCreate, db: Session = Depends(get_db)):
    actualizado = crud.update_libro(db, libro_id, libro)
    if not actualizado:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    return actualizado

@router.delete("/{libro_id}")
def eliminar_libro(libro_id: int, db: Session = Depends(get_db)):
    eliminado = crud.delete_libro(db, libro_id)
    if not eliminado:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    return {"mensaje": "Libro eliminado correctamente"}
