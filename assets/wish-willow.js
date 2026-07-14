const willowPanel=document.getElementById('willowPanel');
const willowObject=willowPanel.querySelector('.willow-object');
const willowCaption=willowPanel.querySelector('.willow-caption');
const showWishForm=showWish;

let willowRunning=false;
let willowBroken=false;
let willowAudioContext=null;

const willowCrackAudio=new Audio('data:audio/wav;base64,UklGRkQIAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSAIAABHpmWfjo5sTYhi4/WEZaaizLfphFDV0IUnFUe/Nrmlih9LA4YsPmFgc6Kfbi5fx8fBa8J3lauRyO5g1mWMctKet2DGfmCNkYRKRkF8LYgXlpGfOzZwNGh2NmKnWHunUp9XdIq2hbWHvoeqyHRrhZxRr4SDkZCEgkBvhGhZY5ZgYpFVbmhCmVGDcnmAj2G+e61+zn9ykWBieGqGqHF1Vk18XKJmZkxQNmFOaWN1UlROdY1jdH5ukqd+X4SqnX24freGdq17prGxpXlheFxjilyaWHlvZUROdG9dhl1US25UkmmgnGpjZ3iPlqOlqYConqeNprJ1epKLeX5zl4qEWHhceV1XfoVcaXCDVGV4foCCkHh3dpuafoKKgoyTqpaflIebjJx3eZWOfo5gim90am5Ycntad3tnVYR9jnCKgHBugH+YfYWnhIKKlZeJj4yOjXqFgHWVhGt3eF1qeWGEf3l0ZXJnaG9zZ2lwh393hpJ8hYSYh4aViZCXnJqOm5V3jXuTineDbmeBdmtocmVnZ3Fge2d3enJ9c3R3hXSFkZeJfYyTj5GcjpWRgJOCl5N9knmCcXlygWxqdGNHp31QKmg4SjU3sGQ+Xa1mn76qnLysyJCWkWhgV2Bif8Bbg1+kfKh2m4lbQKuBjpZeoW+mpXNTa3CajaWLkEyMq1qodGS2hV6ar7qyh41man10ZnKFYnWQhl6PjFlzaJOEgX1uUWVefm5llYKUZFueq4yEbH14gaieiZaleWuDqqSMnGuJX2OHZHx/ZV1+b42He4BdjntZgG1nhIt0a3p8fplvkZ2FjKegfKRvpJp3g31sd5BlaHl1cIBzaX1piG6Bi4OHeYaJh4OLa5GTgnKSgHebmJmWl3SNgJeYeJeMenV0eG6LfXt0dnlmfHJrg2Vje3N5hnF7gXGFiIF8g3aBdpKKioGXfIN7iIh8jHiGg4CSeoOIf3aBfYR2dWuBcW9tZ3tqg3R/cG1wfnqAf3Z2gomOiJSMgIB7iJGIkoyHiY1+gnqAin6CeYKEf3hte3Byd3JzfIB3cXh/gnyEeYN7hoaIi3+LgoSCgYWFh4qLjX+Ah4iAgH56fnN/enl9fXZze3J0eHB0cnV7dHqBhYJ/fIiAh4WJi42BiX+ChIiHi4CIhICFh4OCeHuBe4B7eHV8fnN2fHZ4fX59gH1/eX18gISHhYV/gIKHhYmMgYaFhISJhYSHgoF8enqAf3qAd3p3dXh5d3h1fHp5fXt4en56foF9gIOBhIaHhoGDg4SEhIiGhIiBgIWEgn6AfX97eXx8ent2e3Z6eHl6fXl7eH56fYB+gYF+gn+DhYSHhYOHhoWHhoeFgYKAgIR9gn1/fnx6e3t3fHt7eXl6d3l6enh9fnp8fH1+gH+ChIOEhISCg4WFg4KGgoSChIGCg4GAgIB8fX18en17eHp7enh6e3t6ent8fH59f35+gX+CgYKFg4OEhIWFhISDhISDgoGAgoCAf39/e317e3p7fHp7eXl5e3x7fH19fH19gH6BgYCBgYKCg4WFg4OFhIODgoODgoCAgIF/f35+fnx8fHp6e3p6enl7fHt7e3x9fX1+fn9/gYGCgYGBhIOEg4SDgoSDgoKBgYKCgIB/f399fX19fHx8e3t7ent8e3x8fH19fX5+f39/gICAgYGCgoODgoOEhIOEg4KDgoKCgYGAfn9+fn19fH18fHt8e3t7e3t8e318fX19fn9/f4CBgIGCgoOCg4OCg4OCg4KBgoKBgYCAf39/fn59fX19fHx8fHx7e3x8fHx9fH1+fX5/f4CAgICBgYGCgoKDgoKCgoKCgYKBgYCBf39/f35+fn19fXx9fHx8fHx8fH18fX19fn5+fn9/f4CAgIGBgYGCgoKCgoKCgoKCgYGBgIB/f39/fn59fX19fXx9fHx8fHx8fH19fX1+fn5/f4CAgICBgIGBgYGBgoKCgoKBgYGBgICAgIB/f39+fn19fX19fXx8fXx8fX19fX19fn5+fn9/f4CAgICBgYGBgYGCgYKBgYGBgYGAgICAgH9/f35+fn19fX19fX18fX19fX19fX19fn5+f39/f4CAgICAgYGBgYGBgYGBgYGBgYGAgICAgH9/f35+fn59fX19fX19fX19fX19fX1+fn5+f39/f4CAgICAgYGBgYGBgYGBgYGBgYCAgICAf39/f39+fn5+fn19fX19fX19fX19fn5+fn5+f39/f3+AgICAgICBgYGBgYGBgYGBgYCAgICAgH9/f39+fn5+fn5+fX19fX19fX19fX5+fn5+fn9/f39/gICAgICAgIGBgYGBgYGBgYCAgICAgH9/f39/f35+fn5+fn59fX19fX19fX5+fn5+fn5/f39/f3+AgICAgICAgICBgYGAgICAgICAgIB/f39/f39+fn5+fn5+fn5+fX1+fn5+fn5+fn5+f39/f39/gICAgICAgICAgICAgICAgICAgICAgH9/f39/f35+fn5+fn5+fn5+fn5+fn5+fn5+fn5/f39/f39/gICAgICAgICAgICAgICAgICAgICAf39/f39/f35+fn5+fn5+fn5+fn5+fn5+fn5+fn9/f39/f39/gICAgICAgICAgICAgICAgICAgIB/f39/f39/f35+fn5+fn5+fn5+fn5+fn5+fn5+f39/f39/f39/gICAgICAgICAgICAgICAgICAgH9/f39/f39/f39+fn5+fn5+fn5+fn5+fn5+fn5+f39/f39/f39/f4CAgICAgICAgICAgICAgICA');
willowCrackAudio.preload='auto';
willowCrackAudio.volume=1;

