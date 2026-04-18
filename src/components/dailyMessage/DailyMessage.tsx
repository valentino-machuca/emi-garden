import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { IoMdHeart } from "react-icons/io";
import { ROMANTIC_MESSAGES } from './data/messages';

const DailyMessage = () => {
  const [showToast, setShowToast] = useState(false);

  // Lógica del mensaje del día
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const messageIndex = dayOfYear % ROMANTIC_MESSAGES.length;
  const todayMessage = ROMANTIC_MESSAGES[messageIndex];

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div style={floatingWrapper}>
      {/* TOAST */}
      {showToast && (
        <div style={toastStyle}>
          <p style={toastText}>{todayMessage}</p>
          <div style={toastArrow} />
        </div>
      )}

      {/* CHIP */}
      <button 
        style={chipStyle} 
        onClick={() => setShowToast(!showToast)}
        aria-label="Mensaje del día"
      >
        <IoMdHeart style={iconStyle} />
        <span style={chipTitle}>Mensaje del día</span>
      </button>
    </div>
  );
};

// --- ESTILOS CON TIPADO PARA TYPESCRIPT ---

const floatingWrapper: CSSProperties = {
  position: 'fixed',
  bottom: '70px',
  left: '30px',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  maxWidth: '300px',
};

const chipStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  border: '1px solid #e0e0e0',
  borderRadius: '50px',
  padding: '8px 15px',
  cursor: 'pointer',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  outline: 'none',
};

const iconStyle: CSSProperties = {
  fontSize: '1.6rem',
  color: '#ff6b6b',
  marginRight: '8px',
};

const chipTitle: CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: '600',
  color: '#444',
  whiteSpace: 'nowrap',
};

const toastStyle: CSSProperties = {
  backgroundColor: '#2c3e50',
  color: '#fff',
  padding: '15px',
  borderRadius: '15px',
  marginBottom: '12px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
  position: 'relative',
  width: 'calc(100vw - 40px)',
  maxWidth: '280px',
};

const toastText: CSSProperties = {
  margin: 0,
  fontSize: '0.95rem',
  lineHeight: '1.4',
  textAlign: 'left',
};

const toastArrow: CSSProperties = {
  position: 'absolute',
  bottom: '-6px',
  left: '20px',
  width: '12px',
  height: '12px',
  backgroundColor: '#2c3e50',
  transform: 'rotate(45deg)',
};

export default DailyMessage;