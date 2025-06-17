import React from 'react';
import { FaUserMd, FaCalendarCheck, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

export default function DashboardView({
  userName,
  onAboutClick,
  onListDokterClick,
  onRiwayatClick,
  onLogoutClick,
}) {
  return (
    <div className="container-fluid d-flex flex-column align-items-center justify-content-center min-vh-100 bg-white p-3 position-relative">
      <div className="row w-100 justify-content-center align-items-center flex-grow-1">
        <div className="col-lg-6 col-md-8 text-center order-2 order-lg-1">
          <img
            src="img/2.png"
            alt="Ilustrasi Dashboard"
            className="img-fluid"
            style={{ maxWidth: '600px', height: 'auto' }}
          />
        </div>

        <div className="col-lg-6 p-4 text-center text-lg-start order-1 order-lg-2">
          <h1 className="display-4 fw-bold mb-5" style={{ color: '#333', textAlign: 'center'}}>
            Selamat Datang {userName}
          </h1>

          <div className="d-flex flex-column align-items-center align-items-lg-center gap-3 mt-4">
            <button
              className="btn d-flex align-items-center gap-2"
              onClick={onListDokterClick}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '8px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                minWidth: '250px',
                justifyContent: 'flex-start',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: 'none',
              }}
            >
              <FaUserMd size={24} /> Daftar Dokter
            </button>

            <button
              className="btn d-flex align-items-center gap-2"
              onClick={onRiwayatClick}
              style={{
                backgroundColor: '#ffc107',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '8px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                minWidth: '250px',
                justifyContent: 'flex-start',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: 'none',
              }}
            >
              <FaCalendarCheck size={24} /> Riwayat Janji Temu
            </button>

            <button
              className="btn btn-secondary d-flex align-items-center gap-2"
              onClick={onAboutClick}
              style={{
                backgroundColor: '#6c757d', 
                color: 'white',
                padding: '12px 25px',
                borderRadius: '8px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                minWidth: '250px',
                justifyContent: 'flex-start',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: 'none',
              }}
            >
              <FaInfoCircle size={24} /> About
            </button>

            <button
              className="btn btn-danger d-flex align-items-center gap-2"
              onClick={onLogoutClick}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '8px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                minWidth: '250px',
                justifyContent: 'flex-start',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: 'none',
              }}
            >
              <FaSignOutAlt size={24} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}