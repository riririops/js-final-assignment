// src/components/GrowthView.jsx
import React, { useRef, useEffect } from 'react';
import { useGrowthStore } from '../store/growthStore';
import { motion, useAnimation } from 'framer-motion';

export default function GrowthView() {
  const level = useGrowthStore((state) => state.level);
  const controls = useAnimation();
  const prevLevelRef = useRef(level);

  useEffect(() => {
    if (level > prevLevelRef.current) {
      controls.start({
        scale: [1, 1.4, 1],
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.8 },
      });
    }
    prevLevelRef.current = level;
  }, [level]);

  // レベルに応じたキャラ画像パスを返す
  const getCharacterImage = (level) => {
    if (level <= 2) return '../assets/egg1.png';              // 卵
    if (level <= 4) return '../assets/egg2.png';              // 割れかけ
    if (level <= 7) return '../assets/egg3.png';              // 孵化直前
    if (level <= 11) return '../assets/fish.png';              // 魚の赤ちゃん
    if (level <= 15) return '../assets/jellyfish.png';         // クラゲ
    if (level <= 20) return '../assets/dolphin.png';           // イルカ
    return '../assets/whale.png';                              // クジラ
  };

  return (
    <div className="text-center mb-6">
      <motion.img
        animate={controls}
        src={getCharacterImage(level)}
        alt={`レベル${level}のキャラクター`}
        width={200}
        height={200}
        className="mx-auto"
      />
      <p className="text-lg font-semibold mt-2">レベル: {level}</p>
    </div>
  );
}
