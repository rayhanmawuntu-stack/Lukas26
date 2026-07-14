const willowPanel = document.getElementById('willowPanel');
const willowObject = willowPanel.querySelector('.willow-object');
const willowCaption = willowPanel.querySelector('.willow-caption');
const showWishForm = showWish;

let willowRunning = false;
let willowBroken = false;

willowObject.removeAttribute('aria-hidden');
willowObject.setAttribute('role', 'button');
willowObject.setAttribute('tabindex', '0');
willowObject.setAttribute(
  'aria-label',
  'Tap to crack the One Wish Willow and unlock the wish form'
);

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
  willowPanel.classList.add('breaking');

  if (navigator.vibrate) navigator.vibrate([35, 45, 70]);

  schedule(() => {
    willowPanel.classList.remove('show', 'breaking');
    willowPanel.setAttribute('aria-hidden', 'true');
    willowRunning = false;
    showWishForm();
  }, 950);
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