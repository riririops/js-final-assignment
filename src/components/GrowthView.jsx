import React, { useRef, useEffect } from 'react';
import { useGrowthStore } from '../store/growthStore';
import { motion, useAnimation } from 'framer-motion';

export default function GrowthView() {
  const level = useGrowthStore((state) => state.level);
  const controls = useAnimation();
  const prevLevelRef = useRef(level);

  // レベル別の画像を返す
  const getCharacterImage = (level) => {
    if (level <= 3) return `/assets/egg${level}.png`;
    if (level <= 6) return `/assets/bird${level - 3}.png`;
    return '/assets/dragon.png';
  };

  // レベルアップ時にアニメーション
  useEffect(() => {
    if (level > prevLevelRef.current) {
      controls.start({
        scale: [1, 1.4, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.8 },
      });
    }
    prevLevelRef.current = level;
  }, [level, controls]);

  return (
    <div className="text-center mb-8">
      <motion.img
        animate={controls}
        src={getCharacterImage(level)}
        alt={`レベル${level}のキャラクター`}
        className="w-48 h-48 mx-auto"
      />
      <p className="text-lg mt-2 text-gray-800">レベル: {level}</p>
    </div>
  );
}
