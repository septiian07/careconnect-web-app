import Head from 'next/head'; 
import { useDashboardData } from '../hooks/useDashboardData'; 
import DashboardView from '../components/dashboard/DashboardView';

export default function DashboardPage() {
  const {
    userName,
    isLoading,
    error,
    userData,
    handleAboutClick,
    handleListDokterClick,
    handleRiwayatClick,
    handleLogout
  } = useDashboardData();

  // Tampilan loading atau error saat data sedang diambil
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard - {userData.name}</title>
        <meta name="description" content="Dashboard pengguna CareConnect" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <DashboardView
        userName={userData.name}
        onAboutClick={handleAboutClick}
        onListDokterClick={handleListDokterClick}
        onRiwayatClick={handleRiwayatClick}
        onLogoutClick={handleLogout}
      />
    </>
  );
}