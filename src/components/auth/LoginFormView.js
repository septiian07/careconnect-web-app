import React from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";

export default function LoginFormView({
  username,
  onUsernameChange,
  password,
  onPasswordChange,
  onSubmit,
  isLoading,
  error,
  successMessage,
  showPassword,
  toggleShowPassword
}) {

  return (
    <div className="w-full md:w-1/2 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Hallo! Silahkan <br /> Masukan Username dan Password
      </h2>

      <form onSubmit={onSubmit}>
        {/* Username */}
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-teal-500">
            <FaUser />
          </span>
          <input
            type="text"
            placeholder="Masukan Username"
            className="w-full pl-10 pr-4 py-3 rounded-md border border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300
                      text-gray-800 placeholder-gray-400 text-base"
            value={username}
            onChange={onUsernameChange}
            disabled={isLoading}
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-teal-500">
            <FaLock />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Masukan Password"
            className="w-full pl-10 pr-10 py-3 rounded-md border border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-300
                      text-gray-800 placeholder-gray-400 text-base"
            value={password}
            onChange={onPasswordChange}
            disabled={isLoading}
          />
          <span
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-teal-500 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </span>
        </div>

        {/* Pesan Error atau Sukses */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        {successMessage && (
          <p className="text-green-600 text-sm text-center mb-4">{successMessage}</p>
        )}

        {/* Tombol Login */}
        <button
          type="submit"
          className="w-full bg-red-400 hover:bg-red-500 text-white py-3 rounded-md shadow text-lg font-semibold flex items-center justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Login'
          )}
        </button>
      </form>

      {/* Link Registrasi */}
      <p className="text-center text-sm text-gray-700 mt-4">
        Belum punya akun?{" "}
        <a href="/register" className="text-teal-600 font-semibold hover:underline">
          Registrasi dulu di sini
        </a>
      </p>
    </div>
  );
}