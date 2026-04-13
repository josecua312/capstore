"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function Admin() {

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [productos, setProductos] = useState<any[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // 🔹 OBTENER PRODUCTOS
  async function obtenerProductos() {
    const { data, error } = await supabase
      .from("productos")
      .select("*");

    if (error) console.log(error);
    else setProductos(data || []);
  }

  // 🔹 CARGAR AL INICIAR
  useEffect(() => {
    obtenerProductos();
  }, []);

  // 🔹 AGREGAR / EDITAR
  async function agregarProducto() {

    if (editandoId) {
      const { error } = await supabase
        .from("productos")
        .update({
          nombre,
          precio: Number(precio),
          imagen,
        })
        .eq("id", editandoId);

      if (error) alert("Error al editar");
      else {
        alert("Producto actualizado");
        setEditandoId(null);
      }

    } else {
      const { error } = await supabase
        .from("productos")
        .insert([
          { nombre, precio: Number(precio), imagen }
        ]);

      if (error) alert("Error al guardar producto");
      else alert("Producto agregado");
    }

    setNombre("");
    setPrecio("");
    setImagen("");

    obtenerProductos();
  }

  // 🔹 EDITAR
  function editarProducto(p: any) {
    setNombre(p.nombre);
    setPrecio(p.precio.toString());
    setImagen(p.imagen);
    setEditandoId(p.id);
  }

  // 🔹 ELIMINAR
  async function eliminarProducto(id: number) {
  console.log("ID a eliminar:", id);

  const { data, error } = await supabase
    .from("productos")
    .delete()
    .eq("id", id)
    .select(); // 👈 IMPORTANTE

  console.log("Resultado:", data);

  if (error) {
    console.log(error);
    alert("Error al eliminar");
  } else {
    alert("Producto eliminado");
    obtenerProductos();
  }
}

return (
  <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-10">

    <h1 className="text-4xl font-extrabold mb-10">
  Panel <span className="text-yellow-400">CapStore</span>
</h1>
      {/* FORMULARIO */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl w-full max-w-md shadow-xl mb-10">

        <input
          type="text"
          placeholder="Nombre producto"
       className="w-full mb-3 p-3 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Precio"
          className="w-full mb-3 p-3 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <input
          type="text"
          placeholder="URL Imagen"
          className="w-full mb-3 p-3 rounded-lg bg-black/30 border border-white/20 text-white placeholder-gray-400"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />

        <button
          onClick={agregarProducto}
         className="w-full bg-yellow-400 text-black font-bold p-3 rounded-full hover:scale-105 transition"
        >
          {editandoId ? "Actualizar producto" : "Agregar producto"}
        </button>

      </div>

      {/* LISTA */}
      <div className="mt-16">
  <h2 className="text-2xl font-bold mb-6 text-yellow-400">
    Productos
  </h2>

        <div className="grid md:grid-cols-3 gap-8">
  {productos.map((p: any) => (
    <div
      key={p.id}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition"
    >

      {/* IMAGEN */}
      <div className="w-full h-48 relative mb-4 rounded-xl overflow-hidden">
        <img
          src={p.imagen}
          alt={p.nombre}
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFO */}
      <h3 className="text-lg font-bold">{p.nombre}</h3>

      <p className="text-yellow-400 font-bold text-xl mb-3">
        ${Number(p.precio).toFixed(2)}
      </p>

      {/* BOTONES */}
      <div className="flex gap-2">

        <button
          onClick={() => editarProducto(p)}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:scale-105 transition"
        >
          Editar
        </button>

        <button
          onClick={() => eliminarProducto(p.id)}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:scale-105 transition"
        >
          Eliminar
        </button>

      </div>

    </div>
  ))}
       </div> {/* grid */}

    </div> {/* mt-16 */}

  </main>

);
}