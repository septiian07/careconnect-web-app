// hooks/useDashboardData.js
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

export function useDashboardData() {
  const router = useRouter();
  const [userName, setUserName] = useState('Pengguna'); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUserName = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken'); 
        if (!token) {
          setUserName('Pengguna');
          setIsLoading(false);
          ('/login'); 
          return;
        }

        const apiUrl = `${API_BASE_URL}/auth/login`;
        const response = await fetch(apiUrl, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserName(data.name || 'Pengguna');
          localStorage.setItem('userName', data.name);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Gagal mengambil nama pengguna');
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching user name:", err);
        setUserName('Pengguna'); 
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserName();
  }, []); 

  // Fungsi navigasi untuk tombol "About"
  const handleAboutClick = useCallback(() => {
    router.push('/about'); 
  }, [router]);

  // Fungsi navigasi untuk tombol "List Dokter"
  const handleListDokterClick = useCallback(() => {
    router.push('/listdoctors'); 
  }, [router]);

  // Fungsi navigasi untuk tombol "Riwayat"
  const handleRiwayatClick = useCallback(() => {
    router.push('/history');
  }, [router]);

  // Fungsi untuk menangani logout
  const handleLogout = useCallback(() => {
    console.log("User logged out!");
    router.push('/login');
  }, [router]);

  return {
    userName,
    isLoading,
    error,
    handleAboutClick,
    handleListDokterClick,
    handleRiwayatClick,
    handleLogout,
  };
}