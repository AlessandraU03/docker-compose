const apiUrl = "http://52.201.187.123:8000";

export async function getNombre() {
  const res = await fetch(`${apiUrl}/ulloa`);
  return res.json();
}

export async function getLibros() {
  const res = await fetch(`${apiUrl}/api/libros`);
  return res.json();
}

export async function createLibro(libro) {
  const res = await fetch(`${apiUrl}/api/libros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(libro),
  });
  return res.json();
}

export async function updateLibro(id, libro) {
  const res = await fetch(`${apiUrl}/api/libros/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(libro),
  });
  return res.json();
}

export async function deleteLibro(id) {
  await fetch(`${apiUrl}/api/libros/${id}`, { method: "DELETE" });
}
