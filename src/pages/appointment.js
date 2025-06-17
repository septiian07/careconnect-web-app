import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppointmentForm } from '../hooks/useAppointmentForm'; 
import AppointmentFormView from '../components/appointment/AppointmentFormView';

export default function JanjiTemuPage() {
  const router = useRouter();
  const { doctorId } = router.query;
  const {
    doctorInfo,
    formData,
    handleChange,
    handleMethodChange,
    handleSubmit,
    loading,
    submitError,
    submitSuccess,
  } = useAppointmentForm();

  const handleBackClick = () => {
    router.push(`/doctors/${doctorId}/doctorSchedule`); 
  };

  return (
    <>
      <Head>
        <title>{doctorInfo ? `Janji Temu dengan ${doctorInfo.doctor_name}` : 'Buat Janji Temu'} - CareConnect</title>
        <meta name="description" content="Formulir pembuatan janji temu dengan dokter" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <AppointmentFormView
        doctorInfo={doctorInfo}
        formData={formData}
        handleChange={handleChange}
        handleMethodChange={handleMethodChange}
        handleSubmit={handleSubmit}
        loading={loading}
        submitError={submitError}
        submitSuccess={submitSuccess}
        onBackClick={handleBackClick}
      />
    </>
  );
}