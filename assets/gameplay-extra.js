const FIRST_GIFT_AT = 18;

HEARTS.splice(
  0,
  HEARTS.length,
  { t: 1.6, high: false, msg: 'aku bangga sama kamu' },
  { t: 3.7, high: true, msg: 'makasih udah jadi kamu' },
  { t: 5.8, high: false, msg: 'you make ordinary days feel special' },
  { t: 7.9, high: true, msg: 'semoga umur 26 kamu penuh hal baik' },
  { t: 10, high: false, msg: 'aku selalu dukung kamu' },
  { t: 12.1, high: true, msg: 'semoga semua mimpimu makin dekat' },
  { t: 14.2, high: false, msg: 'thank you for being my favorite person' },
  { t: 16.3, high: true, msg: 'i love doing life with you' }
);

let crashed = false;
let giftAttempt = 0;
let cactusGauntlet = false;
let gauntletCactiRemaining = 0;
let gauntletSpawnTimer = 0;

function spawnGauntletCactus() {
  const compact = W <= 430;
  const width = compact ? 25 : 29;
  const height = compact ? 56 : 64;
  obstacles.push({
    x: W + 42,
    y: ground - height,
    w: width,
    h: height,
    type: 'cactus'
  });
}

function showMissedGiftMessage() {
  messageToast.textContent = 'kadonya kelewat — tiga kaktus dulu ♡';
  messageToast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => messageToast.classList.remove('show'), 2100);
}

function beginGiftRetry() {
  cactusGauntlet = true;
  gauntletCactiRemaining = giftAttempt === 1 ? 3 : 2;
  gauntletSpawnTimer = 0.42;
  nextObstacle = 99;
  showMissedGiftMessage();
}

function spawnNextGift() {
  spawnGift();
  giftAttempt += 1;
  cactusGauntlet = false;
  gauntletCactiRemaining = 0;
  giftNote.classList.remove('show');
}

const resetBeforeExtendedGameplay = reset;
reset = function resetExtendedGameplay() {
  crashed = false;
  giftAttempt = 0;
  cactusGauntlet = false;
  gauntletCactiRemaining = 0;
  gauntletSpawnTimer = 0;
  app.classList.remove('crash');
  dinoEl.classList.remove('crash');
  resetBeforeExtendedGameplay();
  heartCount.textContent = '♡ 0/' + HEARTS.length;
};

function handleCrash(obstacle) {
  if (crashed || finished) return;

  crashed = true;
  running = false;
  giftNote.classList.remove('show');
  app.classList.add('crash');
  dinoEl.classList.add('crash');
  messageToast.textContent = obstacle.type === 'cactus'
    ? 'aduh, kena kaktus — coba lagi ♡'
    : 'aduh, nabrak batu — coba lagi ♡';
  messageToast.classList.add('show');

  if (navigator.vibrate) navigator.vibrate([55, 35, 80]);

  schedule(() => {
    app.classList.remove('crash');
    dinoEl.classList.remove('crash');
    reset();
  }, 1050);
}

update = function updateExtendedGameplay(dt, now) {
  const sec = (now - start) / 1000;
  const base = W <= 430 ? 360 : 420;
  const max = W <= 430 ? 520 : 650;

  speed = Math.min(max, base + sec * 8);
  distance += speed * dt;
  score = Math.floor(distance / 18);
  scoreEl.textContent = String(score).padStart(5, '0');

  dino.vy += (W <= 430 ? 2250 : 2450) * dt;
  dino.y += dino.vy * dt;
  dino.phase += dt * 14;

  if (dino.y >= ground - dino.h) {
    dino.y = ground - dino.h;
    dino.vy = 0;
    dino.grounded = true;
  }

  clouds.forEach(cloud => {
    cloud.x -= cloud.v * dt;
    if (cloud.x < -120) {
      cloud.x = W + 80;
      cloud.y = 75 + Math.random() * H * 0.25;
    }
  });

  while (heartIndex < HEARTS.length && sec >= HEARTS[heartIndex].t) {
    spawnHeart(HEARTS[heartIndex]);
    heartIndex += 1;
  }

  collectibles.forEach(heart => {
    heart.x -= speed * dt;
    heart.phase += dt * 5;
  });

  for (let index = collectibles.length - 1; index >= 0; index -= 1) {
    const heart = collectibles[index];
    if (hit(dino, heart, 2)) {
      collectHeart(heart);
      collectibles.splice(index, 1);
    } else if (heart.x + heart.w < -20) {
      collectibles.splice(index, 1);
    }
  }

  if (!gift) {
    if (giftAttempt === 0 && !cactusGauntlet) {
      nextObstacle -= dt;

      if (nextObstacle <= 0 && sec < FIRST_GIFT_AT - 1.35) {
        spawnObstacle();
        nextObstacle = 1.05 + Math.random() * 1.25;
      }

      if (sec >= FIRST_GIFT_AT) {
        obstacles = [];
        spawnNextGift();
      }
    } else if (cactusGauntlet) {
      if (gauntletCactiRemaining > 0) {
        gauntletSpawnTimer -= dt;
        if (gauntletSpawnTimer <= 0) {
          spawnGauntletCactus();
          gauntletCactiRemaining -= 1;
          gauntletSpawnTimer = 0.88 + Math.random() * 0.22;
        }
      } else if (obstacles.length === 0) {
        spawnNextGift();
      }
    }
  }

  obstacles.forEach(obstacle => {
    obstacle.x -= speed * dt;
  });

  for (const obstacle of obstacles) {
    if (hit(dino, obstacle, 10)) {
      handleCrash(obstacle);
      return;
    }
  }

  obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.w > -20);

  if (gift) {
    gift.x -= speed * dt;
    giftNote.style.left = Math.max(112, Math.min(W - 112, gift.x + gift.w / 2)) + 'px';
    giftNote.style.top = Math.max(92, gift.y) + 'px';
    giftNote.classList.toggle(
      'show',
      gift.x < W * 0.86 && gift.x > dino.x + dino.w * 0.4
    );

    if (hit(dino, gift, 5)) {
      showCake();
      return;
    }

    if (gift.x + gift.w < 0) {
      gift = null;
      giftNote.classList.remove('show');
      beginGiftRetry();
    }
  } else {
    giftNote.classList.remove('show');
  }
};
