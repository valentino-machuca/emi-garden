import React, { useEffect, useRef } from 'react';
import { FaCakeCandles } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import styles from './BirthdayModal.module.scss';

interface BirthdayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: 'rect' | 'circle' | 'heart';
}

const COLORS = ['#ffb703', '#fb8500', '#ff4d6d', '#ff758f', '#70e000', '#3a86ff', '#8338ec', '#ff006e'];

const BirthdayModal: React.FC<BirthdayModalProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // 140 partículas de confeti desbordando desde el centro hacia arriba
    const particles: Particle[] = Array.from({ length: 140 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 14 + 5;
      return {
        x: width / 2 + (Math.random() * 80 - 40),
        y: height / 2.5 + (Math.random() * 40 - 20),
        size: Math.random() * 9 + 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 7, // explosión inicial hacia arriba
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        opacity: 1,
        shape: Math.random() > 0.35 ? 'rect' : Math.random() > 0.5 ? 'circle' : 'heart',
      };
    });

    let startTime = performance.now();

    const render = (time: number) => {
      const elapsed = time - startTime;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.24; // gravedad
        p.vx *= 0.98; // resistencia del aire
        p.rotation += p.rotationSpeed;

        if (elapsed > 2800) {
          p.opacity -= 0.012; // desvanecimiento suave después de 2.8s
        }

        if (p.opacity <= 0) return;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Forma de corazón
          ctx.beginPath();
          const s = p.size / 2;
          ctx.moveTo(0, s / 4);
          ctx.quadraticCurveTo(0, 0, s / 2, 0);
          ctx.quadraticCurveTo(s, 0, s, s / 2);
          ctx.quadraticCurveTo(s, s, 0, s * 1.3);
          ctx.quadraticCurveTo(-s, s, -s, s / 2);
          ctx.quadraticCurveTo(-s, 0, -s / 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, s / 4);
          ctx.fill();
        }

        ctx.restore();
      });

      if (elapsed < 5000) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <canvas ref={canvasRef} className={styles.confettiCanvas} />
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.decorations}>
          <span className={styles.sparkleLeft}><IoSparkles /></span>
          <span className={styles.cakeIcon}><FaCakeCandles /></span>
          <span className={styles.sparkleRight}><IoSparkles /></span>
        </div>
        
        <h2>¡Feliz Cumpleaños amor! 🎂</h2>
        
        <div className={styles.messageContent}>
          <p>
            Gracias por ser esa persona tan increíble que ilumina todo a su alrededor y llena cada día de alegría. 
            Que este cumpleaños estes rodeada de amor y cariño, tal como te lo mereces.
          </p>
        </div>

        <button className={styles.celebrateBtn} onClick={onClose}>
          Te amo! 🎂💖
        </button>
      </div>
    </div>
  );
};

export default BirthdayModal;
