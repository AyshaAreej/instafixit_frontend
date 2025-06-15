import React from 'react';
import logo from '../../assets/images/logo.png'; // adjust the path as needed

const Loader = () => {
  return (
    <div
      id="loader"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        src={logo}
        alt="InstaFixit Loading"
        width={160}
        height="auto"
        style={{ animation: 'pulse 1.5s infinite ease-in-out' }}
      />
      <p className="mt-3 text-muted">Loading...</p>

      {/* Simple keyframes animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
