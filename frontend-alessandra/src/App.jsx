import React, { useEffect, useState } from "react";
import "./App.css";  // <-- Importa el CSS

function App() {
  const apiUrl = "http://52.201.187.123:8000";
  const [libros, setLibros] = useState([]);
  const [form, setForm] = useState({ titulo: "", autor: "", anio: "" });
  const [editId, setEditId] = useState(null);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    cargarLibros();
    fetch(`${apiUrl}/ulloa`)
      .then(r => r.json())
      .then(d => setNombre(d.nombreCompleto));
  }, []);

  const cargarLibros = () => {
    fetch(`${apiUrl}/api/libros`).then(r => r.json()).then(setLibros);
  };

  const guardarLibro = async () => {
    const metodo = editId ? "PUT" : "POST";
    const url = editId ? `${apiUrl}/api/libros/${editId}` : `${apiUrl}/api/libros`;
    await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ titulo: "", autor: "", anio: "" });
    setEditId(null);
    cargarLibros();
  };

  const eliminarLibro = async (id) => {
    await fetch(`${apiUrl}/api/libros/${id}`, { method: "DELETE" });
    cargarLibros();
  };

  const editarLibro = (libro) => {
    setForm(libro);
    setEditId(libro.id);
  };

  return (
    <div className="container">
      <h1 className="title">📚 Librería de {nombre}</h1>

      <div className="form">
        <input placeholder="Título" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
        <input placeholder="Autor" value={form.autor} onChange={e => setForm({ ...form, autor: e.target.value })} />
        <input placeholder="Año" type="number" value={form.anio} onChange={e => setForm({ ...form, anio: e.target.value })} />
        <button className="button" onClick={guardarLibro}>{editId ? "Actualizar" : "Agregar"}</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.titulo}</td>
              <td>{l.autor}</td>
              <td>{l.anio}</td>
              <td className="action-buttons">
                <button className="button" onClick={() => editarLibro(l)}>Editar</button>
                <button className="button-danger" onClick={() => eliminarLibro(l.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
