import { useState, useEffect } from 'react';
import { IoMdHeart } from "react-icons/io";
import { ROMANTIC_MESSAGES } from './data/messages';
import styles from './DailyMessage.module.scss';

const DailyMessage = () => {
  const [showToast, setShowToast] = useState(false);

  // Lógica del mensaje del día
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const messageIndex = dayOfYear % ROMANTIC_MESSAGES.length;
  
  let todayMessage = ROMANTIC_MESSAGES[messageIndex];

  // Especial para el aniversario (15 de junio)
  if (now.getMonth() === 5 && now.getDate() === 15) {
    todayMessage = "¡Feliz aniversario, mi amor! ❤️❤️❤️ ";
  }

  // Especial para el cumpleaños (20 de julio)
  if (now.getMonth() === 6 && now.getDate() === 20) {
    todayMessage = "¡Feliz cumpleaños, mi amor! 🎂🎉✨ Que tengas un día maravilloso, te amo muchísimo ❤️";
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className={styles.floatingWrapper}>
      {/* TOAST */}
      {showToast && (
        <div className={styles.toastStyle}>
          <p className={styles.toastText}>{todayMessage}</p>
          <div className={styles.toastArrow} />
        </div>
      )}

      {/* CHIP */}
      <button 
        className={styles.chipStyle} 
        onClick={() => setShowToast(!showToast)}
        aria-label="Mensaje del día"
      >
        <IoMdHeart className={styles.iconStyle} />
        <span className={styles.chipTitle}>Mensaje del día</span>
      </button>
    </div>
  );
};

export default DailyMessage;