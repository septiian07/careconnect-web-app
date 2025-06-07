import React from 'react';

export default function RegisterFormView({ formData, handleChange, handleSubmit, loading }) {
  return (
    <form onSubmit={handleSubmit}>
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
        />
      </div>

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
        />
      </div>

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
        />
      </div>

      <div className="mb-4">
        <label htmlFor="role_id" className="form-label">ID Peran</label>
        <input
          type="number"
          id="role_id"
          name="role_id"
          className="form-control form-control-lg"
          value={formData.role_id}
          onChange={handleChange}
          required
          min="1"
        />
      </div>

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