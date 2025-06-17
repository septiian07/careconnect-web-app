import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

const getUserId = () => {
    if (typeof window !== 'undefined') {
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
            try {
                const userData = JSON.parse(userDataString);
                return userData.userId || null;
            } catch (e) {
                console.error("Failed to parse user data from localStorage", e);
                return null;
            }
        }
    }
    return null;
};

export function useAppointmentForm() {
  const router = useRouter();
  const { doctorId } = router.query;

  const [doctorInfo, setDoctorInfo] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    method: 'Online',
    note: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  const fetchDoctorDetails = useCallback(async () => {
    if (!doctorId) return;

    setLoading(true);
    setSubmitError(null);

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError("Autentikasi diperlukan. Silakan login.");
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
        setSubmitError(data.message || `Gagal memuat detail dokter: ${response.status}`);
        console.error("API error fetching doctor details:", data);
      }
    } catch (err) {
      console.error("Network error fetching doctor details:", err);
      setSubmitError("Terjadi kesalahan jaringan saat memuat data dokter.");
    } finally {
      setLoading(false);
    }
  }, [doctorId, router]);

  useEffect(() => {
    fetchDoctorDetails();
  }, [fetchDoctorDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMethodChange = (methodName) => {
    setFormData((prevData) => ({
      ...prevData,
      method: methodName,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    const userId = getUserId();
    if (!userId) {
        setSubmitError("Informasi user tidak ditemukan. Harap login kembali.");
        setLoading(false);
        return;
    }
    if (!doctorId) {
        setSubmitError("ID Dokter tidak ditemukan. Silakan kembali ke daftar dokter.");
        setLoading(false);
        return;
    }

    if (!formData.date || !formData.time || !formData.method) {
      setSubmitError("Tanggal, jam, dan metode konsultasi wajib diisi.");
      setLoading(false);
      return;
    }

    try {
      const token = getAuthToken();
      if (!token) {
        setSubmitError("Autentikasi diperlukan. Silakan login.");
        setLoading(false);
        router.push('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/transaction`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          doctor_id: parseInt(doctorId, 10),
          date: formData.date,
          time: formData.time,
          method: formData.method,
          status: 'Pending',
          note: formData.note,
        }),
      });

      const data = await response.json();

      if (response.ok && data.statusCode === 201) {
        setSubmitSuccess("Janji temu berhasil dibuat!");
        alert("Janji temu berhasil dibuat!");
        router.push('/history');
      } else {
        setSubmitError(data.message || `Gagal membuat janji: ${response.status}`);
        console.error("API error creating appointment:", data);
      }
    } catch (err) {
      console.error("Network error creating appointment:", err);
      setSubmitError("Terjadi kesalahan jaringan saat membuat janji temu.");
    } finally {
      setLoading(false);
    }
  };

  return {
    doctorInfo,
    formData,
    handleChange,
    handleMethodChange,
    handleSubmit,
    loading,
    submitError,
    submitSuccess,
  };
}