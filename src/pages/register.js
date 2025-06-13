import Head from 'next/head';
import { useRegister } from '../hooks/useRegister';
import RegisterFormView from '../components/auth/RegisterFormView'; 

export default function RegisterPage() {
  const { formData, handleChange, handleSubmit, loading, error, success } = useRegister();

  return (
    <>
      <Head>
        <title>Daftar Akun - CareConnect</title>
        <meta name="description" content="Daftar akun baru di CareConnect" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAX+D1F3H5Q+12P3t/7lM5x5T/FwE8/4f/2y/I" crossorigin="anonymous" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-GLhlQ8iJ7S6FhGjC4oJ1S8fW4z0+5zPzT2/4o/4/5p/6n/7p/8d/9m/0o/1r/2s/3t/4u/5v/6w/7x/8y/9z/+" crossorigin="anonymous"></script>
       
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