// hooks/useRegister.js
import { useState } from 'react';
import { useRouter } from 'next/router';

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
    setError(null); // Reset error pada setiap submit
    setSuccess(false); // Reset success pada setiap submit

    // Validasi dasar
    if (!formData.username || !formData.name || !formData.password || !formData.role_id) {
        setError("Harap isi semua kolom yang diperlukan.");
        setLoading(false);
        return;
    }

    try {
      // Menggunakan environment variable untuk URL API base
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          name: formData.name,
          password: formData.password,
          role_id: parseInt(formData.role_id),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Reset form setelah sukses
        setFormData({ username: '', name: '', password: '', role_id: '' });
        console.log('Registration successful:', data);
        // Redirect ke halaman login setelah pendaftaran berhasil
        router.push('/login');
      } else {
        setError(data.message || 'Pendaftaran gagal. Silakan coba lagi.');
        console.error('Registration failed:', data);
      }
    } catch (err) {
      setError('Terjadi kesalahan selama pendaftaran. Periksa koneksi jaringan Anda.');
      console.error('Network error or unexpected:', err);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, loading, error, success };
}