const rows=[...document.querySelectorAll('.audit-row')];
const input=document.querySelector('#audit-search');
const filters=[...document.querySelectorAll('[data-filter]')];
let active='all';
function filterRows(){
 const q=input.value.trim().toLocaleLowerCase();let count=0;
 rows.forEach(row=>{const show=(active==='all'||row.dataset.kind===active)&&row.textContent.toLocaleLowerCase().includes(q);row.hidden=!show;if(show)count++;});
 document.querySelector('#audit-count').textContent=`${count} of ${rows.length} audit areas shown`;
 filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===active)));
}
input.addEventListener('input',filterRows);
filters.forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;filterRows();}));
function revealHash(){
 const id=decodeURIComponent(location.hash.slice(1));const node=document.getElementById(id);
 if(node?.classList.contains('audit-row')){active='all';input.value='';filterRows();node.open=true;node.scrollIntoView({block:'start'});}
}
window.addEventListener('hashchange',revealHash);revealHash();
document.querySelector('#copy-prompt').addEventListener('click',async()=>{
 const text=document.querySelector('#audit-prompt');const status=document.querySelector('#copy-status');
 try{await navigator.clipboard.writeText(text.value);status.textContent='Complete prompt copied.';}
 catch{ text.focus();text.select();status.textContent='Prompt selected. Use Copy, or download prompt.txt.'; }
});
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)document.querySelectorAll('.toc nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+entry.target.id));}),{rootMargin:'-10% 0px -65% 0px'});
 document.querySelectorAll('.chapter').forEach(s=>observer.observe(s));
}
