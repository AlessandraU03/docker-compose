import React from "react";

function LibroForm({ form, setForm, onSubmit, editId }) {
  return (
    <div className="form">
      <input
        placeholder="Título"
        value={form.titulo}
        onChange={(e) => setForm({ ...form, titulo: e.target.value })}
      />
      <input
        placeholder="Autor"
        value={form.autor}
        onChange={(e) => setForm({ ...form, autor: e.target.value })}
      />
      <input
        placeholder="Año"
        type="number"
        value={form.anio}
        onChange={(e) => setForm({ ...form, anio: e.target.value })}
      />
      <button className="button" onClick={onSubmit}>
        {editId ? "Actualizar" : "Agregar"}
      </button>
    </div>
  );
}

export default LibroForm;
