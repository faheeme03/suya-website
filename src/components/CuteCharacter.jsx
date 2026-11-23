import React from 'react';
import { motion } from 'framer-motion';

export default function CuteCharacter({ state = 'default' }) {
  // state: 'default' | 'shocked' | 'stage2' | 'happy'

  return (
    <motion.div
      animate={
        state === 'happy'
          ? { y: [0, -14, 0], rotate: [-4, 4, -4] }
          : state === 'shocked'
          ? { x: [-5, 5, -5, 5, 0], rotate: [-3, 3, -3, 3, 0] }
          : state === 'stage2'
          ? { rotate: [-5, 5, -5], y: [-3, 3, -3] }
          : { y: [0, -8, 0], rotate: [-1.5, 1.5, -1.5] }
      }
      transition={{
        repeat: state === 'shocked' ? 1 : Infinity,
        duration: state === 'happy' ? 1.8 : state === 'shocked' ? 0.35 : state === 'stage2' ? 2.5 : 3.2,
        ease: 'easeInOut',
      }}
      className="relative w-44 h-44 sm:w-52 sm:h-52 drop-shadow-xl flex items-center justify-center select-none"
    >
      <svg viewBox="0 0 160 160" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Blue Shadow / Ambient Glow */}
        <ellipse cx="80" cy="154" rx="46" ry="7" fill="#93C5FD" opacity="0.4" />

        {/* Bear Ears */}
        <circle cx="42" cy="45" r="20" fill="#F8FAFC" stroke="#1E3A8A" strokeWidth="3.5" />
        <circle cx="42" cy="45" r="11" fill="#BAE6FD" />
        <circle cx="118" cy="45" r="20" fill="#F8FAFC" stroke="#1E3A8A" strokeWidth="3.5" />
        <circle cx="118" cy="45" r="11" fill="#BAE6FD" />

        {/* Bear Body */}
        <path
          d="M45 105 C32 120, 35 150, 58 152 L102 152 C125 150, 128 120, 115 105 Z"
          fill="#F8FAFC"
          stroke="#1E3A8A"
          strokeWidth="3.5"
        />

        {/* Bear Head */}
        <rect x="30" y="40" width="100" height="78" rx="39" fill="#F8FAFC" stroke="#1E3A8A" strokeWidth="3.5" />

        {/* Rosy/Cyan Blushing Cheeks */}
        <ellipse cx="48" cy="85" rx="9" ry="6" fill="#7DD3FC" opacity="0.7" />
        <ellipse cx="112" cy="85" rx="9" ry="6" fill="#7DD3FC" opacity="0.7" />

        {/* Dynamic Eyes based on state */}
        {state === 'happy' ? (
          <>
            {/* Happy curved smiling eyes */}
            <path d="M50 74 Q58 63 66 74" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" fill="none" />
            <path d="M94 74 Q102 63 110 74" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" fill="none" />
          </>
        ) : state === 'shocked' ? (
          <>
            {/* Watery shocked eyes */}
            <ellipse cx="58" cy="74" rx="7.5" ry="8.5" fill="#0F172A" />
            <circle cx="56" cy="71" r="2.8" fill="#FFFFFF" />
            <circle cx="61" cy="78" r="1.5" fill="#FFFFFF" />
            <ellipse cx="102" cy="74" rx="7.5" ry="8.5" fill="#0F172A" />
            <circle cx="100" cy="71" r="2.8" fill="#FFFFFF" />
            <circle cx="105" cy="78" r="1.5" fill="#FFFFFF" />
            {/* Teardrops */}
            <path d="M48 88 C48 93, 44 95, 44 95 C44 95, 40 93, 40 88 C40 84, 44 80, 44 80 C44 80, 48 84, 48 88 Z" fill="#38BDF8" />
          </>
        ) : state === 'stage2' ? (
          <>
            {/* Curious winking / thinking eyes */}
            <path d="M50 75 Q58 68 66 75" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="102" cy="74" r="5.8" fill="#0F172A" />
            <circle cx="100" cy="72" r="2" fill="#FFFFFF" />
          </>
        ) : (
          <>
            {/* Default sparkling anime eyes */}
            <circle cx="58" cy="74" r="5.5" fill="#0F172A" />
            <circle cx="56" cy="72" r="1.8" fill="#FFFFFF" />
            <circle cx="102" cy="74" r="5.5" fill="#0F172A" />
            <circle cx="100" cy="72" r="1.8" fill="#FFFFFF" />
          </>
        )}

        {/* Snout & Nose */}
        <ellipse cx="80" cy="80" rx="8.5" ry="6.5" fill="#E0F2FE" />
        <ellipse cx="80" cy="78" rx="4.2" ry="2.8" fill="#1E3A8A" />

        {/* Mouth based on state */}
        {state === 'happy' ? (
          <path d="M72 82 Q80 97 88 82 Z" fill="#38BDF8" stroke="#1E3A8A" strokeWidth="2.5" />
        ) : state === 'shocked' ? (
          <ellipse cx="80" cy="87" rx="6.5" ry="8.5" fill="#38BDF8" stroke="#1E3A8A" strokeWidth="2.2" />
        ) : (
          <>
            <path d="M80 81 C80 85, 75 86, 73 84" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M80 81 C80 85, 85 86, 87 84" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {/* Golden Royal Crown on head (Shown when happy!) */}
        {state === 'happy' && (
          <g>
            <path
              d="M66 36 L70 20 L80 29 L90 20 L94 36 Z"
              fill="#FBBF24"
              stroke="#B45309"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx="80" cy="25" r="2.5" fill="#38BDF8" />
            <circle cx="70" cy="22" r="1.8" fill="#EF4444" />
            <circle cx="90" cy="22" r="1.8" fill="#EF4444" />
          </g>
        )}

        {/* Heart held in paws */}
        <g transform="translate(62, 108)">
          <path
            d="M18 6 C18 2, 13 0, 9 3 C5 0, 0 2, 0 6 C0 11, 7 15, 9 17 C11 15, 18 11, 18 6 Z"
            fill={state === 'happy' ? '#3B82F6' : '#60A5FA'}
            stroke="#1E3A8A"
            strokeWidth="1.8"
          />
          {state === 'happy' && (
            <circle cx="9" cy="8" r="2" fill="#FFFFFF" opacity="0.6" />
          )}
        </g>

        {/* Paws holding heart */}
        <circle cx="60" cy="118" r="7.5" fill="#F8FAFC" stroke="#1E3A8A" strokeWidth="2.5" />
        <circle cx="100" cy="118" r="7.5" fill="#F8FAFC" stroke="#1E3A8A" strokeWidth="2.5" />
      </svg>
    </motion.div>
  );
}
