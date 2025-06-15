import React from 'react';

export default function DashboardView({
  userName,
  onAboutClick,
  onListDokterClick,
  onRiwayatClick,
  onLogoutClick,
}) {
  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 bg-white p-3 position-relative">
      <div className="d-flex flex-wrap justify-content-center gap-4 py-3">
            <button
              className="btn btn-lg btn-outline-secondary rounded-3 px-3 py-2 d-flex align-items-center justify-content-center"
              onClick={onAboutClick}
            >
              <i className="bi bi-info-circle me-1"></i> About
            </button>

            <button
              className="btn btn-lg btn-outline-primary rounded-3 px-3 py-2 d-flex align-items-center justify-content-center"
              onClick={onListDokterClick}
            >
              <i className="bi bi-person-badge me-1"></i> List Dokter
            </button>

            <button
              className="btn btn-lg btn-outline-info rounded-3 px-3 py-2 d-flex align-items-center justify-content-center"
              onClick={onRiwayatClick}
            >
              <i className="bi bi-calendar-check me-1"></i> Riwayat
            </button>

            <button
              className="btn btn-lg btn-outline-danger rounded-3 px-3 py-2 d-flex align-items-center justify-content-center"
              onClick={onLogoutClick}
            >
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>

      <div className="row w-100 justify-content-center align-items-center flex-grow-1">
        <div className="col-lg-6 col-md-8 text-center mb-4 mb-lg-0">
          <img
            src="/img/2.png"
            alt="Selamat Datang"
            className="img-fluid"
            style={{ maxWidth: '550px' }}
          />
        </div>

        <div className="col-lg-6 col-md-8 p-4 text-center"> 
          <h1 className="display-2 fw-bold mb-4" style={{ color: '#333' }}>Selamat Datang {userName}</h1>
          <p className="lead text-muted mb-4">
            Gunakan tombol di atas untuk navigasi.
          </p>
        </div>
      </div>
    </div>
  );
}