'use strict';
const data=JSON.parse(document.getElementById('factory-data').textContent);
const byId=Object.fromEntries(data.stations.map(s=>[s.id,s]));
const projects=Object.fromEntries(data.projects.map(p=>[p.id,p]));
const all=q=>Array.from(document.querySelectorAll(q));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let current='01',panel='flow',journey='varun',company='all',zoom=100;
function badge(mode){return '<span class="tag '+mode.toLowerCase()+'">'+esc(mode)+'</span>';}
function evidence(p){return p.evidence_status.startsWith('public_')?'Public product / docs / demo evidence':'Selected source, client or examples; bounded checks';}
function select(id,scroll=false){if(!byId[id]&&!data.foundations.some(f=>f.id===id))return;current=id;render();history.replaceState(null,'','#station-'+id);if(scroll)document.getElementById('inspector').scrollIntoView({block:'start'});}
function render(){
 const s=byId[current],f=data.foundations.find(x=>x.id===current),item=s||f;
 all('[data-station]').forEach(n=>{n.classList.toggle('selected',n.dataset.station===current);n.setAttribute('aria-pressed',String(n.dataset.station===current));n.classList.toggle('dim',company!=='all'&&!byId[n.dataset.station].comparisons.some(c=>c.project===company));});
 all('[data-pick]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.pick===current)));
 all('[data-contributor]').forEach(n=>{const station=byId[n.dataset.contributor];n.textContent=company==='all'?station.comparisons.slice(0,2).map(c=>projects[c.project].name).join(' · '):station.comparisons.some(c=>c.project===company)?projects[company].name:'';});
 const relevant=company==='all'?data.stations:data.stations.filter(x=>x.comparisons.some(c=>c.project===company));
 document.getElementById('company-caption').textContent=company==='all'?'All 18 projects · select a station to compare approaches':projects[company].name+' · '+relevant.length+' relevant stations highlighted';
 document.getElementById('inspector-label').textContent=s?'STATION '+s.id+' / '+s.phase:'SHARED FOUNDATION '+f.id;
 document.getElementById('inspector-title').textContent=item.name;
 document.getElementById('question').textContent=s?s.question:'Used across the belt';
 document.getElementById('purpose').textContent=item.purpose;
 all('[data-panel]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.panel===panel)));
 let out='';
 if(panel==='flow'){
  if(s){out='<div class="io"><div><small>Input</small><p>'+esc(s.inputs)+'</p></div><div><small>Output</small><p>'+esc(s.outputs)+'</p></div></div><div class="example"><b>ILLUSTRATIVE · '+(journey==='varun'?'VARUN / RESTAURANT':'RAMYA / LAW CHAMBER')+'</b><p>'+esc(s.examples[journey])+'</p></div><div class="gate"><b>Must be true before advancing</b>'+esc(s.gate)+'</div><p><b>When the path loops:</b> '+esc(s.loop)+'</p><p><b>First delivery:</b> '+esc(s.sprint)+' · <a href="../v4/#'+s.layers[0]+'">'+esc(s.layers.join(' / '))+'</a></p>';}
  else out='<div class="note">This is infrastructure used across multiple stations. Its packages are counted once in the build inventory, rather than repeated for each workflow.</div><ul class="parts">'+f.parts.map(p=>'<li><b>'+esc(p.name)+'</b><p>'+esc(p.deliverable)+'</p></li>').join('')+'</ul><p>Related v4 layers: '+esc(f.layers.join(' / '))+'</p>';
 }else if(panel==='parts'){
  out='<p>'+item.parts.length+' named planning packages. “Build” means SupaBiz owns the business behavior; it can still use maintained libraries.</p><ul class="parts">'+item.parts.map(p=>'<li><b>'+esc(p.id)+' · '+esc(p.name)+'</b>'+badge(p.mode)+'<p>'+esc(p.deliverable)+'</p></li>').join('')+'</ul>';
 }else{
  const entries=s?s.comparisons:f.projects.map(p=>({project:p,approach:projects[p].take+' SupaBiz application: '+projects[p].build}));
  const shown=entries.filter(x=>company==='all'||x.project===company);
  out='<p>These are differentiators from saved reviews, not claims that every company runs this whole station internally.</p>'+(shown.length?shown.map(c=>{const p=projects[c.project];return '<article class="comparison"><h3>'+esc(p.name)+'</h3><span class="tag">'+esc(evidence(p))+'</span><p>'+esc(c.approach)+'</p><small>Adoption: '+esc(p.decision)+'</small><p><a href="../v4/research/'+esc(p.review_origin)+'.txt">Read the saved review ↗</a></p></article>';}).join(''):'<div class="note">No documented differentiator for '+esc(projects[company].name)+' at this station. This is an evidence gap, not proof that the company lacks the capability. Choose “All 18 projects” to compare other approaches.</div>');
 }
 document.getElementById('panel-content').innerHTML=out;
 document.getElementById('previous').disabled=!s||s.id==='01';document.getElementById('next').disabled=!s||s.id==='12';
 document.getElementById('selection-status').textContent=(s?'Station '+s.id:'Foundation '+f.id)+': '+item.name;
}
all('[data-station]').forEach(n=>{n.addEventListener('click',()=>select(n.dataset.station));n.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(n.dataset.station);}});});
all('[data-pick]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.pick)));
all('[data-panel]').forEach(b=>b.addEventListener('click',()=>{panel=b.dataset.panel;render();}));
document.getElementById('company').addEventListener('change',e=>{company=e.target.value;panel='compare';const match=data.stations.find(s=>s.comparisons.some(c=>c.project===company));if(company!=='all'&&match&&(!byId[current]||!byId[current].comparisons.some(c=>c.project===company))){select(match.id);}else render();});
document.getElementById('journey').addEventListener('change',e=>{journey=e.target.value;panel='flow';render();});
document.getElementById('previous').addEventListener('click',()=>select(String(Number(current)-1).padStart(2,'0')));
document.getElementById('next').addEventListener('click',()=>select(String(Number(current)+1).padStart(2,'0')));
all('[data-matrix]').forEach(b=>b.addEventListener('click',()=>{company=b.dataset.company;document.getElementById('company').value=company;panel='compare';select(b.dataset.matrix,true);}));
function size(){document.getElementById('factory-svg').style.width=zoom+'%';document.getElementById('zoom-value').textContent=zoom+'%';}
document.getElementById('zoom-in').addEventListener('click',()=>{zoom=Math.min(180,zoom+20);size();});
document.getElementById('zoom-out').addEventListener('click',()=>{zoom=Math.max(100,zoom-20);size();});
document.getElementById('zoom-fit').addEventListener('click',()=>{zoom=100;size();});
function inventory(){const q=document.getElementById('inventory-search').value.toLowerCase().trim(),mode=document.getElementById('inventory-mode').value;let count=0;all('[data-package]').forEach(r=>{r.hidden=!(r.textContent.toLowerCase().includes(q)&&(mode==='all'||r.dataset.mode===mode));if(!r.hidden)count++;});document.getElementById('inventory-count').textContent=count+' of 76 planning packages';}
document.getElementById('inventory-search').addEventListener('input',inventory);document.getElementById('inventory-mode').addEventListener('change',inventory);
document.getElementById('inventory-reset').addEventListener('click',()=>{document.getElementById('inventory-search').value='';document.getElementById('inventory-mode').value='all';inventory();});
function hash(){const id=location.hash.replace('#station-','');if(byId[id]||data.foundations.some(f=>f.id===id)){current=id;render();}}
window.addEventListener('hashchange',hash);hash();render();
