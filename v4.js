"use strict";
const all=(q)=>Array.from(document.querySelectorAll(q));
all('[data-layer-button]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.layerButton;all('[data-layer]').forEach(p=>p.hidden=id!=='all'&&p.dataset.layer!==id);all('[data-layer-button]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));document.getElementById('layer-count').textContent=id==='all'?'All 11 responsibility layers':id+' selected · ownership, interactions and acceptance gate below';}));
function filterProjects(){const q=document.getElementById('project-search').value.toLowerCase().trim(),l=document.getElementById('project-layer').value;let count=0;all('[data-project]').forEach(p=>{const ok=(!q||p.textContent.toLowerCase().includes(q))&&(l==='all'||p.dataset.layers.split(' ').includes(l));p.hidden=!ok;if(ok)count++});document.getElementById('project-count').textContent=count+' of 18 projects';}
document.getElementById('project-search').addEventListener('input',filterProjects);document.getElementById('project-layer').addEventListener('change',filterProjects);document.getElementById('project-reset').addEventListener('click',()=>{document.getElementById('project-search').value='';document.getElementById('project-layer').value='all';filterProjects()});
all('[data-flow-button]').forEach(b=>b.addEventListener('click',()=>{all('[data-flow]').forEach(p=>p.hidden=p.dataset.flow!==b.dataset.flowButton);all('[data-flow-button]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
function filterLearnings(){const q=document.getElementById('learning-search').value.toLowerCase().trim(),l=document.getElementById('learning-layer').value,s=document.getElementById('learning-stage').value;let count=0;all('[data-learning]').forEach(p=>{const ok=(!q||p.textContent.toLowerCase().includes(q))&&(l==='all'||p.dataset.layerId===l)&&(s==='all'||p.dataset.stage===s);p.hidden=!ok;if(ok)count++});document.getElementById('learning-count').textContent=count+' of 298 saved entries';}
for(const id of ['learning-search','learning-layer','learning-stage'])document.getElementById(id).addEventListener(id.endsWith('search')?'input':'change',filterLearnings);
document.getElementById('learning-reset').addEventListener('click',()=>{document.getElementById('learning-search').value='';document.getElementById('learning-layer').value='all';document.getElementById('learning-stage').value='all';filterLearnings()});
function cost(){const read=(id)=>{const el=document.getElementById(id),n=Number(el.value);return Number.isFinite(n)&&n>=Number(el.min)&&n<=Number(el.max)?n:null;};const m=read('messages'),q=read('wake'),r=read('reviews'),w=read('completed');const out=document.getElementById('cost-output');if([m,q,r,w].some(x=>x===null)||w<=0){out.textContent='Enter values within the shown ranges; completed workflows must be greater than zero.';return;}const model=m*q/100*2*(2500/1000000+400*4/1000000),review=r*2*.5,total=150+8+50+model+review;out.textContent='Illustrative monthly total: $'+total.toFixed(2)+' · $'+(total/w).toFixed(2)+' per correct completed workflow. Model $'+model.toFixed(2)+'; review $'+review.toFixed(2)+'; other assumed costs $208.00.';}
for(const id of ['messages','wake','reviews','completed'])document.getElementById(id).addEventListener('input',cost);cost();
const initial=document.querySelector('[data-layer-button="L05"]');if(initial)initial.click();const flow=document.querySelector('[data-flow-button="W01"]');if(flow)flow.click();

function revealHash(){
 const el=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(!el)return;
 const layer=el.closest('[data-layer]');if(layer)document.querySelector('[data-layer-button="'+layer.dataset.layer+'"]').click();
 if(el.closest('[data-project]'))document.getElementById('project-reset').click();
 const learning=el.closest('[data-learning]');if(learning){document.getElementById('learning-reset').click();learning.open=true;}
 const flow=el.closest('[data-flow]');if(flow)document.querySelector('[data-flow-button="'+flow.dataset.flow+'"]').click();
 el.scrollIntoView();
}
window.addEventListener('hashchange',revealHash);revealHash();
