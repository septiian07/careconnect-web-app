// src/hooks/useHistory.js
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fungsi helper untuk mendapatkan token
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Fungsi helper untuk mendapatkan warna status saja (tanpa avatar styling)
const getStatusStyling = (status) => {
    let statusColor = 'bg-secondary'; // Default
    switch (status.toLowerCase()) {
        case 'approve':
        case 'approved':
            statusColor = 'bg-success';
            break;
        case 'pending':
        case 'dalam proses':
            statusColor = 'bg-warning text-dark';
            break;
        case 'rejected':
        case 'ditolak':
            statusColor = 'bg-danger';
            break;
        case 'completed':
        case 'selesai':
            statusColor = 'bg-primary';
            break;
        default:
            statusColor = 'bg-secondary';
    }
    return { statusColor };
};


export function useHistory() {
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
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

      const response = await fetch(`${API_BASE_URL}/api/transaction`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        const processedAppointments = (data.result || []).map((trx, index) => {
            const { statusColor } = getStatusStyling(trx.status); 
            return {
                id: trx.transaction_id,
                doctor: trx.doctor_name,
                date: `${trx.date} - ${trx.time} WIB`,
                type: trx.method,
                status: trx.status,
                statusColor: statusColor,
            };
        });
        setAppointments(processedAppointments);
      } else {
        setError(data.message || `Gagal memuat riwayat: ${response.status}`);
        console.error("API error fetching history:", data);
      }
    } catch (err) {
      console.error("Network error fetching history:", err);
      setError("Terjadi kesalahan jaringan saat memuat riwayat janji.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    error,
  };
}