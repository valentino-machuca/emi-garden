import React from 'react';
import { IoMdHeart } from "react-icons/io";
import styles from './AnniversaryModal.module.scss';

interface AnniversaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnniversaryModal: React.FC<AnniversaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <span className={styles.heartDecoration}><IoMdHeart /></span>
        <h2>¡Feliz 1er Aniversario!</h2>
        <p>
          Emi, mi amor, cumplimos un año juntos y agradezco cada momento que me regalaste.
          Sos una maravilla de persona, una gran mujer y la mejor compañia que la vida me pudo haber dado.
          Espero poder seguir compartiendo con vos muchos años más, llenos de amor, respeto, risas y cheese cheese.
        </p>
        <p>Gracias por existir.</p>
        <button className={styles.closeButton} onClick={onClose}>
          ¡Te amo! ❤️🧀
        </button>
      </div>
    </div>
  );
};

export default AnniversaryModal;