willowObject.removeAttribute('aria-hidden');
willowObject.setAttribute('role','button');
willowObject.setAttribute('tabindex','0');
willowObject.setAttribute('aria-label','Tap to crack the One Wish Willow and unlock the wish form');

function playWillowCrackFallback(){
  try{
    const AudioContextClass=window.AudioContext||window.webkitAudioContext;
    if(!AudioContextClass)return;
    if(!willowAudioContext)willowAudioContext=new AudioContextClass();
    const play=()=>{
      const context=willowAudioContext;
      const now=context.currentTime;
      const duration=.22;
      const buffer=context.createBuffer(1,Math.ceil(context.sampleRate*duration),context.sampleRate);
      const data=buffer.getChannelData(0);
      for(let index=0;index<data.length;index+=1){
        const progress=index/data.length;
        const second=progress>.2?Math.pow(1-(progress-.2)/.8,4)*.55:0;
        data[index]=(Math.random()*2-1)*(Math.pow(1-progress,3)+second);
      }
      const noise=context.createBufferSource();
      const filter=context.createBiquadFilter();
      const gain=context.createGain();
      noise.buffer=buffer;
      filter.type='bandpass';
      filter.frequency.setValueAtTime(1350,now);
      filter.Q.setValueAtTime(.7,now);
      gain.gain.setValueAtTime(.52,now);
      gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      noise.start(now);
    };
    if(willowAudioContext.state==='suspended')willowAudioContext.resume().then(play).catch(()=>{});
    else play();
  }catch{}
}

function playWillowCrackSound(){
  try{
    willowCrackAudio.pause();
    willowCrackAudio.currentTime=0;
    willowCrackAudio.volume=1;
    const playback=willowCrackAudio.play();
    if(playback&&playback.catch)playback.catch(playWillowCrackFallback);
  }catch{
    playWillowCrackFallback();
  }
}

function resetWillow(){
  willowRunning=false;
  willowBroken=false;
  willowPanel.classList.remove('show','breaking');
  willowPanel.setAttribute('aria-hidden','true');
  willowCaption.textContent='tap the willow to break it';
  willowObject.setAttribute('aria-disabled','false');
  try{willowCrackAudio.pause();willowCrackAudio.currentTime=0}catch{}
}

const resetBeforeWillow=reset;
reset=function resetWithWillow(){
  resetWillow();
  resetBeforeWillow();
};

showWish=function showInteractiveWillow(){
  if(willowRunning)return;
  willowRunning=true;
  willowBroken=false;
  willowPanel.classList.remove('breaking');
  willowPanel.classList.add('show');
  willowPanel.setAttribute('aria-hidden','false');
  willowCaption.textContent='tap the willow to break it';
  willowObject.setAttribute('aria-disabled','false');
  try{willowCrackAudio.load()}catch{}
  schedule(()=>{
    try{willowObject.focus({preventScroll:true})}catch{}
  },180);
};

function crackWillow(){
  if(!willowRunning||willowBroken)return;
  willowBroken=true;
  willowObject.setAttribute('aria-disabled','true');
  willowCaption.textContent='wish unlocked ✦';
  playWillowCrackSound();
  willowPanel.classList.add('breaking');
  if(navigator.vibrate)navigator.vibrate([35,45,70]);
  schedule(()=>{
    willowPanel.classList.remove('show','breaking');
    willowPanel.setAttribute('aria-hidden','true');
    willowRunning=false;
    showWishForm();
  },1100);
}

willowObject.addEventListener('click',crackWillow);
willowObject.addEventListener('keydown',event=>{
  if((event.code==='Space'||event.code==='Enter')&&!willowBroken){
    event.preventDefault();
    crackWillow();
  }
});

resetWillow();
