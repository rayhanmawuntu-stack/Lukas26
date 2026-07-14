const willowPanel = document.getElementById('willowPanel');
const willowObject = willowPanel.querySelector('.willow-object');
const willowCaption = willowPanel.querySelector('.willow-caption');
const showWishForm = showWish;

let willowRunning = false;
let willowBroken = false;
let willowAudioContext = null;

willowObject.removeAttribute('aria-hidden');
willowObject.setAttribute('role', 'button');
willowObject.setAttribute('tabindex', '0');
willowObject.setAttribute(
  'aria-label',
  'Tap to crack the One Wish Willow and unlock the wish form'
);

function playWillowCrackSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!willowAudioContext) willowAudioContext = new AudioContextClass();

    const play = () => {
      const context = willowAudioContext;
      const now = context.currentTime;
      const duration = 0.18;
      const buffer = context.createBuffer(
        1,
        Math.ceil(context.sampleRate * duration),
        context.sampleRate
      );
      const data = buffer.getChannelData(0);

      for (let index = 0; index < data.length; index += 1) {
        const progress = index / data.length;
        data[index] = (Math.random() * 2 - 1) * Math.pow(1 - progress, 3.2);
      }

      const noise = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const noiseGain = context.createGain();
      const tone = context.createOscillator();
      const toneGain = context.createGain();

      noise.buffer = buffer;
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1250, now);
      filter.Q.setValueAtTime(0.8, now);
      noiseGain.gain.setValueAtTime(0.24, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      tone.type = 'triangle';
      tone.frequency.setValueAtTime(145, now);
      tone.frequency.exponentialRampToValueAtTime(72, now + 0.12);
      toneGain.gain.setValueAtTime(0.12, now);
      toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(context.destination);
      tone.connect(toneGain);
      toneGain.connect(context.destination);

      noise.start(now);
      tone.start(now);
      tone.stop(now + 0.15);
    };

    if (willowAudioContext.state === 'suspended') {
      willowAudioContext.resume().then(play).catch(() => {});
    } else {
      play();
    }
  } catch {}
}

function resetWillow() {
  willowRunning = false;
  willowBroken = false;
  willowPanel.classList.remove('show', 'breaking');
  willowPanel.setAttribute('aria-hidden', 'true');
  willowCaption.textContent = 'tap the willow to break it';
  willowObject.setAttribute('aria-disabled', 'false');
}

const resetBeforeWillow = reset;
reset = function resetWithWillow() {
  resetWillow();
  resetBeforeWillow();
};

showWish = function showInteractiveWillow() {
  if (willowRunning) return;

  willowRunning = true;
  willowBroken = false;
  willowPanel.classList.remove('breaking');
  willowPanel.classList.add('show');
  willowPanel.setAttribute('aria-hidden', 'false');
  willowCaption.textContent = 'tap the willow to break it';
  willowObject.setAttribute('aria-disabled', 'false');

  schedule(() => {
    try {
      willowObject.focus({ preventScroll: true });
    } catch {}
  }, 180);
};

function crackWillow() {
  if (!willowRunning || willowBroken) return;

  willowBroken = true;
  willowObject.setAttribute('aria-disabled', 'true');
  willowCaption.textContent = 'wish unlocked ✦';
  playWillowCrackSound();
  willowPanel.classList.add('breaking');

  if (navigator.vibrate) navigator.vibrate([35, 45, 70]);

  schedule(() => {
    willowPanel.classList.remove('show', 'breaking');
    willowPanel.setAttribute('aria-hidden', 'true');
    willowRunning = false;
    showWishForm();
  }, 1100);
}

willowObject.addEventListener('click', crackWillow);
willowObject.addEventListener('keydown', event => {
  if (
    (event.code === 'Space' || event.code === 'Enter') &&
    !willowBroken
  ) {
    event.preventDefault();
    crackWillow();
  }
});

resetWillow();
