const LONG_GIFT_AT=14;
HEARTS[0].t=2;
HEARTS[1].t=5;
HEARTS[2].t=8.5;
HEARTS[3].t=11.5;

let crashed=false;
const resetBeforeCollision=reset;
reset=function(){
  crashed=false;
  app.classList.remove('crash');
  dinoEl.classList.remove('crash');
  resetBeforeCollision();
};

function handleCrash(obstacle){
  if(crashed||finished)return;
  crashed=true;
  running=false;
  giftNote.classList.remove('show');
  app.classList.add('crash');
  dinoEl.classList.add('crash');
  messageToast.textContent=obstacle.type==='cactus'
    ? 'aduh, kena kaktus — coba lagi ♡'
    : 'aduh, nabrak batu — coba lagi ♡';
  messageToast.classList.add('show');
  if(navigator.vibrate)navigator.vibrate([55,35,80]);
  schedule(()=>{
    app.classList.remove('crash');
    dinoEl.classList.remove('crash');
    reset();
  },1050);
}

update=function(dt,now){
  const sec=(now-start)/1000,
    base=W<=430?360:420,
    max=W<=430?520:650;

  speed=Math.min(max,base+sec*8);
  distance+=speed*dt;
  score=Math.floor(distance/18);
  scoreEl.textContent=String(score).padStart(5,'0');

  dino.vy+=(W<=430?2250:2450)*dt;
  dino.y+=dino.vy*dt;
  dino.phase+=dt*14;
  if(dino.y>=ground-dino.h){
    dino.y=ground-dino.h;
    dino.vy=0;
    dino.grounded=true;
  }

  clouds.forEach(c=>{
    c.x-=c.v*dt;
    if(c.x<-120){
      c.x=W+80;
      c.y=75+Math.random()*H*.25;
    }
  });

  while(heartIndex<HEARTS.length&&sec>=HEARTS[heartIndex].t){
    spawnHeart(HEARTS[heartIndex]);
    heartIndex++;
  }

  collectibles.forEach(h=>{
    h.x-=speed*dt;
    h.phase+=dt*5;
  });

  for(let i=collectibles.length-1;i>=0;i--){
    const h=collectibles[i];
    if(hit(dino,h,2)){
      collectHeart(h);
      collectibles.splice(i,1);
    }else if(h.x+h.w<-20){
      collectibles.splice(i,1);
    }
  }

  if(!gift){
    nextObstacle-=dt;
    if(nextObstacle<=0&&sec<LONG_GIFT_AT-1.2){
      spawnObstacle();
      nextObstacle=1.05+Math.random()*1.25;
    }
    if(sec>=LONG_GIFT_AT){
      obstacles=[];
      spawnGift();
    }
  }

  obstacles.forEach(o=>o.x-=speed*dt);
  for(const obstacle of obstacles){
    if(hit(dino,obstacle,10)){
      handleCrash(obstacle);
      return;
    }
  }
  obstacles=obstacles.filter(o=>o.x+o.w>-20);

  if(gift){
    gift.x-=speed*dt;
    giftNote.style.left=Math.max(112,Math.min(W-112,gift.x+gift.w/2))+'px';
    giftNote.style.top=Math.max(92,gift.y)+'px';
    giftNote.classList.toggle('show',gift.x<W*.86&&gift.x>dino.x+dino.w*.4);
    if(hit(dino,gift,5)){
      showCake();
      return;
    }
    if(gift.x+gift.w<0){
      gift.x=W+90;
      giftNote.classList.remove('show');
    }
  }else{
    giftNote.classList.remove('show');
  }
};
