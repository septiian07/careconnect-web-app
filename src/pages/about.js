import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FaArrowLeft } from 'react-icons/fa'; 

export default function AboutPage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); 
  };

  const teamMembers = [
    {
      id: 1,
      name: 'Septian Yoga',
      nim: '2250085006',
      role: 'Backend Developer',
      photo: '/img/septian.jpeg', 
    },
    {
      id: 2,
      name: 'Boy Boby Putra',
      nim: '2250085008',
      role: 'Frontend Developer',
      photo: '/img/boy.jpeg',
    },
    {
      id: 3,
      name: 'Muhamad Ridwan Husaeni',
      nim: '2250085010',
      role: 'Frontend Developer',
      photo: '/img/husein.jpeg',
    },
    {
        id: 4,
        name: 'Dede Anugrah',
        nim: '2250085011',
        role: 'Frontend Developer',
        photo: '/img/dede.jpeg',
    },
  ];

  return (
    <>
      <Head>
        <title>Tentang Kami - CareConnect</title>
        <meta name="description" content="Informasi tentang tim pengembang CareConnect" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <main className="bg-light min-vh-100 w-100 d-flex flex-column align-items-center py-2 px-3" style={{ backgroundColor: '#fffdf5', paddingTop: '3rem' }}>
        <div className="container-fluid position-relative" style={{ maxWidth: '1200px' }}>
          {/* Back Button */}
          <button
            className="btn btn-link position-absolute p-0 border-0"
            onClick={handleBackClick}
            aria-label="Go back"
            style={{ left: '30px', top: '40px', height: 'auto', width: 'auto' }} // Sesuaikan posisi
          >
            <FaArrowLeft className="text-dark" style={{ fontSize: '2rem' }} />
          </button>

          {/* Page Title */}
          <h1 className="fw-bold text-dark text-center mt-4 mb-5" style={{ fontSize: '60px', fontFamily: "'Poppins', sans-serif", color: '#2f2f3e' }}>
            Tentang Kami
          </h1>

          {/* Team Members Grid */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4 justify-content-center">
            {teamMembers.map(member => (
              <div key={member.id} className="col">
                <div className="card h-100 shadow-sm border-0 rounded-lg text-center" style={{ padding: '20px' }}>
                  <img
                    src={member.photo}
                    className="card-img-top rounded-circle mx-auto mb-3 object-fit-cover"
                    alt={`Foto ${member.name}`}
                    style={{ width: '150px', height: '150px', border: '3px solid #37c8b3' }}
                  />
                  <div className="card-body p-0">
                    <h5 className="card-title fw-bold mb-1" style={{ fontSize: '1.75rem', color: '#2e2e2e' }}>{member.name}</h5>
                    <p className="card-text text-muted mb-1" style={{ fontSize: '1.25rem' }}>NIM: {member.nim}</p>
                    <p className="card-text text-secondary" style={{ fontSize: '1.1rem', fontStyle: 'italic' }}>{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}