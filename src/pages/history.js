import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useHistory } from '../hooks/useHistory';
import HistoryView from '../components/history/HistoryView'; 

export default function HistoryPage() {
  const router = useRouter();

  const { appointments, loading, error } = useHistory();

  const handleBackClick = () => {
    router.push('/dashboard');
  };

  return (
    <>
      <Head>
        <title>Riwayat Janji - CareConnect</title>
        <meta name="description" content="Riwayat janji konsultasi Anda" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <HistoryView
        appointments={appointments}
        loading={loading}
        error={error}
        onBackClick={handleBackClick}
      />
    </>
  );
}