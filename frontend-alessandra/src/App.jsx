import React, { useEffect, useState } from "react";

function App() {
  const apiUrl = "http://52.201.187.123:8000";
  const [libros, setLibros] = useState([]);
  const [form, setForm] = useState({ titulo: "", autor: "", anio: "" });
  const [editId, setEditId] = useState(null);
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    cargarLibros();
    fetch(`${apiUrl}/ulloa`)  // Cambia 'perez' por tu apellido
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
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>📚 Librería de {nombre}</h1>
      <div>
        <input placeholder="Título" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
        <input placeholder="Autor" value={form.autor} onChange={e => setForm({ ...form, autor: e.target.value })} />
        <input placeholder="Año" value={form.anio} onChange={e => setForm({ ...form, anio: e.target.value })} type="number" />
        <button onClick={guardarLibro}>{editId ? "Actualizar" : "Agregar"}</button>
      </div>

      <table border="1" cellPadding="5" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>ID</th><th>Título</th><th>Autor</th><th>Año</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.titulo}</td>
              <td>{l.autor}</td>
              <td>{l.anio}</td>
              <td>
                <button onClick={() => editarLibro(l)}>Editar</button>
                <button onClick={() => eliminarLibro(l.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
