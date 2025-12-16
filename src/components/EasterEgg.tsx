'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function EasterEgg() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl"
          initial={{
            x: '50vw',
            y: '50vh',
            scale: 0,
            rotate: 0,
          }}
          animate={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            scale: [0, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        >
          {['🎉', '🎂', '🎁', '✨', '🌟', '💫', '🎊', '🥳'][i % 8]}
        </motion.div>
      ))}
    </motion.div>
  );
}