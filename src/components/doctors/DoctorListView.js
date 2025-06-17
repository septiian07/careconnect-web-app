import React from 'react';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function DoctorsListView({
  doctors,
  searchTerm,
  onSearchChange,
  loading,
  error,
  onBackClick
}) {
  const router = useRouter();

  const handleViewScheduleClick = (doctorId) => {
    router.push(`/doctors/${doctorId}/doctorSchedule`);
  };
  
  return (
    <main className="bg-light min-vh-100 w-100 d-flex flex-column align-items-center px-3" style={{ backgroundColor: '#fffdf5' }}>
      <div className="container-fluid position-relative" style={{ maxWidth: '1920px' }}>
        {/* Back Button */}
        <button
          className="btn btn-link position-absolute p-0 border-0"
          onClick={onBackClick}
          aria-label="Go back"
          style={{ left: '30px', top: '40px', height: 'auto', width: 'auto' }}
        >
          <FaArrowLeft className="text-dark" style={{ fontSize: '1.25rem' }} />
        </button>

        {/* Page Title */}
        <h1 className="fw-bold text-dark text-center mt-4 mb-4" style={{ fontSize: '36px', fontFamily: "'Poppins', sans-serif", color: '#2f2f3e', marginTop: '50px' }}>
          Daftar Dokter
        </h1>

        {/* Search Bar */}
        <div className="position-relative mx-auto mb-3" style={{ maxWidth: '700px' }}>
          <div className="input-group input-group-lg shadow" style={{ borderRadius: '25px', border: '3px solid #37c8b3', backgroundColor: '#fffdf5' }}>
            <span className="input-group-text bg-transparent border-0" id="search-icon">
              <FaSearch className="text-info" style={{ fontSize: '1.25rem', color: '#37c8b3' }} />
            </span>
            <input
              type="text"
              className="form-control border-0 bg-transparent py-3"
              placeholder="Cari Dokter"
              value={searchTerm}
              onChange={onSearchChange}
              disabled={loading}
              style={{ height: '40px', paddingLeft: '20px', paddingRight: '1.5rem', fontSize: '1rem', fontWeight: 'lighter', color: '#2e2e2e99', fontFamily: "'Poppins', sans-serif", boxShadow: 'none' }}
            />
          </div>
        </div>
        
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-dark">Memuat daftar dokter...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center my-5" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="row row-cols-1 g-4 justify-content-center" style={{ maxWidth: '1800px', margin: '0 auto' }}> 
            {doctors.length === 0 ? (
              <p className="text-center text-muted col-12">Tidak ada dokter ditemukan.</p>
            ) : (
              doctors.map((doctor, index) => (
                <div key={doctor.doctor_id} className="col-12 col-md-8 col-lg-6 mb-1"> 
                  <div className="card h-100 border rounded-lg shadow-sm" style={{ background: '#fff', padding: '10px' }}> 
                    <div className="card-body d-flex align-items-center justify-content-between p-0" style={{ minHeight: '50px' }}>

                      {/* Doctor Info */}
                      <div className="d-flex flex-column flex-grow-1 me-4">
                        <h2 className="fw-bold text-dark mb-1" style={{ fontSize: '1.2rem', fontFamily: "'Poppins', sans-serif", color: '#2e2e2e' }}>
                          {doctor.doctor_name}
                        </h2>
                        <p className="fw-semibold text-muted mb-0" style={{ fontSize: '1rem', fontFamily: "'Poppins', sans-serif", color: '#2e2e2e80', marginTop: '4px' }}>
                          {doctor.specialist}
                        </p>
                      </div>

                      {/* View Schedule Button */}
                      <div className="d-flex align-items-center flex-shrink-0">
                        <button
                          onClick={() => handleViewScheduleClick(doctor.doctor_id)}
                          className="btn btn-success fw-semibold text-center"
                          style={{
                            width: '125px', height: '50px', backgroundColor: '#37c8b3', color: '#fffdf5',
                            fontSize: '1rem', borderRadius: '20px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
                            border: 'none'
                          }}
                        >
                          Detail Dokter
                        </button>
                      </div>
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