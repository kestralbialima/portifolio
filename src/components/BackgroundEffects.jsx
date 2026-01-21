import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';

const ParticlesBackground = memo(({ themeColor }) => {
  const particles = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${themeColor} opacity-20`}
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -100, 0], opacity: [0, 0.3, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}
    </div>
  );
});

const BackgroundEffects = ({ theme }) => (
  <>
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" style={{ opacity: 0.5 }}>
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className={`absolute top-[-5%] left-[-5%] w-[60%] h-[60%] rounded-full blur-[80px] bg-gradient-to-br ${theme.gradient}`}
      />
    </div>
    <ParticlesBackground themeColor={theme.particle} />
    <div className="fixed inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] opacity-50" />
  </>
);

export default BackgroundEffects;