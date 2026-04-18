import React, { useEffect, useRef, useState } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import flowerAnimation from '../assets/flower.json';
import styles from './CompletedFlower.module.scss';

interface CompletedFlowerProps {
  delayMs?: number;
  animateOnLoad?: boolean;
  index?: number;
}

const CompletedFlower: React.FC<CompletedFlowerProps> = ({
  delayMs = 0,
  animateOnLoad = true,
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const instance = lottieRef.current;
    if (!instance || !isReady) return;
    const lastFrame = 59; 

    const timeoutId = window.setTimeout(() => {
      if (animateOnLoad) {
        instance.playSegments([0, lastFrame], true);
      } else {
        instance.goToAndStop(lastFrame, true);
      }
    }, delayMs);

    return () => window.clearTimeout(timeoutId);
  }, [animateOnLoad, delayMs, isReady]);

  return (
    <div className={styles.completedFlowerContainer}>
      <Lottie
        lottieRef={lottieRef}
        animationData={flowerAnimation}
        loop={false}
        autoplay={false}
        onDOMLoaded={() => setIsReady(true)}
        className={styles.lottieVisual}
      />
    </div>
  );
};

export default CompletedFlower;