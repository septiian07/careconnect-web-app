import Head from 'next/head'; 
import { useDashboardData } from '../hooks/useDashboardData'; 
import DashboardView from '../components/dashboard/DashboardView';

export default function DashboardPage() {
  const {
    userName,
    isLoading,
    error,
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
        <title>Dashboard - {userName}</title>
        <meta name="description" content="Dashboard pengguna CareConnect" />
      </Head>

      <DashboardView
        userName={userName}
        onAboutClick={handleAboutClick}
        onListDokterClick={handleListDokterClick}
        onRiwayatClick={handleRiwayatClick}
        onLogoutClick={handleLogout}
      />
    </>
  );
}