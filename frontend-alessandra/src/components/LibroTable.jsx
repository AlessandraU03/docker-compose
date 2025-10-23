import React from "react";

function LibroTable({ libros, onEdit, onDelete }) {
  return (
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
        {libros.map((l) => (
          <tr key={l.id}>
            <td>{l.id}</td>
            <td>{l.titulo}</td>
            <td>{l.autor}</td>
            <td>{l.anio}</td>
            <td className="action-buttons">
              <button className="button" onClick={() => onEdit(l)}>
                Editar
              </button>
              <button
                className="button-danger"
                onClick={() => onDelete(l.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LibroTable;
