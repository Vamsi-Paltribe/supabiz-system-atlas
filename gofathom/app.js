'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
function openTarget(id){const el=document.getElementById(id);if(!el)return;if(el.tagName==='DETAILS')el.open=true;el.hidden=false;el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}
$$('[data-station]').forEach(el=>{const go=()=>{const id='stage-'+el.dataset.station;history.replaceState(null,'','#'+id);openTarget(id);document.getElementById(id).querySelector('summary').focus({preventScroll:true});};el.addEventListener('click',go);el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});});
$('#expand-stages').addEventListener('click',()=>$$('#stages details').forEach(d=>d.open=true));
$('#collapse-stages').addEventListener('click',()=>$$('#stages details').forEach(d=>d.open=false));
window.addEventListener('hashchange',()=>openTarget(decodeURIComponent(location.hash.slice(1))));
if(location.hash)openTarget(decodeURIComponent(location.hash.slice(1)));
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{const d=document.getElementById(a.hash.slice(1));if(d?.tagName==='DETAILS'){d.hidden=false;d.open=true;}}));
$$('[data-workflow]').forEach(b=>b.addEventListener('click',()=>{const key=b.dataset.workflow;$$('.workflow').forEach(w=>w.hidden=key!=='all'&&w.id!==key);$$('[data-workflow]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));}));
$('#project-search').addEventListener('input',e=>{const q=e.target.value.toLowerCase().trim();let n=0;$$('#projects details').forEach(d=>{d.hidden=!d.textContent.toLowerCase().includes(q);if(!d.hidden)n++;});$('#project-count').textContent=`${n} of 18 project decisions`;});
const fmt=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
function calculate(){let v={};$$('[data-cost]').forEach(i=>v[i.dataset.cost]=Math.max(0,Number(i.value)||0));v.route_fraction=Math.min(1,v.route_fraction);const model=v.events*v.route_fraction*v.model_event_cost,media=v.audio_minutes*v.audio_rate+v.pages*v.page_rate+v.video_minutes*v.video_rate+v.storage_gb*v.storage_rate,human=v.review_hours*v.labor_rate,total=v.fixed+model+media+human+v.support,revenue=v.businesses*v.price_per_business;const rows=[['Monthly modeled cost',fmt(total)],['Model + media + storage',fmt(model+media)],['Human review',fmt(human)],['Cost / verified completion',v.completed>0?fmt(total/v.completed):'Undefined — no completions'],['Revenue − modeled cost',fmt(revenue-total)]];$('#cost-results').innerHTML=rows.map(([label,value])=>`<div class="metric"><span>${label}</span><strong>${value}</strong></div>`).join('');}
$$('[data-cost]').forEach(i=>i.addEventListener('input',calculate));calculate();
$('#copy-critique').addEventListener('click',async()=>{try{const r=await fetch('critique.txt');if(!r.ok)throw Error();await navigator.clipboard.writeText(await r.text());$('#copy-status').textContent='Copied';}catch{$('#copy-status').textContent='Use the Critique prompt link to copy the text.';}});
let printState=[];
window.addEventListener('beforeprint',()=>{printState=$$('details,.workflow').map(el=>({el,open:el.open,hidden:el.hidden}));printState.forEach(({el})=>{if(el.tagName==='DETAILS')el.open=true;el.hidden=false;});});
window.addEventListener('afterprint',()=>printState.forEach(({el,open,hidden})=>{if(el.tagName==='DETAILS')el.open=open;el.hidden=hidden;}));
$('#print').addEventListener('click',()=>window.print());
if('IntersectionObserver'in window){const obs=new IntersectionObserver(entries=>{entries.forEach(ent=>{if(ent.isIntersecting){$$('.toc nav a').forEach(a=>a.classList.toggle('active',a.hash==='#'+ent.target.id));}});},{rootMargin:'-12% 0px -65% 0px'});$$('.chapter').forEach(el=>obs.observe(el));}
