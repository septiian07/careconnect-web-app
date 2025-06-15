import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDoctors } from '../../hooks/useDoctors';
import DoctorsListView from '../../components/doctors/DoctorListView';

export default function DoctorsPage() {
  const router = useRouter();

  const { doctors, searchTerm, handleSearchChange, loading, error } = useDoctors();

  const handleBackClick = () => {
    router.back();
  };

  const handleViewScheduleClick = (doctorId) => {
    router.push(`/doctors/${doctorId}/doktorSchedule`);
  };

  return (
    <>
      <Head>
        <title>Daftar Dokter - CareConnect</title>
        <meta name="description" content="Daftar dan cari dokter di CareConnect" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <DoctorsListView
        doctors={doctors}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        loading={loading}
        error={error}
        onBackClick={handleBackClick}
      />
    </>
  );
}