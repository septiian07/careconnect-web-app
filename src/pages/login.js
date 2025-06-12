import Head from 'next/head';
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Head>
        <title>Login</title>
        {/* Using Tailwind via CDN for simplicity, ensure it's properly set up in project */}
        <script src="https://cdn.tailwindcss.com" async></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style jsx global>{`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-[#fffaf0] px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl flex max-w-4xl w-full">
          {/* Kiri: Gambar */}
          <div className="w-1/2 hidden md:flex items-center justify-center">
            <img
              src="/img/login-illustration.png"
              alt="Login Illustration"
              className="w-[80%] max-w-[250px]"
            />
          </div>

          {/* Kanan: Form Login */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Hallo! Silahkan <br /> Masukan Username dan Password
            </h2>

            {/* Username */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-teal-500">
                <FaUser />
              </span>
              <input
                type="text"
                placeholder="Masukan Username"
                className="w-full pl-10 pr-4 py-3 rounded-md border border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300
                         text-gray-800 placeholder-gray-400 text-base"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-teal-500">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukan Password"
                className="w-full pl-10 pr-10 py-3 rounded-md border border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300
                         text-gray-800 placeholder-gray-400 text-base"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>

            {/* Tombol Login */}
            <button className="w-full bg-red-400 hover:bg-red-500 text-white py-3 rounded-md shadow text-lg font-semibold">
              Login
            </button>

            {/* Link Registrasi */}
            <p className="text-center text-sm text-gray-700">
              Belum punya akun?{" "}
              <a href="/register" className="text-teal-600 font-semibold hover:underline">
                Registrasi dulu di sini
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}