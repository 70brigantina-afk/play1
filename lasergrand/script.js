const q=(s,c=document)=>c.querySelector(s), qa=(s,c=document)=>[...c.querySelectorAll(s)];

// Mobile navigation
const menuBtn=q('.menu-btn'), nav=q('.nav');
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
qa('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Price filtering
const tabs=qa('[data-price-tab]'), rows=qa('.price-row');
function setPrice(cat){
  tabs.forEach(t=>t.classList.toggle('active',t.dataset.priceTab===cat));
  rows.forEach(r=>r.hidden=!(cat==='all'||r.dataset.cat===cat));
}
tabs.forEach(t=>t.addEventListener('click',()=>setPrice(t.dataset.priceTab)));
qa('[data-filter-price]').forEach(b=>b.addEventListener('click',()=>{setPrice(b.dataset.filterPrice);q('#prices').scrollIntoView({behavior:'smooth'});}));

// Estimate modal
const modal=q('#estimateModal');
function openModal(){modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>q('input',modal)?.focus(),120)}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow=''}
qa('[data-open-estimate]').forEach(b=>b.addEventListener('click',openModal));
qa('[data-close-modal]').forEach(b=>b.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});

// Demo form behavior
q('#estimateForm')?.addEventListener('submit',e=>{e.preventDefault();e.currentTarget.hidden=true;q('.form-success').hidden=false;});

// Scroll reveal
const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});
qa('.reveal').forEach(el=>io.observe(el));
