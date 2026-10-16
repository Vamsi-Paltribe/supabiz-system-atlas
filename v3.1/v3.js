'use strict';
const search=document.querySelector('#project-search');
const layer=document.querySelector('#project-layer');
const projects=[...document.querySelectorAll('.project')];
function filterProjects(){if(!search||!layer)return;const terms=search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);let count=0;for(const p of projects){p.hidden=!(terms.every(t=>p.textContent.toLowerCase().includes(t))&&(!layer.value||p.dataset.layers.split(',').includes(layer.value)));if(!p.hidden)count++;}document.querySelector('#project-count').textContent=`${count} of 21 projects`;document.querySelector('#no-projects').hidden=count!==0;}
search?.addEventListener('input',filterProjects);layer?.addEventListener('change',filterProjects);
document.querySelector('#reset-projects')?.addEventListener('click',()=>{search.value='';layer.value='';filterProjects();});
const choice=document.querySelector('#workflow-choice');
function showWorkflow(id){for(const w of document.querySelectorAll('.workflow'))w.hidden=w.id!==id;if(choice)choice.value=id;}
choice?.addEventListener('change',()=>showWorkflow(choice.value));
function revealHash(){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;const target=document.getElementById(id);if(!target)return;const w=target.closest('.workflow');if(w)showWorkflow(w.id);const p=target.closest('.project');if(p?.hidden){search.value='';layer.value='';filterProjects();}for(let n=target;n;n=n.parentElement)if(n.tagName==='DETAILS')n.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}
window.addEventListener('hashchange',revealHash);revealHash();
const format=document.querySelector('#ai-format');
format?.addEventListener('change',()=>{document.querySelector('#ai-text').hidden=format.value!=='text';document.querySelector('#ai-json').hidden=format.value!=='json';});
document.querySelector('#copy-ai')?.addEventListener('click',async()=>{const text=document.querySelector(format.value==='json'?'#ai-json':'#ai-text').textContent;try{await navigator.clipboard.writeText(text);document.querySelector('#copy-status').textContent='Complete reference copied.';}catch{document.querySelector('#copy-status').textContent='Clipboard unavailable. Download the TXT/JSON or select the reference below.';}});
window.addEventListener('beforeprint',()=>{document.querySelectorAll('details').forEach(d=>{d.dataset.wasOpen=String(d.open);d.open=true;});});
window.addEventListener('afterprint',()=>{document.querySelectorAll('details').forEach(d=>{d.open=d.dataset.wasOpen==='true';delete d.dataset.wasOpen;});});
