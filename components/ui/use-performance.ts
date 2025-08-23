import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  isLowPerformance: boolean;
}

export function usePerformance(threshold: number = 30): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    frameTime: 16.67,
    isLowPerformance: false
  });
  
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationId = useRef<number>();

  useEffect(() => {
    const measurePerformance = (currentTime: number) => {
      frameCount.current++;
      
      if (currentTime - lastTime.current >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
        const frameTime = 1000 / fps;
        const isLowPerformance = fps < threshold;
        
        setMetrics({ fps, frameTime, isLowPerformance });
        
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationId.current = requestAnimationFrame(measurePerformance);
    };

    animationId.current = requestAnimationFrame(measurePerformance);

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [threshold]);

  return metrics;
}

// Hook for detecting device capabilities
export function useDeviceCapabilities() {
  const [capabilities, setCapabilities] = useState({
    isMobile: false,
    hasWebGL: false,
    hasLowPowerMode: false,
    connectionType: 'unknown' as string
  });

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    // Check connection type
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    setCapabilities({
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      hasWebGL: !!gl,
      hasLowPowerMode: (navigator as any).deviceMemory ? (navigator as any).deviceMemory < 4 : false,
      connectionType: connection ? connection.effectiveType : 'unknown'
    });
  }, []);

  return capabilities;
}
