import Head from 'next/head'; 
import { useRegister } from '../hooks/useRegister'; // logika pendaftaran
import RegisterFormView from '../components/auth/RegisterFormView'; // tampilan formulir

export default function RegisterPage() {
  const { formData, handleChange, handleSubmit, loading, error, success } = useRegister();

  return (
    <>
      <Head>
        <title>Daftar Akun - CareConnect</title>
        <meta name="description" content="Daftar akun baru di CareConnect" />
      </Head>

      <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light p-3">
        <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: '1000px', width: '100%' }}>
          <div className="row g-0">
            <div className="col-md-6 d-flex flex-column justify-content-center p-4 p-md-5">
              <h1 className="h2 fw-bold mb-4 text-center">Daftar</h1>

              {success && (
                <div className="alert alert-success text-center" role="alert">
                  Pendaftaran berhasil! Mengarahkan ke halaman login...
                </div>
              )}
              {error && (
                <div className="alert alert-danger text-center" role="alert">
                  {error}
                </div>
              )}

              <RegisterFormView
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
              />

              {/* Link untuk pengguna yang sudah punya akun */}
              <p className="text-center mt-3 mb-0">
                Sudah punya akun?{' '}
                <a href="/login" className="text-decoration-none">Login</a>
              </p>

            </div>

            <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-light p-4 p-md-5">
              <img
                src='/img/1.jpg' 
                alt='Ilustrasi Pendaftaran'
                className='img-fluid rounded-3'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}