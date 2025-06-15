import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export function useDoctorSchedule() {
  const router = useRouter();
  const { doctorId } = router.query;

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctorDetails = useCallback(async () => {
    if (!doctorId) return;

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

      const response = await fetch(`${API_BASE_URL}/api/doctor?doctorId=${doctorId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        setDoctorInfo(data.result);
      } else {
        setError(data.message || `Gagal memuat detail dokter: ${response.status}`);
        console.error("API error fetching doctor details:", data);
      }
    } catch (err) {
      console.error("Network error fetching doctor details:", err);
      setError("Terjadi kesalahan jaringan saat memuat data dokter.");
    } finally {
      setLoading(false);
    }
  }, [doctorId, router]);

  useEffect(() => {
    fetchDoctorDetails();
  }, [fetchDoctorDetails]);

  return {
    doctorInfo,
    loading,
    error,
  };
}