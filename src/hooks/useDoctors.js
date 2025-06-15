import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export function useDoctors() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();

      if (!token) {
        setError("Autentikasi diperlukan. Silakan login.");
        setLoading(false);
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/doctor`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        setDoctors(data.result || []);
      } else {
        setError(data.message || `Gagal memuat dokter: ${response.status}`);
        console.error("API error fetching doctors:", data);
      }
    } catch (err) {
      console.error("Network error fetching doctors:", err);
      setError("Terjadi kesalahan jaringan saat memuat data dokter.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.doctor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return {
    doctors: filteredDoctors,
    searchTerm,
    handleSearchChange,
    loading,
    error,
  };
}