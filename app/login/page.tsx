"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  async function handleLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log(error);
    alert("Credenciales incorrectas ❌");
  } else {
   toast.success("Bienvenido a CapStore 🧢");
    router.push("/admin");
  }
}
  return (
  
  <div
    className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: "url('/images/fondo2.jpg')" }}
  >

    {/* 🔴 OVERLAY OSCURO */}
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

    {/* 🟢 CONTENEDOR CENTRAL */}
    <div className="relative z-10">

      {/* 🔵 CARD LOGIN */}
      <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-2xl w-[350px] text-white">

        {/* ✨ GLOW */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-yellow-400 opacity-20 blur-[100px] rounded-full"></div>

        {/* CONTENIDO */}
        <div className="relative z-10">

  {/* 🔵 LOGO */}
  <div className="flex justify-center mb-5">
    <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md shadow-xl hover:scale-105 transition duration-300">
      <Image
        src="/logo/Logo.png"
        alt="CapStore Logo"
        width={80}
        height={80}
        className="rounded-xl shadow-[0_0_25px_rgba(255,204,0,0.6)]"
      />
    </div>
  </div>

  {/* 🔵 TITULO */}
  <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide">
    CapStore <span className="text-yellow-400">Admin</span>
  </h1>

          

          <input
            type="email"
            placeholder="Correo"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-300 p-3 mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-black font-bold p-3 rounded-full hover:scale-105 hover:bg-yellow-300 transition duration-300 shadow-lg"
          >
            Iniciar sesión
          </button>

        </div>
      </div>

    </div>
  </div>
);

}