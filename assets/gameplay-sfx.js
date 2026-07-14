let gameplaySfxContext = null;

function getGameplaySfxContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!gameplaySfxContext) gameplaySfxContext = new AudioContextClass();
  return gameplaySfxContext;
}

function unlockGameplaySfx() {
  try {
    const context = getGameplaySfxContext();
    if (context && context.state === 'suspended') {
      context.resume().catch(() => {});
    }
  } catch {}
}

function runGameplaySound(play) {
  try {
    const context = getGameplaySfxContext();
    if (!context) return;

    if (context.state === 'suspended') {
      context.resume().then(() => play(context)).catch(() => {});
    } else {
      play(context);
    }
  } catch {}
}

function playHeartCollectSound() {
  runGameplaySound(context => {
    const now = context.currentTime + 0.004;
    const master = context.createGain();
    const first = context.createOscillator();
    const second = context.createOscillator();
    const firstGain = context.createGain();
    const secondGain = context.createGain();

    master.gain.setValueAtTime(0.22, now);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    first.type = 'sine';
    first.frequency.setValueAtTime(660, now);
    first.frequency.exponentialRampToValueAtTime(990, now + 0.1);
    firstGain.gain.setValueAtTime(0.65, now);
    firstGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

    second.type = 'triangle';
    second.frequency.setValueAtTime(990, now + 0.07);
    second.frequency.exponentialRampToValueAtTime(1320, now + 0.16);
    secondGain.gain.setValueAtTime(0.0001, now);
    secondGain.gain.setValueAtTime(0.45, now + 0.07);
    secondGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.27);

    first.connect(firstGain);
    second.connect(secondGain);
    firstGain.connect(master);
    secondGain.connect(master);
    master.connect(context.destination);

    first.start(now);
    second.start(now + 0.07);
    first.stop(now + 0.2);
    second.stop(now + 0.29);
  });
}

function playCollisionSound() {
  runGameplaySound(context => {
    const now = context.currentTime + 0.004;
    const duration = 0.25;
    const buffer = context.createBuffer(
      1,
      Math.ceil(context.sampleRate * duration),
      context.sampleRate
    );
    const samples = buffer.getChannelData(0);

    for (let index = 0; index < samples.length; index += 1) {
      const progress = index / samples.length;
      samples[index] = (Math.random() * 2 - 1) * Math.pow(1 - progress, 2.4);
    }

    const master = context.createGain();
    const noise = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    const impact = context.createOscillator();
    const impactGain = context.createGain();

    master.gain.setValueAtTime(0.28, now);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    noise.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1700, now);
    filter.frequency.exponentialRampToValueAtTime(420, now + duration);
    noiseGain.gain.setValueAtTime(0.72, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    impact.type = 'square';
    impact.frequency.setValueAtTime(150, now);
    impact.frequency.exponentialRampToValueAtTime(52, now + 0.2);
    impactGain.gain.setValueAtTime(0.55, now);
    impactGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(master);
    impact.connect(impactGain);
    impactGain.connect(master);
    master.connect(context.destination);

    noise.start(now);
    impact.start(now);
    impact.stop(now + 0.25);
  });
}

const collectHeartWithoutGameplaySfx = collectHeart;
collectHeart = function collectHeartWithSound(heart) {
  collectHeartWithoutGameplaySfx(heart);
  playHeartCollectSound();
};

const handleCrashWithoutGameplaySfx = handleCrash;
handleCrash = function handleCrashWithSound(obstacle) {
  const shouldPlay = !crashed && !finished;
  handleCrashWithoutGameplaySfx(obstacle);
  if (shouldPlay) playCollisionSound();
};

addEventListener('pointerdown', unlockGameplaySfx, { capture: true, passive: true });
addEventListener('touchstart', unlockGameplaySfx, { capture: true, passive: true });
addEventListener('keydown', event => {
  if (event.code === 'Space' || event.code === 'ArrowUp' || event.code === 'Enter') {
    unlockGameplaySfx();
  }
}, { capture: true });
