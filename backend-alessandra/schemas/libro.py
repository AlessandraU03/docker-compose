from pydantic import BaseModel

class LibroBase(BaseModel):
    titulo: str
    autor: str
    anio: int

class LibroCreate(LibroBase):
    pass

class LibroResponse(LibroBase):
    id: int

    class Config:
        orm_mode = True
