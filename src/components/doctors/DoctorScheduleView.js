import React from 'react';
import { FaArrowLeft, FaHospital, FaPhone, FaFileAlt } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function DoctorScheduleView({
  doctorInfo,
  loading,
  error,
  onBackToDoctorListClick,
  onMakeAppointmentClick
}) {
  const router = useRouter();

  if (loading) {
    return (
      <div className="bg-light min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center py-5 px-3" style={{ backgroundColor: '#fffdf5' }}>
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-dark">Memuat detail dokter...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-light min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center py-5 px-3" style={{ backgroundColor: '#fffdf5' }}>
        <div className="alert alert-danger text-center my-5" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={onBackToDoctorListClick}>Kembali ke Daftar Dokter</button>
      </div>
    );
  }

  if (!doctorInfo) {
    return (
      <div className="bg-light min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center py-5 px-3" style={{ backgroundColor: '#fffdf5' }}>
        <div className="alert alert-warning text-center my-5" role="alert">
          Detail dokter tidak ditemukan.
        </div>
        <button className="btn btn-primary" onClick={onBackToDoctorListClick}>Kembali ke Daftar Dokter</button>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-column align-items-center px-3" style={{ backgroundColor: '#fffdf5' }}>
      <div className="container-fluid position-relative" style={{ maxWidth: '1920px' }}>
        {/* Back Button */}
        <button
          className="btn btn-link position-absolute p-0 border-0"
          onClick={onBackToDoctorListClick}
          aria-label="Go back"
          style={{ left: '30px', top: '40px', height: 'auto', width: 'auto' }}
        >
          <FaArrowLeft className="text-dark" style={{ fontSize: '1.25rem' }} />
        </button>

        <div className="row justify-content-center mt-4 pt-3">
          {/* Doctor Name and Specialty */}
          <div className="col-12 col-md-9 text-center text-md-start mb-2">
            <h1 className="fw-bold text-dark" style={{ fontSize: '24px', fontFamily: "'Poppins', sans-serif", color: '#2f2f3e' }}>
              {doctorInfo.doctor_name}
            </h1>
            <h2 className="fw-medium text-info" style={{ fontSize: '18px', fontFamily: "'Poppins', sans-serif", color: '#37c8b3', marginTop: '15px' }}>
              {doctorInfo.specialist}
            </h2>
          </div>

          {/* Doctor Information Card */}
          <div className="col-12 col-md-8 col-lg-5 mb-5" style={{paddingTop: '56px'}}>
            <div className="card shadow-sm border-0 rounded-4" style={{ backgroundColor: '#fffdf5', padding: '24px' }}>
              <div className="card-body p-0">
                <div className="d-flex align-items-center mb-4">
                  <FaHospital className="text-dark me-4" style={{ fontSize: '1.25rem', color: '#2f2f3e' }} />
                  <span className="fw-bold text-dark" style={{ fontSize: '18px', fontFamily: "'Poppins', sans-serif", color: '#2f2f3e' }}>
                    {doctorInfo.hospital}
                  </span>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <FaPhone className="text-dark me-4" style={{ fontSize: '1.25rem', color: '#2f2f3e' }} />
                  <span className="fw-bold text-dark" style={{ fontSize: '18px', fontFamily: "'Poppins', sans-serif", color: '#2f2f3e' }}>
                    {doctorInfo.phone}
                  </span>
                </div>

                <div className="d-flex">
                  <FaFileAlt className="text-dark me-4 flex-shrink-0" style={{ fontSize: '1.25rem', color: '#2f2f3e' }} />
                  <p className="fw-bold text-dark mb-0" style={{ fontSize: '18px', fontFamily: "'Poppins', sans-serif", color: '#2f2f3e' }}>
                    Deskripsi : " {doctorInfo.biography}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Section */}
          <div className="col-12 col-md-4 col-lg-4">
            <h2 className="fw-bold text-dark" style={{ fontSize: '24px', fontFamily: "'Poppins', Helvetica", color: '#2f2f3e', paddingBottom:'20px', textAlign:'center'}}>
              Jadwal Konsultasi
            </h2>

            <div className="d-flex flex-column gap-3">
              {doctorInfo.schedules && doctorInfo.schedules.length > 0 ? (
                doctorInfo.schedules.map((schedule, index) => (
                  <div
                    key={index}
                    className="card border-0 rounded-3 shadow-sm"
                    style={{ width: '100%', height: '50px', backgroundColor: '#fffdf5', boxShadow: '0px 10px 14px rgba(0, 0, 0, 0.25)' }}
                  >
                    <div className="card-body d-flex align-items-center p-0">
                      <span className="ms-4 fw-bold text-dark" style={{ fontSize: '18px', fontFamily: "'Poppins',Helvetica", color: '#2f2f3e' }}>
                        {schedule.day}, {schedule.start} - {schedule.end}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">Tidak ada jadwal tersedia.</p>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="col-12 d-flex flex-column flex-md-row justify-content-end mt-5" style={{ marginBottom: '30px', paddingRight: '170px'}}>
            <button
              className="btn btn-success fw-bold text-center"
              onClick={onMakeAppointmentClick}
              style={{
                height: '60px', backgroundColor: '#37c8b3', color: '#fffdf5',
                fontSize: '18px', borderRadius: '20px',
                boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.4), 0px 4px 4px rgba(0, 0, 0, 0.25)',
                border: 'none', minWidth: '100px'
              }}
            >
              Buat Janji
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}