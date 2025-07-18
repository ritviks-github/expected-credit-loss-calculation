import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [user_email, set_user_email] = useState(null);
  const [role, set_role] = useState(null);

  useEffect(() => {
    const mail = localStorage.getItem('email');
    const r = localStorage.getItem('role');
    if (!mail || !r) {
      navigate('/login');
    }
    if (mail) set_user_email(mail);
    if (r) set_role(r);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{
      width: '100%',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #dee2e6',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      padding: '0.75rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h5 style={{ margin: 0, fontWeight: 600, color: 'black' }}>
        Credit Risk Analytics
      </h5>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        fontSize: '0.95rem'
      }}>
        {user_email && (
          <div style={{ fontWeight: 500 }}>{user_email}</div>
        )}
        {role && (
          <div style={{
            backgroundColor: '#e2e6ea',
            padding: '0.3rem 0.6rem',
            borderRadius: '15px',
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'capitalize'
          }}>
            {role}
          </div>
        )}
        <button onClick={handleLogout} className="btn btn-outline-dark btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
}
