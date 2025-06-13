import { useState } from 'react';
import { useRouter } from 'next/router';

// Akses environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useRegister() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    role_id: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (!formData.username || !formData.name || !formData.password || formData.role_id === '') {
        setError("Harap isi semua kolom yang diperlukan.");
        setLoading(false);
        return;
    }
    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter.');
      setLoading(false);
      return;
    }
    const roleIdNum = parseInt(formData.role_id, 10);
    if (isNaN(roleIdNum) || roleIdNum <= 0) {
      setError('ID Peran tidak valid. Harap masukkan angka positif.');
      setLoading(false);
      return;
    }


    if (!API_BASE_URL) {
      setError('Kesalahan konfigurasi API. Harap hubungi dukungan.');
      setLoading(false);
      console.error('Environment variable NEXT_PUBLIC_API_BASE_URL is not defined.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          name: formData.name,
          password: formData.password,
          role_id: roleIdNum,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setFormData({ username: '', name: '', password: '', role_id: '' });
        console.log('Registration successful:', data);
        router.push('/login');
      } else {
        setError(data.message || 'Pendaftaran gagal. Silakan coba lagi.');
        console.error('Registration failed:', data);
      }
    } catch (err) {
      console.error('Network error or unexpected error during registration:', err);
      setError('Terjadi kesalahan selama pendaftaran. Periksa koneksi jaringan Anda.');
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, error, success };
}