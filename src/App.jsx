import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Volume2, VolumeX, RotateCcw, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import CuteCharacter from './components/CuteCharacter';
import { sounds } from './utils/audio';

export default function App() {
  // Stages: 1 = Main Proposal, 2 = The Funny Agreement, 3 = Grand Celebration
  const [stage, setStage] = useState(1);

  // Stage 1 State
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  // Stage 2 State
  const [stage2NoCount, setStage2NoCount] = useState(0);
  const [stage2NoPosition, setStage2NoPosition] = useState({ x: 0, y: 0 });
  const [stage2NoTransformed, setStage2NoTransformed] = useState(false);

  // Character State: 'default' | 'shocked' | 'stage2' | 'happy'
  const [characterState, setCharacterState] = useState('default');
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef(null);

  // Funny Tamil/English phrases for Stage 1 NO button
  const stage1NoPhrases = [
    "No 🥺",
    "Aiyoyo Thangapulla! 🥺",
    "Think again Simjim! 💔",
    "Surya mattum thaan option! 😤",
    "Look how giant YES is! 👉",
    "No button broken sorry! 🏃‍♂️💨",
    "Unaku manase illaya? 😭",
    "Surya will cry pa! 🥹",
    "Just click YES already! 💙",
    "NO has left the chat! Bye! 👋😂"
  ];

  // Stage 2 funny phrases
  const stage2NoPhrases = [
    "No promises 😜",
    "Wait, I shrank?! 🤏",
    "Almost microscopic! 😂",
    "Actually YES! 🥰💙"
  ];

  // Start background music on user's first touch/interaction
  const handleInteractionStart = () => {
    sounds.startBGM();
  };

  const handleToggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  // =================== STAGE 1: NO BUTTON EVASION & DRASTIC YES GROWTH ===================
  const handleStage1NoInteraction = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    handleInteractionStart();

    const nextCount = noCount + 1;
    setNoCount(nextCount);
    sounds.playEvasion(nextCount);

    // Shocked expression on the bear
    setCharacterState('shocked');
    setTimeout(() => {
      setCharacterState('default');
    }, 800);

    // Drastic YES growth in just 2 clicks!
    // Click 1: jumps to 2.4x
    // Click 2: jumps to 4.2x (huge!)
    // 3+ up to 10: scales up to 6.2x
    if (nextCount === 1) {
      setYesScale(2.4);
    } else if (nextCount === 2) {
      setYesScale(4.2);
    } else {
      setYesScale((prev) => Math.min(prev + 0.5, 6.2));
    }

    // Dodging movement across display (responsive for mobile & desktop)
    const isMobile = window.innerWidth < 640;
    const maxX = isMobile ? 120 : 180;
    const maxY = isMobile ? 80 : 120;
    const randomX = (Math.random() - 0.5) * maxX * 1.8;
    const randomY = (Math.random() - 0.5) * maxY * 1.8;
    setNoPosition({ x: randomX, y: randomY });
  };

  // Stage 1 YES Click -> Transitions to Stage 2
  const handleStage1YesClick = () => {
    handleInteractionStart();
    sounds.playStageAdvance();
    setCharacterState('stage2');

    // Mini celebratory burst
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38BDF8', '#2563EB', '#60A5FA', '#FBBF24']
    });

    setStage(2);
  };

  // =================== STAGE 2: NO BUTTON SHRINKS & TRANSFORMS INTO YES ===================
  const handleStage2NoInteraction = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    handleInteractionStart();

    if (stage2NoTransformed) {
      // If already transformed into YES, treat as YES!
      handleFinalYesClick();
      return;
    }

    const nextCount = stage2NoCount + 1;
    setStage2NoCount(nextCount);
    sounds.playShrink();

    // After 2 shrinks, it morphs into another YES button!
    if (nextCount >= 3) {
      setStage2NoTransformed(true);
      return;
    }

    // Dodge in stage 2
    const isMobile = window.innerWidth < 640;
    const maxX = isMobile ? 100 : 150;
    const maxY = isMobile ? 70 : 100;
    const randomX = (Math.random() - 0.5) * maxX * 1.6;
    const randomY = (Math.random() - 0.5) * maxY * 1.6;
    setStage2NoPosition({ x: randomX, y: randomY });
  };

  // =================== FINAL YES CLICK (STAGE 2 -> CELEBRATION) ===================
  const handleFinalYesClick = () => {
    handleInteractionStart();
    sounds.playVictory();
    setStage(3);
    setCharacterState('happy');

    // Multi-burst Royal Blue & Gold celebration fireworks!
    const end = Date.now() + 3 * 1000;
    const colors = ['#2563EB', '#38BDF8', '#60A5FA', '#FBBF24', '#F59E0B', '#93C5FD'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.65 },
        colors: colors,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.65 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Reset journey
  const handleReset = () => {
    setStage(1);
    setNoCount(0);
    setYesScale(1);
    setNoPosition({ x: 0, y: 0 });
    setStage2NoCount(0);
    setStage2NoPosition({ x: 0, y: 0 });
    setStage2NoTransformed(false);
    setCharacterState('default');
  };

  return (
    <div
      onClick={handleInteractionStart}
      className="relative min-h-screen w-full bg-gradient-to-br from-[#F0F7FF] via-[#E2EFFF] to-[#D5E8FD] font-sans antialiased text-[#1E3A8A] flex flex-col items-center justify-center p-4 select-none overflow-x-hidden"
    >
      {/* Ambient Floating Blue Hearts, Stars & Sparkles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-50">
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-8, 8, -8] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="absolute top-10 left-8 text-3xl"
        >
          💙
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], rotate: [6, -6, 6] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="absolute top-16 right-12 text-4xl"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ y: [-8, 8, -8], scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 4.2, ease: 'easeInOut' }}
          className="absolute bottom-16 left-10 text-3xl"
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{ y: [8, -8, 8], rotate: [-10, 10, -10] }}
          transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
          className="absolute bottom-20 right-14 text-3xl"
        >
          💎
        </motion.div>
        <motion.div
          animate={{ y: [-12, 12, -12], scale: [0.9, 1.1, 0.9] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="absolute top-1/2 left-6 text-2xl"
        >
          💫
        </motion.div>
        <motion.div
          animate={{ y: [12, -12, 12], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
          className="absolute top-1/2 right-6 text-2xl"
        >
          👑
        </motion.div>
      </div>

      {/* Floating Audio Toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleToggleMute();
        }}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/85 backdrop-blur-md border border-[#93C5FD] shadow-md text-[#1E3A8A] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-[#64748B]" />
        ) : (
          <div className="flex items-center gap-1">
            <span className="w-1 bg-[#2563EB] h-3 rounded-full animate-pulse" />
            <span className="w-1 bg-[#2563EB] h-2 rounded-full animate-pulse delay-75" />
            <Volume2 className="w-4 h-4 text-[#2563EB]" />
          </div>
        )}
      </button>

      {/* Stage Progress Header */}
      <div className="z-10 mb-3 flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#93C5FD]/60 shadow-sm text-xs font-semibold text-[#1E40AF]">
        <span className={`px-2 py-0.5 rounded-full ${stage >= 1 ? 'bg-[#2563EB] text-white' : 'bg-gray-200 text-gray-500'}`}>
          1
        </span>
        <span className="text-[#3B82F6]">→</span>
        <span className={`px-2 py-0.5 rounded-full ${stage >= 2 ? 'bg-[#2563EB] text-white' : 'bg-gray-200 text-gray-500'}`}>
          2
        </span>
        <span className="text-[#3B82F6]">→</span>
        <span className={`px-2 py-0.5 rounded-full ${stage >= 3 ? 'bg-[#2563EB] text-white' : 'bg-gray-200 text-gray-500'}`}>
          👑
        </span>
      </div>

      {/* Main Interactive Card */}
      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-md rounded-3xl bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#EFF6FF] p-7 sm:p-9 shadow-[0_16px_40px_rgba(30,64,175,0.16)] border-2 border-[#93C5FD] text-center flex flex-col items-center justify-center my-auto transition-all"
      >
        <AnimatePresence mode="wait">
          {stage === 1 ? (
            /* =================== STAGE 1: THE MAIN PROPOSAL =================== */
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Cute Character */}
              <div className="mb-2">
                <CuteCharacter state={characterState} />
              </div>

              {/* Main Romantic Question */}
              <h1 className="font-script text-4xl sm:text-5xl font-bold text-[#1E3A8A] leading-snug tracking-tight mb-2">
                Will you always be Surya's forever Thangapulla, Simjim? 👑💙
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base font-semibold text-[#3B82F6] mb-6">
                Pick an option Thangapulla... think very carefully 🥺👉👈
              </p>

              {/* Buttons Arena */}
              <div className="relative w-full flex items-center justify-center gap-4 sm:gap-6 min-h-[120px] my-2">
                {/* YES BUTTON (Grows drastically in 2 attempts!) */}
                <motion.button
                  onClick={handleStage1YesClick}
                  animate={{
                    scale: yesScale,
                  }}
                  whileHover={{ scale: yesScale * 1.05 }}
                  whileTap={{ scale: yesScale * 0.95 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  style={{
                    fontSize: `${Math.min(18 + noCount * 6, 38)}px`,
                    padding: `${Math.min(14 + noCount * 8, 34)}px ${Math.min(32 + noCount * 14, 76)}px`,
                  }}
                  className="rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold shadow-[0_8px_30px_rgba(37,99,235,0.45)] hover:brightness-105 active:scale-95 transition-shadow z-30 cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Yes! 🥰</span>
                  <Heart className="w-5 h-5 fill-white shrink-0" />
                </motion.button>

                {/* NO BUTTON (Dodges wildly + pushed out as YES gets gigantic) */}
                <motion.button
                  animate={{
                    x: noPosition.x,
                    y: noPosition.y,
                    opacity: noCount >= 8 ? 0.3 : 1,
                  }}
                  onMouseEnter={handleStage1NoInteraction}
                  onClick={handleStage1NoInteraction}
                  onTouchStart={handleStage1NoInteraction}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="px-6 py-3 rounded-full bg-white/95 text-[#1E3A8A] font-bold text-base border-2 border-[#93C5FD] shadow-md hover:bg-blue-50 active:scale-95 transition-colors z-20 cursor-pointer whitespace-nowrap"
                >
                  {stage1NoPhrases[Math.min(noCount, stage1NoPhrases.length - 1)]}
                </motion.button>
              </div>

              {/* Playful Evasion Hints */}
              <div className="min-h-[28px] mt-4">
                {noCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={noCount}
                    className="text-xs sm:text-sm font-semibold text-[#2563EB]"
                  >
                    {noCount === 1 && "Hey! Don't you dare touch that! 😤"}
                    {noCount === 2 && "Are you really saying no to your Surya?! 🥺💔"}
                    {noCount === 3 && "Look how massive YES is getting! Just click it! 👉"}
                    {noCount === 4 && "No chance Thangapulla, you're forever his! 💙"}
                    {noCount >= 5 && "There is literally no escape from saying YES! 🥰👑"}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ) : stage === 2 ? (
            /* =================== STAGE 2: THE FUNNY AGREEMENT =================== */
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Character in curious/thinking mode */}
              <div className="mb-2">
                <CuteCharacter state={characterState} />
              </div>

              {/* Stage Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-[#1E40AF] text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
                <span>Stage 2: Official Terms & Conditions 📜</span>
              </div>

              {/* Funny Agreement Question */}
              <h2 className="font-script text-3xl sm:text-4xl font-bold text-[#1E3A8A] leading-snug tracking-tight mb-2">
                Do you promise to let Surya pamper you forever & eat half his food? 🍟🍧
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-[#3B82F6] mb-5">
                Lifetime agreement for Simjim & Surya... no cancellations allowed! 🤭
              </p>

              {/* Stage 2 Buttons */}
              <div className="relative w-full flex items-center justify-center gap-4 sm:gap-6 min-h-[90px] my-2">
                {/* Main Yes Button */}
                <motion.button
                  onClick={handleFinalYesClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-7 py-3 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold text-base shadow-[0_8px_25px_rgba(37,99,235,0.4)] hover:brightness-105 active:scale-95 transition-all z-30 cursor-pointer flex items-center gap-2"
                >
                  <span>100% Yes! 🥰</span>
                  <Heart className="w-4 h-4 fill-white shrink-0" />
                </motion.button>

                {/* Stage 2 NO Button: Shrinks, dodges, and turns into YES! */}
                <motion.button
                  animate={{
                    x: stage2NoPosition.x,
                    y: stage2NoPosition.y,
                    scale: stage2NoTransformed ? 1 : Math.max(0.3, 1 - stage2NoCount * 0.3),
                  }}
                  onMouseEnter={handleStage2NoInteraction}
                  onClick={handleStage2NoInteraction}
                  onTouchStart={handleStage2NoInteraction}
                  transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                  className={`px-6 py-3 rounded-full font-bold text-base shadow-md cursor-pointer transition-colors z-20 whitespace-nowrap ${
                    stage2NoTransformed
                      ? 'bg-gradient-to-r from-[#0284C7] to-[#2563EB] text-white border-2 border-white'
                      : 'bg-white/95 text-[#1E3A8A] border-2 border-[#93C5FD] hover:bg-blue-50'
                  }`}
                >
                  {stage2NoTransformed
                    ? "Actually YES! 🥰💙"
                    : stage2NoPhrases[Math.min(stage2NoCount, stage2NoPhrases.length - 1)]}
                </motion.button>
              </div>

              {/* Stage 2 Hints */}
              <div className="min-h-[24px] mt-3">
                {stage2NoCount > 0 && !stage2NoTransformed && (
                  <p className="text-xs font-semibold text-[#2563EB]">
                    {stage2NoCount === 1 && "Hey! Look, the No button is shrinking! 😂"}
                    {stage2NoCount === 2 && "It's almost gone! Just click Yes! 🤏"}
                  </p>
                )}
                {stage2NoTransformed && (
                  <p className="text-xs font-bold text-[#059669]">
                    Haha! The No button surrendered and turned into YES too! 🎉💙
                  </p>
                )}
              </div>
            </motion.div>
          ) : (
            /* =================== STAGE 3: GRAND CELEBRATION =================== */
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              className="w-full flex flex-col items-center justify-center"
            >
              {/* Dancing Crowned Bear */}
              <div className="mb-2">
                <CuteCharacter state="happy" />
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mb-3 border border-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>OFFICIALLY SEALED FOREVER 🔒✨</span>
              </div>

              {/* Main Heading */}
              <h2 className="font-script text-4xl sm:text-5xl font-extrabold text-[#1E3A8A] tracking-tight mb-2">
                YAAAY! I KNEW IT! 🥰💙
              </h2>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#1E40AF] font-medium max-w-sm mb-2 leading-relaxed">
                You are officially Surya's favorite Thangapulla for life, Simjim! 💍👑
              </p>

              <p className="text-xs sm:text-sm text-[#475569] max-w-xs mb-6">
                No returns, no cancellations, lifetime pampering & unlimited love guaranteed! 💙✨
              </p>

              {/* Play Again Button */}
              <div className="flex justify-center w-full">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-white text-[#1E3A8A] font-bold text-sm border border-[#93C5FD] shadow-sm hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-[#2563EB]" />
                  <span>Play again ↺</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Signature */}
      <p className="mt-6 text-xs text-[#64748B] font-medium z-10 text-center">
        Made with all my heart for my Thangapulla Simjim 💙 • By your Surya
      </p>
    </div>
  );
}
