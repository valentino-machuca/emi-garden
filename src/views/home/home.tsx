import React, { useEffect, useState } from 'react';
import { useGarden } from '../../hooks/useGarden';
import CurrentYearFlower from '../../components/CurrentYearFlower';
import styles from './home.module.scss';
import CompletedFlower from '../../components/CompletedFlower';
import Cat from '../../components/pets/cat/Cat';
import { BiSolidCat } from "react-icons/bi"; 
import { RxCross2 } from "react-icons/rx";
import DailyMessage from '../../components/dailyMessage/DailyMessage';

const MIN_FLOWER_SLOTS = 24;

interface Position {
  top: number;
  left: number;
  scale: number;
  zIndex: number;
}

const Home: React.FC = () => {
  const [catActive, setCatActive] = useState(false);


  const startDate = new Date('2025-06-15');
  const { completedFlowers, currentProgress } = useGarden(startDate);
  const totalSlots = Math.max(MIN_FLOWER_SLOTS, completedFlowers + 1);
  
  const [positions, setPositions] = useState<Position[]>([]);

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
        <p>En este lugar va a existir una flor por cada mes que me regales a tu lado.</p>
        <small>{completedFlowers} flores</small>
      </div>

      <button 
        className={styles.catToggleBtn}
        onClick={() => setCatActive(prev => !prev)}
        aria-label={catActive ? "Ocultar gato" : "Mostrar gato"}
        title={catActive ? "Guardar Pipi" : "Llamar a pipi"}
      >
        {catActive ? <RxCross2 size={'28px'} /> : <BiSolidCat size={'28px'} /> }
      </button>

      <div className={styles.scatteredGarden}>
        {catActive && <Cat />}
        {positions.map((pos, index) => {
          const isHistorical = index < completedFlowers;
          const isCurrentFlower = index === completedFlowers;
          
          const flowerDate = new Date(startDate);
          flowerDate.setMonth(startDate.getMonth() + index);
          const label = flowerDate.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }).toUpperCase();

          const style = {
            top: `${pos.top}%`,
            left: `${pos.left}%`,
            transform: `scale(${isCurrentFlower ? 1.2 : pos.scale})`,
            zIndex: isCurrentFlower ? 100 : Math.floor(pos.top),
          };

          return (
            <div key={`flower-${index}`}
                  className={`
                    ${styles.flowerWrapper} 
                    ${isCurrentFlower ? styles.currentWrapper : styles.historicalWrapper}
                    ${index == 0 ? styles.anniversaryFlower : ''}
                  `} style={style}>
              <div className={styles.flowerVisual}>
                {isHistorical && <>
                  <div className={styles.flowerLabel}>
                    {label}
                  </div>
                  <CompletedFlower delayMs={index * 90} index={index}/>
                </>}
                {isCurrentFlower && <>
                  <div className={styles.flowerLabel}>
                    {isCurrentFlower ? 'Creciendo 🌱' : label}
                  </div>
                  <CurrentYearFlower progress={currentProgress} />
                </>}
              </div>
            </div>
          );
        })}
      </div>
      <DailyMessage />
    </div>
  );
};

export default Home;