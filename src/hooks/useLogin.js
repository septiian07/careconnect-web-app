import { useState } from 'react';
import { useRouter } from 'next/router';

// Akses environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Username dan password wajib diisi.');
      setIsLoading(false);
      return;
    }

    // Peringatan jika API_BASE_URL tidak ada
    if (!API_BASE_URL) {
      setError('Kesalahan konfigurasi API. Silakan hubungi dukungan.');
      setIsLoading(false);
      console.error('Environment variable NEXT_PUBLIC_API_BASE_URL is not defined.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        setSuccessMessage(data.message || 'Login berhasil!');
        console.log('Login successful:', data);
        console.log('Token:', data.result.token);

        localStorage.setItem('authToken', data.result.token);
        localStorage.setItem('userData', JSON.stringify(data.result.user));

        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setError(data.message || 'Login gagal. Silakan periksa kredensial Anda.');
      }
    } catch (err) {
      console.error('Login API error:', err);
      setError('Terjadi kesalahan koneksi atau API tidak dapat dijangkau. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    onUsernameChange: handleUsernameChange,
    password,
    onPasswordChange: handlePasswordChange,
    showPassword,
    toggleShowPassword,
    error,
    successMessage,
    isLoading,
    onSubmit: handleSubmit,
  };
}