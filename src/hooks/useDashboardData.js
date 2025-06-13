// hooks/useDashboardData.js
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useDashboardData() {
  const router = useRouter();
  const [userData, setUserData] = useState({});  
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    setUserData(JSON.parse(userData));
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
    isLoading,
    error,
    userData,
    handleAboutClick,
    handleListDokterClick,
    handleRiwayatClick,
    handleLogout,
    setUserData,
  };
}