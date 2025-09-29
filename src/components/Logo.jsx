import React from 'react';

const SaifLogo = ({ size = 'medium', className = '' }) => {
  const sizeMap = {
    small: '20px',
    medium: '32px',
    large: '48px'
  };
  const fontSize = sizeMap[size] || sizeMap.medium;

  return (
    <div className={`saif-logo-wrapper ${className}`} style={{ fontSize }}>
      <div className="saif-text">
        saifweb.dev
      <div className='w-2 h-2 ml-2 mt-2 bg-white rounded-full animate-ping'></div>
      </div>

      <style>{`
        /* Import a clean professional font (Raleway, you can switch to Poppins or Inter if you like) */
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@600;700&display=swap');

        .saif-logo-wrapper {
          font-family: 'Raleway', sans-serif;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: #1e293b; /* Slate-800 */
        }

        .saif-text {
          background: linear-gradient(90deg, #1e3a8a, #2563eb, #0ea5e9); /* Navy → Blue → Cyan */
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-flex;
          align-items: center;
        }

        .dot {
          width: 6px;
          height: 6px;
          margin-left: 6px;
          border-radius: 50%;
          background: #0ea5e9; /* cyan accent */
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SaifLogo;
