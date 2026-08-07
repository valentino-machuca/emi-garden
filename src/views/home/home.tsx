import React, { useEffect, useState } from 'react';
import { useGarden } from '../../hooks/useGarden';
import styles from './home.module.scss';
import CompletedFlower from '../../components/CompletedFlower';
import Cat from '../../components/pets/cat/Cat';
import { BiSolidCat } from "react-icons/bi"; 
import { RxCross2 } from "react-icons/rx";

const MIN_FLOWER_SLOTS = 24;

interface Position {
  top: number;
  left: number;
  scale: number;
  zIndex: number;
}

const Home: React.FC = () => {
  const [catActive, setCatActive] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isBirthdayModalOpen, setIsBirthdayModalOpen] = useState(false);

  const startDate = new Date('2025-06-15T00:00:00');
  const { completedFlowers } = useGarden(startDate);
  const totalSlots = Math.max(MIN_FLOWER_SLOTS, completedFlowers + 1);

  const [positions, setPositions] = useState<Position[]>([]);

  // Lógica para mostrar el botón de aniversario a partir del 15/06/2026
  // const now = new Date('2026-07-16T00:00:00');
  // const anniversaryDate = new Date('2026-06-15T00:00:00');
  // const showAnniversaryButton = now >= anniversaryDate;

  // Lógica para mostrar el botón de cumpleaños a partir del 20/07/2026
  // const birthdayDate = new Date('2026-07-20T00:00:00');
  // const showBirthdayButton = now >= birthdayDate;

  useEffect(() => {
    const newPositions = Array.from({ length: totalSlots }).map(() => ({
      top: 15 + Math.random() * 70,
      left: 5 + Math.random() * 70,
      scale: 0.8 + Math.random() * 0.4,
      zIndex: 0,
    }));
    setPositions(newPositions);
  }, [totalSlots]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Mi jardín para Emi</h1>
        <p>En este lugar existe una flor por cada mes que me regalaste a tu lado.</p>
        <small>{completedFlowers} flores</small>
      </div>

      <div className={styles.controls}>
        <button 
          className={styles.catToggleBtn}
          onClick={() => setCatActive(prev => !prev)}
          aria-label={catActive ? "Ocultar gato" : "Mostrar gato"}
          title={catActive ? "Guardar Pipi" : "Llamar a pipi"}
        >
          {catActive ? <RxCross2 size={'28px'} /> : <BiSolidCat size={'28px'} /> }
        </button>
      </div>

      <div className={styles.scatteredGarden}>
        {catActive && <Cat />}
        {positions.map((pos, index) => {
          const isHistorical = index < completedFlowers;
          const isCurrentFlower = index === completedFlowers;
          const isOneYearAnniversary = index === 11;
          
          const flowerDate = new Date(startDate);
          flowerDate.setMonth(startDate.getMonth() + index);
          let label = flowerDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }).toUpperCase();

          if (isOneYearAnniversary) {
            label = "PRIMER AÑO";
          }

          const style = {
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            transform: `scale(${isOneYearAnniversary ? 1.5 : (isCurrentFlower ? 1.2 : pos.scale)})`,
            zIndex: isOneYearAnniversary ? 200 : (isCurrentFlower ? 100 : Math.floor(pos.top)),
          };

          return (
            <div key={`flower-${index}`}
                  className={`
                    ${styles.flowerWrapper} 
                    ${isCurrentFlower ? styles.currentWrapper : styles.historicalWrapper}
                    ${index == 0 ? styles.anniversaryFlower : ''}
                    ${isOneYearAnniversary ? styles.oneYearSpecial : ''}
                  `} style={style}>
              <div className={styles.flowerVisual}>
                {isHistorical && (
                  <>
                    <div className={styles.flowerLabel}>
                      {label}
                    </div>
                    <CompletedFlower delayMs={index * 90} index={index}/>
                  </>
                )}
                {/* {isCurrentFlower && (
                  <>
                    <div className={styles.flowerLabel}>
                      Creciendo 🌱
                    </div>
                    <CurrentYearFlower progress={currentProgress} />
                  </>
                )} */}
              </div>
            </div>
          );
        })}
      </div>
      {/* <DailyMessage /> */}
      {/* <AnniversaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      {/* <BirthdayModal isOpen={isBirthdayModalOpen} onClose={() => setIsBirthdayModalOpen(false)} /> */}
    </div>
  );
};

export default Home;