import { useEffect, useRef } from 'react';

export const useClickSparks = () => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 999999;
    `;
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= 600) return false;

        const progress = elapsed / 600;
        const distance = progress * 30;
        const opacity = 1 - progress;

        spark.particles.forEach((p, i) => {
          const x = spark.x + distance * Math.cos(p.angle);
          const y = spark.y + distance * Math.sin(p.angle);

          // Draw spark
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
          ctx.fill();

          // Draw trail
          ctx.beginPath();
          ctx.moveTo(spark.x, spark.y);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(255, 153, 51, ${opacity * 0.5})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Click handler
    const handleClick = (e) => {
      const sparkCount = 12;
      const particles = Array.from({ length: sparkCount }, (_, i) => ({
        angle: (Math.PI * 2 * i) / sparkCount + (Math.random() * 0.2 - 0.1)
      }));

      sparksRef.current.push({
        x: e.clientX,
        y: e.clientY,
        particles,
        startTime: performance.now()
      });
    };

    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);
};
