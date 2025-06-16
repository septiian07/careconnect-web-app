import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
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
      <div className="container-fluid" style={{ maxWidth: '1920px' }}>
        {/* Back Button */}
        <button
          className="btn btn-link position-absolute p-0 border-0"
          onClick={onBackClick}
          aria-label="Go back"
          style={{ left: '30px', top: '40px', height: 'auto', width: 'auto' }}
        >
          <FaArrowLeft className="text-dark" style={{ fontSize: '50px' }} />
        </button>

        {/* Page Title */}
        <h1 className="fw-bold text-dark text-center mt-4 mb-4" style={{ fontSize: '60px', fontFamily: "'Poppins', sans-serif", color: '#2f2f3e', marginTop: '160px', paddingBottom: '45px'}}>
          Riwayat Janji
        </h1>

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
              <div className="d-flex flex-column gap-4 mx-auto" style={{ maxWidth: '983px' }}> 
                {appointments.length === 0 ? (
                  <p className="text-center text-muted">Tidak ada riwayat janji ditemukan.</p>
                ) : (
                  appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="card border-0 rounded-4 shadow-sm position-relative"
                      style={{ height: 'auto', minHeight: '150px', backgroundColor: '#fffdf5', boxShadow: '1px 1px 14px rgba(0, 0, 0, 0.2)' }}
                    >
                      <div className="card-body p-3 d-flex flex-column justify-content-between">
                        {/* Doctor name & date/time */}
                        <div className="d-flex align-items-center mb-2">
                          <h2 className="fw-bold text-dark mb-0 me-auto" style={{ fontSize: '35px', fontFamily: "'Poppins',Helvetica", color: '#2f2f3e' }}>
                            {appointment.doctor}
                          </h2>
                           {/* Status badge */}
                            <span className={`badge ${appointment.statusColor} rounded-pill px-3 py-2 fw-bold`} style={{ fontSize: '20px', color: 'white' }}>
                                {appointment.status}
                            </span>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <p className="text-dark mb-0 d-flex align-items-center" style={{ fontSize: '24px', fontFamily: "'Poppins',Helvetica", color: '#000' }}>
                                <FaCalendarAlt className="me-2" style={{ fontSize: '24px' }} />
                                {appointment.date}
                            </p>
                            <p className="fw-bold text-dark mb-0 ms-auto" style={{ fontSize: '20px', fontFamily: "'Poppins',Helvetica", color: '#2f2f3e' }}>
                                {appointment.type}
                            </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
          )}
      </div>
    </main>
  );
}