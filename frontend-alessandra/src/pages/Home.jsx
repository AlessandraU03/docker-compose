import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import LibroForm from "../components/LibroForm";
import LibroTable from "../components/LibroTable";
import {
  getNombre,
  getLibros,
  createLibro,
  updateLibro,
  deleteLibro,
} from "../api/librosApi";

function Home() {
  const [libros, setLibros] = useState([]);
  const [form, setForm] = useState({ titulo: "", autor: "", anio: "" });
  const [editId, setEditId] = useState(null);
  const [nombre, setNombre] = useState("");

  const cargarLibros = async () => {
    const data = await getLibros();
    setLibros(data);
  };

  useEffect(() => {
    cargarLibros();
    getNombre().then((d) => setNombre(d.nombreCompleto));
  }, []);

  const guardarLibro = async () => {
    if (editId) {
      await updateLibro(editId, form);
    } else {
      await createLibro(form);
    }
    setForm({ titulo: "", autor: "", anio: "" });
    setEditId(null);
    cargarLibros();
  };

  const eliminarLibroClick = async (id) => {
    await deleteLibro(id);
    cargarLibros();
  };

  const editarLibroClick = (libro) => {
    setForm(libro);
    setEditId(libro.id);
  };

  return (
    <div className="container">
      <Header nombre={nombre} />
      <LibroForm
        form={form}
        setForm={setForm}
        onSubmit={guardarLibro}
        editId={editId}
      />
      <LibroTable
        libros={libros}
        onEdit={editarLibroClick}
        onDelete={eliminarLibroClick}
      />
    </div>
  );
}

export default Home;
