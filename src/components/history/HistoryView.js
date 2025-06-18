import React from 'react';
import { FaCalendarAlt, FaHospitalAlt, FaNotesMedical } from 'react-icons/fa';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function HistoryView({
  appointments,
  loading,
  error,
  onBackClick
}) {
  const router = useRouter();

  return (
    <main className="bg-light min-vh-100 w-100 d-flex flex-column align-items-center px-3" style={{ backgroundColor: '#fffdf5' }}>
      <div className="container-fluid position-relative" style={{ maxWidth: '1920px' }}>
        <button
          className="btn btn-link position-absolute p-0 border-0"
          onClick={onBackClick}
          aria-label="Go back"
          style={{ left: '30px', top: '40px', height: 'auto', width: 'auto' }}
        >
          <FaArrowLeft className="text-dark" style={{ fontSize: '1.25rem' }} />
        </button>

        <h1 className="fw-bold text-center mt-4 mb-5" style={{ fontSize: '36px', fontFamily: "'Poppins',Helvetica", color: '#2f2f3e'}}>
              Riwayat Janji
        </h1>
        
        <div className="row justify-content-center">
          <section className="col-12 col-md-5 d-none d-md-flex justify-content-center align-items-center">
            <img
              className="img-fluid object-fit-cover h-100"
              alt="History illustration"
              src="/img/3.png" 
              style={{ objectPosition: 'center', marginTop:'1.2rem' }} 
            />
          </section>

          <section className="col-12 col-md-7 mx-auto">
            {/* Loading / Error State */}
            {loading && (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-dark">Memuat riwayat janji...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger text-center my-5" role="alert">
                {error}
              </div>
            )}

            {/* Appointment cards */}
            {!loading && !error && (
              <div className="d-flex flex-column gap-4 mx-auto" style={{ maxWidth: '550px' }}>
                {appointments.length === 0 ? (
                  <p className="text-center text-muted">Tidak ada riwayat janji ditemukan.</p>
                ) : (
                  appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="card border-0 rounded-4 shadow-sm position-relative"
                      style={{ height: 'auto', minHeight: '60px', backgroundColor: '#fffdf5', boxShadow: '1px 1px 14px rgba(0, 0, 0, 0.2)' }}
                    >
                      <div className="card-body p-3 d-flex flex-column justify-content-between">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2 className="fw-bold text-dark mb-0 me-auto" style={{ fontSize: '1.2rem', fontFamily: "'Poppins',Helvetica", color: '#2f2f3e' }}>
                            {appointment.doctor}
                          </h2>
                            <span className={`badge ${appointment.statusColor} rounded-pill px-3 py-2 fw-bold`} style={{ fontSize: '0.8rem', color: 'white' }}>
                                {appointment.status}
                            </span>
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                            <p className="text-dark mb-0 d-flex align-items-center" style={{ fontSize: '1rem', fontFamily: "'Poppins',Helvetica", color: '#000' }}>
                                <FaCalendarAlt className="me-2" style={{ fontSize: '1.25rem' }} />
                                {appointment.date}
                            </p>
                            <p className="fw-bold text-dark mb-0" style={{ fontSize: '0.8rem', fontFamily: "'Poppins',Helvetica", color: '#2f2f3e' }}>
                                {appointment.type}
                            </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                            <p className="text-dark mb-0 d-flex align-items-center" style={{ fontSize: '1rem', fontFamily: "'Poppins',Helvetica", color: '#000' }}>
                                <FaHospitalAlt className="me-2" style={{ fontSize: '1.25rem' }} />
                                {appointment.hospital}
                            </p>
                        </div>

                        <div className="d-flex align-items-center justify-content-between">
                            <p className="text-dark mb-0 d-flex align-items-center" style={{ fontSize: '1rem', fontFamily: "'Poppins',Helvetica", color: '#000' }}>
                                <FaNotesMedical className="me-2" style={{ fontSize: '1.25rem' }} />
                                {appointment.note ?? 'Tidak ada catatan'}
                            </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Back to dashboard button
            <div className="d-flex justify-content-center" style={{marginTop: '1.5rem'}}>
              <button
                onClick={onBackClick}
                className="btn btn-primary fw-bold"
                style={{ width: 'auto', padding: '1rem', backgroundColor: '#37c8b3', borderRadius: '20px', boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.4)' }}
              >
                <span style={{ fontSize: '1rem', color: 'white', fontFamily: "'Poppins',Helvetica" }}>
                  Dashboard
                </span>
              </button>
            </div> */}
          </section>
        </div>
      </div>
    </main>
  );
}