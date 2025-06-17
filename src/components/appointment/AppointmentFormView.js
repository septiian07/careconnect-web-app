import React from 'react';
import { FaCalendarAlt, FaClock, FaClipboard, FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function AppointmentFormView({
  doctorInfo,
  formData,
  handleChange,
  handleMethodChange,
  handleSubmit,
  loading,
  submitError,
  submitSuccess,
  onBackClick
}) {
  const router = useRouter();
  if (loading && !doctorInfo) {
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

  if (submitError && !submitSuccess) {
    return (
      <div className="bg-light min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center py-5 px-3" style={{ backgroundColor: '#fffdf5' }}>
        <div className="alert alert-danger text-center my-5" role="alert">
          {submitError}
        </div>
        <button className="btn btn-primary" onClick={onBackClick}>Kembali</button>
      </div>
    );
  }

  if (!doctorInfo) {
    return (
      <div className="bg-light min-vh-100 w-100 d-flex flex-column align-items-center justify-content-center py-5 px-3" style={{ backgroundColor: '#fffdf5' }}>
        <div className="alert alert-warning text-center my-5" role="alert">
          Detail dokter tidak ditemukan untuk form janji temu.
        </div>
        <button className="btn btn-primary" onClick={onBackClick}>Kembali</button>
      </div>
    );
  }

  return (
    <main className="bg-light min-vh-100 w-100 d-flex flex-column align-items-center py-3 px-3" style={{ backgroundColor: '#fffdf5' }}>
      <div className="container-fluid position-relative" style={{ maxWidth: '1920px' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 d-flex flex-column">
            <h1 className="fw-bold text-dark mb-4 text-center" style={{ fontSize: '36px', fontFamily: "'Poppins',Helvetica", color: '#2f2f3e' }}>
              Form Janji Temu
            </h1>
            <div className="text-md-start mb-1 px-3">
              <h2 className="fw-bold text-dark mb-1" style={{ fontSize: '24px', fontFamily: "'Poppins',Helvetica", color: '#2f2f3e' }}>
                {doctorInfo.doctor_name}
              </h2>
              <p className="fw-medium text-info" style={{ fontSize: '18px', fontFamily: "'Poppins',Helvetica", color: '#37c8b3' }}>
                {doctorInfo.specialist}
              </p>
            </div>

            <section className="px-3 py-2 w-100" style={{ maxWidth: '1000px' }}>
              <form onSubmit={handleSubmit} className="row g-4">
                <div className="col-12 col-md-6">
                  <label htmlFor="date" className="form-label" style={{ fontSize: '18px', fontWeight: 'normal', color: '#2f2f3e', fontFamily: "'Poppins',Helvetica" }}>
                    Tanggal
                  </label>
                  <div className="input-group input-group-lg shadow-sm" style={{ borderRadius: '1.5rem', border: '3px solid #37c8b3', backgroundColor: '#fffdf5' }}>
                    <span className="input-group-text bg-transparent border-0" id="date-icon">
                      <FaCalendarAlt style={{ fontSize: '1.25rem', color: '#2f2f3e' }} />
                    </span>
                    <input
                      type="date"
                      className="form-control border-0 bg-transparent py-3"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      disabled={loading}
                      required
                      style={{ height: '50px', fontSize: '1rem', fontWeight: 'bold', color: '#2f2f3e99', fontFamily: "'Poppins',Helvetica'" }}
                    />
                  </div>
                </div>

                {/* Jam Field */}
                <div className="col-12 col-md-6">
                  <label htmlFor="time" className="form-label" style={{ fontSize: '18px', fontWeight: 'normal', color: '#2f2f3e', fontFamily: "'Poppins',Helvetica" }}>
                    Jam
                  </label>
                  <div className="input-group input-group-lg shadow-sm" style={{ borderRadius: '1.5rem', border: '3px solid #37c8b3', backgroundColor: '#fffdf5' }}>
                    <span className="input-group-text bg-transparent border-0" id="time-icon">
                      <FaClock style={{ fontSize: '1.5rem', color: '#2f2f3e' }} />
                    </span>
                    <input
                      type="time"
                      className="form-control border-0 bg-transparent py-3"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      disabled={loading}
                      required
                      style={{ height: '50px', fontSize: '1rem', fontWeight: 'bold', color: '#2f2f3e99', fontFamily: "'Poppins',Helvetica'" }}
                    />
                  </div>
                </div>

                {/* Pilih Metode Konsultasi */}
                <div className="col-12">
                  <label className="form-label" style={{ fontSize: '18px', fontWeight: 'normal', color: '#2f2f3e', fontFamily: "'Poppins',Helvetica" }}>
                    Pilih Metode Konsultasi
                  </label>
                  <div className="d-flex gap-3">
                    {['Online', 'Offline'].map((methodName) => (
                      <button
                        key={methodName}
                        type="button"
                        className={`btn py-2 px-4 fw-normal rounded-md`}
                        onClick={() => handleMethodChange(methodName)}
                        disabled={loading}
                        style={{
                          height: '50px', fontSize: '1rem', fontFamily: "'Poppins',Helvetica",
                          borderRadius: '0.75rem',
                          border: '3px solid #37c8b3',
                          backgroundColor: formData.method === methodName ? '#37c8b3' : 'transparent',
                          color: formData.method === methodName ? '#fffdf5' : '#2f2f3e',
                        }}
                      >
                        {methodName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Catatan Tambahan */}
                <div className="col-12">
                  <label htmlFor="note" className="form-label" style={{ fontSize: '18px', fontWeight: 'normal', color: '#2f2f3e', fontFamily: "'Poppins',Helvetica" }}>
                    Catatan Tambahan
                  </label>
                  <div className="input-group input-group-lg shadow-sm" style={{ borderRadius: '1.5rem', border: '3px solid #37c8b3', backgroundColor: '#fffdf5' }}>
                    <span className="input-group-text bg-transparent border-0 align-items-start pt-4" id="note-icon">
                      <FaClipboard style={{ fontSize: '1.25rem', color: '#2f2f3e' }} />
                    </span>
                    <textarea
                      className="form-control border-0 bg-transparent py-3"
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      disabled={loading}
                      rows="4"
                      style={{ height: 'auto', minHeight: '85px', fontSize: '1rem', color: '#2f2f3e', fontFamily: "'Poppins',Helvetica'" }}
                    ></textarea>
                  </div>
                </div>

                {/* Action Buttons */}
                {submitSuccess && (
                    <div className="col-12 alert alert-success text-center mt-3" role="alert">
                        {submitSuccess}
                    </div>
                )}
                {submitError && (
                    <div className="col-12 alert alert-danger text-center mt-3" role="alert">
                        {submitError}
                    </div>
                )}
                <div className="col-12 d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    onClick={onBackClick}
                    className="btn btn-primary fw-bold px-4 py-2"
                    disabled={loading}
                    style={{
                      height: '50px', backgroundColor: '#ff867c', color: '#fffdf5',
                      fontSize: '18px', borderRadius: '20px', boxShadow: '0px 4px 14px rgba(0,0,0,0.4)',
                      border: 'none', minWidth: '150px'
                    }}
                  >
                    Kembali
                  </button>

                  <button
                    type="submit"
                    className="btn btn-success fw-bold px-4 py-2"
                    disabled={loading}
                    style={{
                      height: '50px', backgroundColor: '#37c8b3', color: '#fffdf5',
                      fontSize: '18px', borderRadius: '20px', boxShadow: '0px 4px 14px rgba(0,0,0,0.4)',
                      border: 'none', minWidth: '150px'
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </section>
          </div> 
        </div> 
      </div>
    </main>
  );
}