// Web Audio API Synthesizer for Romantic Music & Playful SFX
class SoundController {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.isPlayingMusic = false;
    this.timer = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  playTone(freq, type = 'sine', duration = 0.25, gainVal = 0.15) {
    if (this.isMuted) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {}
  }

  // Playful Boing / Whoosh when "No" runs away
  playEvasion(attempt = 1) {
    this.init();
    if (this.isMuted) return;
    const baseFreq = Math.max(180, 400 - (attempt % 8) * 20);
    this.playTone(baseFreq, 'triangle', 0.16, 0.18);
    setTimeout(() => {
      this.playTone(baseFreq + 100, 'sine', 0.12, 0.15);
    }, 50);
  }

  // Cartoonish soft shrink sound for Stage 2
  playShrink(step = 1) {
    this.init();
    if (this.isMuted) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const startFreq = Math.max(220, 520 - step * 35);
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(120, startFreq * 0.65), this.ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch {}
  }

  // Magic poof / sparkle chime when button disappears
  playPoof() {
    this.init();
    if (this.isMuted) return;
    const notes = [587.33, 739.99, 880.00, 1174.66];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.28, 0.14);
      }, idx * 60);
    });
  }

  // Chime when advancing from Stage 1 to Stage 2
  playStageAdvance() {
    this.init();
    if (this.isMuted) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.4, 0.18);
      }, idx * 90);
    });
  }

  // Grand celebration fanfare when final "Yes" is clicked
  playVictory() {
    this.init();
    if (this.isMuted) return;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.6, 0.22);
      }, idx * 100);
    });
  }

  // Soft romantic background music loop in E Major
  startBGM() {
    this.init();
    if (this.isPlayingMusic) return;
    this.isPlayingMusic = true;

    const notes = [
      { f: 659.25, d: 0.8 }, // E5
      { f: 739.99, d: 0.8 }, // F#5
      { f: 830.61, d: 1.2 }, // G#5
      { f: 987.77, d: 0.9 }, // B5
      { f: 830.61, d: 0.8 }, // G#5
      { f: 659.25, d: 1.4 }  // E5
    ];

    let step = 0;
    const playNext = () => {
      if (!this.isPlayingMusic) return;
      if (!this.isMuted) {
        const item = notes[step % notes.length];
        this.playTone(item.f, 'sine', item.d * 0.9, 0.08);
      }
      step++;
      this.timer = setTimeout(playNext, 1250);
    };

    playNext();
  }

  stopBGM() {
    this.isPlayingMusic = false;
    if (this.timer) clearTimeout(this.timer);
  }
}

export const sounds = new SoundController();
