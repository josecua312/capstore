"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";
// 👇 AQUÍ (fuera del componente)
type Producto = {
  nombre: string;
  precio: string;
  imagen: string;
};
export default function Home() {

  // Estado del menú
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [mostrarContacto, setMostrarContacto] = useState(false);
  useEffect(() => {
    console.log("🚀 Cargando productos desde Supabase");
  cargarProductos();
},
 []);
    async function cargarProductos() {
  console.log("🔄 Conectando a Supabase");

  const { data, error } = await supabase
    .from("productos") // 👈 nombre de tu tabla
    .select("*");

  if (error) {
    console.log("❌ Error:", error.message);
  } else {
    console.log("✅ Productos:", data);
    setProductos(data|| []);
  }
}
  
    
  
 return (
    <main className="min-h-screen bg-gray-50">

      {/* NAVBAR PRO */}
<nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 text-white px-8 py-4 flex justify-between items-center">

  {/* LOGO PRO */}
  <div className="flex items-center gap-3 group">

    {/* logo animado suave */}
    <div className="transition duration-500 group-hover:scale-110 group-hover:rotate-2">
      <Image
        src="/logo/Logo.png"
        alt="CapStore Logo"
        width={70}
        height={70}
        className="rounded-xl shadow-lg"
      />
    </div>

    <h1 className="text-3xl font-extrabold tracking-wide group-hover:text-yellow-400 transition">
      CapStore
    </h1>
  </div>

  {/* Botón móvil */}
  <button
    className="md:hidden text-3xl hover:text-yellow-400 transition"
    onClick={() => setMenuAbierto(!menuAbierto)}
  >
    ☰
  </button>

  {/* MENÚ */}
  <ul
    className={`flex-col md:flex-row md:flex gap-10 absolute md:static left-0 w-full md:w-auto px-8 md:px-0 transition-all duration-300 bg-black/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none ${
      menuAbierto ? "top-16" : "top-[-300px]"
    }`}
  >
    <li>
      <a
        href="#productos"
        className="relative group text-white hover:text-yellow-400 transition"
      >
        Productos
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all"></span>
      </a>
    </li>

    <li>
      <a
        href="#nosotros"
        className="relative group text-white hover:text-yellow-400 transition"
      >
        Nosotros
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all"></span>
      </a>
    </li>

      <li>
  <button
    onClick={() => setMostrarContacto(true)}
    className="relative group text-white hover:text-yellow-400 transition"
  >
    Contacto
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-400 group-hover:w-full transition-all"></span>
  </button>
</li>
<li>
<a
    href="/login"
    className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
  >
    Admin
  </a>
</li>
  </ul>

</nav>

      {/* HERO PRO */}
<section className="relative overflow-hidden text-center py-28">

  {/* Fondo gradiente animado */}
  <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black animate-gradient"></div>

  {/* Glow decorativo */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400 opacity-20 blur-[120px] rounded-full"></div>

  {/* Patrón sutil */}
  <div className="absolute inset-0 opacity-10"
       style={{
         backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')"
       }}
  />

  {/* Contenido */}
  <div className="relative z-10 px-6">

    <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
      Eleva tu estilo con nuestras
      <span className="text-yellow-400"> Gorras Premium</span>
    </h2>

    <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
      Diseño urbano, calidad premium y estilo único para cada outfit.
    </p>

    <a
      href="#productos"
      className="bg-yellow-400 text-black font-bold px-10 py-4 rounded-full hover:scale-105 transition inline-block shadow-lg"
    >
      Ver Colección
    </a>

  </div>

      </section>

     {/* PRODUCTOS PRO */}
<section
  id="productos"
  className="relative py-20 px-8 overflow-hidden"
>

  {/* Fondo degradado elegante */}
  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-white to-gray-200"></div>

  {/* Glow decorativo */}
  <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-yellow-300 opacity-20 blur-[120px] rounded-full"></div>
  <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-black opacity-10 blur-[120px] rounded-full"></div>

  {/* Contenido */}
  <div className="relative z-10">

    <h2 className="text-4xl font-extrabold text-center mb-14 tracking-tight">
      Nuestra <span className="text-yellow-500">Colección Premium</span>
    </h2>

    <div className="grid md:grid-cols-3 gap-10">

      {productos.map((producto, index) => (

        <div
          key={index}
          className="group relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition duration-500 hover:-translate-y-3 overflow-hidden"
        >

          {/* brillo hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-300/10 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition"></div>
<div className="w-full h-48 relative mb-4 overflow-hidden rounded-xl">
  <Image
    src={producto.imagen}
    alt={producto.nombre}
    fill
    className="object-cover"
  />
</div>

          <h3 className="text-xl font-bold mb-2">
            {producto.nombre}
          </h3>

          <p className="text-yellow-500 font-extrabold text-lg mb-4">
            {producto.precio}
          </p>

          <a
            href={`https://wa.me/573043057073?text=Hola, quiero comprar la ${producto.nombre}`}
            target="_blank"
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition font-semibold"
          >
            Comprar ahora
          </a>

        </div>

      ))}

    </div>
  </div>
</section>

      {/* NOSOTROS PRO */}
<section
  id="nosotros"
  className="relative py-24 px-8 overflow-hidden text-center"
>

  {/* Fondo degradado premium */}
  <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>

  {/* Glow amarillo marca */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-400 opacity-20 blur-[120px] rounded-full"></div>

  {/* textura sutil */}
  <div className="absolute inset-0 opacity-10"
       style={{
         backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-stripes.png')"
       }}
  />

  {/* Contenido */}
  <div className="relative z-10 max-w-4xl mx-auto">

    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
      Nuestra Historia
    </h2>

    <p className="text-gray-300 text-lg md:text-xl mb-12">
      En <span className="text-yellow-400 font-bold">CapStore</span> creemos que una gorra no es solo un accesorio,
      es una forma de expresión. Diseñamos piezas con estilo urbano, calidad premium y actitud única.
    </p>

    {/* Card glass */}
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10 shadow-2xl">

      <h3 className="text-2xl font-bold text-yellow-400 mb-4">
        ¿Qué nos hace diferentes?
      </h3>

      <p className="text-gray-200 leading-relaxed">
        Seleccionamos materiales de alta calidad, cuidamos cada detalle del diseño
        y creamos gorras pensadas para acompañarte en tu estilo diario.
        No seguimos tendencias… las creamos.
      </p>

      {/* badges */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">

        <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold text-sm">
          Calidad Premium
        </span>

        <span className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm">
          Estilo Urbano
        </span>

        <span className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-sm">
          Diseño Exclusivo
        </span>

      </div>

    </div>

  </div>
</section>

      {/* FOOTER PRO */}
<footer
  id="contacto"
  className="relative text-white py-16 px-8 overflow-hidden"
>

  {/* Fondo premium */}
  <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-900 to-black"></div>

  {/* Glow amarillo marca */}
  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-400 opacity-20 blur-[140px] rounded-full"></div>

  {/* textura sutil */}
  <div
    className="absolute inset-0 opacity-10"
    style={{
      backgroundImage:
        "url('https://www.transparenttextures.com/patterns/black-linen.png')",
    }}
  />

  {/* contenido */}
  <div className="relative z-10 max-w-6xl mx-auto">

    <div className="grid md:grid-cols-4 gap-10">

      {/* LOGO */}
      <div className="flex flex-col items-center md:items-start gap-3">
        <div className="hover:scale-105 transition duration-300">
          <Image
            src="/logo/Logo.png"
            alt="CapStore Logo"
            width={70}
            height={70}
            className="rounded-xl"
          />
        </div>

        <h3 className="text-2xl font-extrabold tracking-wide">
          CapStore
        </h3>

        <p className="text-gray-400 text-sm">
          Estilo urbano, calidad premium y actitud única.
        </p>
      </div>

      {/* EMPRESA */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
        <h4 className="font-bold mb-4 text-yellow-400">EMPRESA</h4>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="hover:text-white cursor-pointer">Sobre nosotros</li>
          <li className="hover:text-white cursor-pointer">Contacto</li>
          <li className="hover:text-white cursor-pointer">Ubicación</li>
        </ul>
      </div>

      {/* AYUDA */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
        <h4 className="font-bold mb-4 text-yellow-400">AYUDA</h4>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="hover:text-white cursor-pointer">Preguntas frecuentes</li>
          <li className="hover:text-white cursor-pointer">Envíos</li>
          <li className="hover:text-white cursor-pointer">Pagos</li>
        </ul>
      </div>

      {/* LEGAL */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
        <h4 className="font-bold mb-4 text-yellow-400">LEGAL</h4>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="hover:text-white cursor-pointer">
            Términos y condiciones
          </li>
          <li className="hover:text-white cursor-pointer">
            Política de privacidad
          </li>
        </ul>
      </div>

    </div>

    {/* línea inferior */}
    <div className="border-t border-white/10 mt-12 pt-6 text-center">
      <p className="text-gray-500 text-sm">
        © 2026 <span className="text-yellow-400 font-semibold">CapStore</span>. Todos los derechos reservados.
      </p>
    </div>

  </div>
</footer>

      {/* WHATSAPP PRO FLOAT */}
<div className="fixed bottom-6 right-6 z-50 group">

  {/* Tooltip */}
  <div className="absolute right-16 bottom-3 bg-black text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
    Escríbenos 💬
  </div>

  {/* Botón */}
  <a
    href="https://wa.me/573043057073"
    target="_blank"
    className="relative flex items-center justify-center w-16 h-16 rounded-full bg-green-500 shadow-2xl hover:scale-110 transition duration-300"
  >

    {/* animación pulse */}
    <span className="absolute w-full h-full rounded-full bg-green-400 opacity-50 animate-ping"></span>

    {/* icono WhatsApp */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="white"
      className="w-8 h-8 relative z-10"
    >
      <path d="M19.11 17.53c-.29-.15-1.7-.84-1.97-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.91 1.13-.17.19-.34.21-.63.07-.29-.15-1.23-.45-2.34-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.64-1.54-.88-2.11-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.51.07-.78.36-.26.29-1 1-1 2.44 0 1.44 1.03 2.83 1.17 3.02.15.19 2.05 3.13 4.97 4.39.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.56-.08 1.7-.69 1.94-1.36.24-.67.24-1.25.17-1.36-.07-.1-.26-.17-.55-.31z" />
      <path d="M16 3C9.37 3 4 8.37 4 15c0 2.64.85 5.09 2.3 7.09L4 29l7.15-2.23A11.9 11.9 0 0016 27c6.63 0 12-5.37 12-12S22.63 3 16 3zm0 22c-2.2 0-4.24-.66-5.95-1.79l-.43-.27-4.24 1.32 1.39-4.13-.28-.43A9.94 9.94 0 016 15c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10z" />
    </svg>

  </a>
</div>
{mostrarContacto && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">

    {/* CARD */}
    <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-3xl w-[340px] text-white shadow-2xl scale-95 animate-scaleIn">

      {/* GLOW */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-yellow-400 opacity-20 blur-[100px] rounded-full"></div>

      {/* BOTÓN CERRAR */}
      <button
        onClick={() => setMostrarContacto(false)}
        className="absolute top-3 right-4 text-xl hover:text-yellow-400 transition"
      >
        ✕
      </button>

      {/* CONTENIDO */}
      <div className="relative z-10 text-center">

        <h2 className="text-2xl font-extrabold mb-6">
          Contáctanos
        </h2>

        <div className="flex flex-col gap-4">

          {/* WHATSAPP */}
          <a
            href="https://wa.me/573043057073"
            target="_blank"
            className="flex items-center gap-3 bg-green-500/90 hover:bg-green-400 px-4 py-3 rounded-xl transition hover:scale-105"
          >
            <span>💬</span>
            WhatsApp
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://instagram.com/"
            target="_blank"
            className="flex items-center gap-3 bg-pink-500/90 hover:bg-pink-400 px-4 py-3 rounded-xl transition hover:scale-105"
          >
            <span>📸</span>
            Instagram
          </a>

          {/* EMAIL */}
          <a
            href="https://mail.google.com/mail/u/0/?ogbl#inbox"
            className="flex items-center gap-3 bg-blue-500/90 hover:bg-blue-400 px-4 py-3 rounded-xl transition hover:scale-105"
          >
            <span>✉️</span>
            Correo
          </a>

        </div>

      </div>
    </div>
  </div>
)}
    </main>
  );
}