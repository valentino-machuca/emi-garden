import { useMemo } from 'react';

export const useGarden = (startDate: Date) => {
  return useMemo(() => {
    const now = new Date();
    const start = new Date(startDate);

    if (now < start) return { completedFlowers: 0, currentProgress: 0, currentYearLabel: 'Aún no comienza' };

    // Calculamos la diferencia total de meses
    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    
    // Si aún no llegamos al día del aniversario este mes, el mes actual no se ha completado.
    if (now.getDate() < start.getDate()) {
      months--;
    }

    const completedFlowers = Math.max(0, months);

    // Para el progreso: calculamos el inicio del periodo actual y el final del mismo
    const currentPeriodStart = new Date(start);
    currentPeriodStart.setMonth(start.getMonth() + completedFlowers);

    const nextPeriodStart = new Date(start);
    nextPeriodStart.setMonth(start.getMonth() + completedFlowers + 1);

    const diffTotal = nextPeriodStart.getTime() - currentPeriodStart.getTime();
    const diffElapsed = now.getTime() - currentPeriodStart.getTime();
    
    // El progreso es cuánto ha pasado desde que se plantó la última flor completada
    const currentProgress = Math.min(100, Math.max(0, (diffElapsed / diffTotal) * 100));

    const label = now.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    return {
      completedFlowers,
      currentProgress,
      currentYearLabel: label.charAt(0).toUpperCase() + label.slice(1),
    };
  }, [startDate]);
};