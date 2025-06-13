import React from 'react';

export default function RegisterFormView({ formData, handleChange, handleSubmit, loading }) {
  return (
    <form onSubmit={handleSubmit}>
      {/* Username */}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-control form-control-lg"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      {/* Nama Lengkap */}
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nama Lengkap</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control form-control-lg"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      {/* Password */}
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control form-control-lg"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      {/* ID Peran */}
      <div className="mb-4">
        <label htmlFor="role_id" className="form-label">Pilih Peran</label>
        <select
          id="role_id"
          name="role_id"
          className="form-select form-select-lg" 
          value={formData.role_id}
          onChange={handleChange}
          required
          disabled={loading}
        >
          <option value="">-- Pilih Peran --</option> 
          <option value="1">Admin</option>
          <option value="2">Pengguna</option>
        </select>
      </div>

      {/* Tombol Daftar */}
      <div className="d-grid mb-3">
        <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              {' '}Mendaftar...
            </>
          ) : 'Daftar'}
        </button>
      </div>
    </form>
  );
}