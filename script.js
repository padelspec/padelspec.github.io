const root=document.documentElement;
const themeToggle=document.getElementById('themeToggle');
const saved=localStorage.getItem('padel-theme');
const systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
root.dataset.theme=saved || (systemDark?'dark':'light');
function updateThemeIcon(){themeToggle.textContent=root.dataset.theme==='dark'?'☾':'☼'}
updateThemeIcon();
themeToggle.addEventListener('click',()=>{
  root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
  localStorage.setItem('padel-theme',root.dataset.theme); updateThemeIcon();
});

const burger=document.getElementById('burger'), nav=document.getElementById('nav');
burger.addEventListener('click',()=>nav.classList.toggle('mobile-open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('mobile-open')));

const modal=document.getElementById('modal');
const openModal=()=>{modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''};
document.querySelectorAll('.open-modal').forEach(b=>b.addEventListener('click',openModal));
document.getElementById('modalClose').addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

document.getElementById('leadForm').addEventListener('submit',e=>{
  e.preventDefault();
  e.currentTarget.closest('.modal-box').classList.add('sent');
});

document.querySelectorAll('.choice').forEach(btn=>btn.addEventListener('click',()=>{
  [...btn.parentElement.children].forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');
}));

let step=1;
const steps=[...document.querySelectorAll('.calc-step')], progress=document.getElementById('progressBar'), next=document.querySelector('.next-step');
function renderStep(){
  steps.forEach(s=>s.classList.toggle('active',Number(s.dataset.step)===step));
  progress.style.width=(step/3*100)+'%';
  next.innerHTML=step===3?'Отправить заявку <span>→</span>':'Далее <span>→</span>';
}
next.addEventListener('click',()=>{
  if(step<3){step++;renderStep()}else{openModal()}
});
document.getElementById('videoBtn').addEventListener('click',()=>{
  alert('Здесь можно подключить видео о производстве и монтаже падел-кортов.');
});
renderStep();
