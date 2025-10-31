// Tabs
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.tab');
tabs.forEach(btn=>btn.addEventListener('click',()=>{
  tabs.forEach(b=>b.classList.remove('active'));
  sections.forEach(s=>s.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(btn.dataset.tab).classList.add('active');
  localStorage.setItem('tab', btn.dataset.tab);
}));
const savedTab = localStorage.getItem('tab');
if(savedTab){
  document.querySelector(`.tab-btn[data-tab="${savedTab}"]`)?.click();
}

// Done buttons persist
document.querySelectorAll('.done-btn').forEach((b,i)=>{
  const key = 'done-'+i;
  if(localStorage.getItem(key)==='1'){ b.classList.add('done'); b.textContent='✔️ Realizat'; }
  b.addEventListener('click',()=>{
    const done = b.classList.toggle('done');
    b.textContent = done ? '✔️ Realizat' : 'Marchează realizat';
    localStorage.setItem(key, done ? '1':'0');
  });
});

// Checklist persist
const list = document.getElementById('checklist');
if(list){
  Array.from(list.querySelectorAll('input[type="checkbox"]')).forEach((cb,i)=>{
    const key = 'chk-'+i;
    cb.checked = localStorage.getItem(key)==='1';
    cb.addEventListener('change',()=>localStorage.setItem(key, cb.checked?'1':'0'));
  });
  document.getElementById('resetList').addEventListener('click',()=>{
    Array.from(list.querySelectorAll('input[type="checkbox"]')).forEach((cb,i)=>{
      cb.checked = false; localStorage.setItem('chk-'+i,'0');
    });
  });
}

// Shuffle clues
const cluesEl = document.querySelector('.clues');
document.getElementById('shuffleClues').addEventListener('click',()=>{
  const items = Array.from(cluesEl.querySelectorAll('li'));
  for(let i=items.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [items[i],items[j]]=[items[j],items[i]];
  }
  cluesEl.innerHTML='';
  items.forEach(li=>cluesEl.appendChild(li));
});

// Theme toggle
const themeBtn=document.getElementById('themeToggle');
if(localStorage.getItem('theme')==='dark'){ document.body.classList.add('dark'); themeBtn.textContent='🌞 Mod luminos'; }
themeBtn.addEventListener('click',()=>{
  const dark = document.body.classList.toggle('dark');
  themeBtn.textContent = dark ? '🌞 Mod luminos' : '🌗 Mod întunecat';
  localStorage.setItem('theme', dark?'dark':'light');
});
