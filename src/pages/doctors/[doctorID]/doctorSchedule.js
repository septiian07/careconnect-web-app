import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDoctorSchedule } from '../../../hooks/useDoctorSchedule'; 
import DoctorScheduleView from '../../../components/doctors/DoctorScheduleView';

export default function JadwalDokterPage() {
  const router = useRouter();
  const { doctorId } = router.query;
  const { doctorInfo, loading, error } = useDoctorSchedule();

  const handleBackToDoctorListClick = () => {
    router.push('/doctors');
  };

  const handleMakeAppointmentClick = () => {
    alert(`Membuat janji dengan ${doctorInfo ? doctorInfo.doctor_name : 'Dokter'} (ID: ${doctorId})`);
    // router.push(`/appointment/book?doctorId=${doctorId}`);
  };

  return (
    <>
      <Head>
        <title>{doctorInfo ? doctorInfo.doctor_name : 'Detail Dokter'} - CareConnect</title>
        <meta name="description" content="Detail informasi dan jadwal dokter" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <DoctorScheduleView
        doctorInfo={doctorInfo}
        loading={loading}
        error={error}
        onBackToDoctorListClick={handleBackToDoctorListClick}
        onMakeAppointmentClick={handleMakeAppointmentClick}
      />
    </>
  );
}