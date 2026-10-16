/* Browser-only reference interactions. No business actions or connected accounts. */
(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const entries = $$('.component');
  const search = $('#component-search');
  const layer = $('#layer-filter');
  const status = $('#status-filter');
  $('#section-jump')?.addEventListener('change', e => { location.hash = e.target.value; });
  function filter() {
    if (!search) return;
    const term = search.value.trim().toLocaleLowerCase();
    let count = 0;
    for (const el of entries) {
      const searchable = `${el.textContent} ${el.dataset.searchTerms || ''}`.toLocaleLowerCase();
      const shown = (!term || searchable.includes(term)) && (layer.value === 'all' || layer.value === el.dataset.layer) && (status.value === 'all' || status.value === el.dataset.status);
      el.hidden = !shown;
      if (shown) count++;
    }
    $('#result-count').textContent = `${count} of ${entries.length} components`;
    $('#no-results').hidden = count > 0;
  }
  function reset() {
    if (!search) return;
    search.value = ''; layer.value = 'all'; status.value = 'all'; filter();
  }
  search?.addEventListener('input', filter);
  layer?.addEventListener('change', filter);
  status?.addEventListener('change', filter);
  $('#reset-filters')?.addEventListener('click', reset);
  function openHash() {
    let hash;
    try { hash = decodeURIComponent(location.hash.slice(1)); }
    catch { return; }
    if (!hash.startsWith('component-')) return;
    const target = document.getElementById(hash);
    if (!target) return;
    reset(); target.open = true;
    requestAnimationFrame(() => target.scrollIntoView({block:'start',behavior:'instant'}));
  }
  addEventListener('hashchange', openHash);
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#component-"]');
    if (a && a.hash === location.hash) openHash();
  });
  openHash();
  function wireTabs(selector, select) {
    const tabs = $$(selector);
    tabs.forEach((tab, i) => {
      const activate = () => {
        tabs.forEach(t => { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; });
        select(tab);
      };
      tab.addEventListener('click', activate);
      tab.addEventListener('keydown', e => {
        let next;
        if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = tabs.length - 1;
        if (next !== undefined) {e.preventDefault(); tabs[next].click(); tabs[next].focus();}
      });
    });
  }
  wireTabs('[data-flow]', tab => $$('.workflow').forEach(p => p.hidden = p.id !== `flow-${tab.dataset.flow}`));
  wireTabs('[data-format]', tab => {
    const isJSON = tab.dataset.format === 'json';
    $('#ai-text').hidden = isJSON; $('#ai-json').hidden = !isJSON;
    $('#download-ai').href = isJSON ? 'architecture.json' : 'reference.md';
    $('#ai-copy-status').textContent = '';
  });
  async function copy(text, feedback) {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(text);
      feedback.textContent = 'Copied the complete reference, including evidence and limitations.';
    } catch {
      feedback.textContent = 'Clipboard access is unavailable. Use Download, or select and copy the text in the AI reader.';
    }
  }
  $('#copy-reference')?.addEventListener('click', async () => {
    const feedback = $('#copy-status'); feedback.textContent = 'Loading the complete reference…';
    try { await copy(JSON.parse($('#reference-data').textContent), feedback); }
    catch { feedback.textContent = 'Could not load the file. Open the AI reader or use the download link.'; }
  });
  $('#copy-ai')?.addEventListener('click', () => copy($('#ai-text').hidden ? $('#ai-json').textContent : $('#ai-text').textContent, $('#ai-copy-status')));
  let printState = [];
  addEventListener('beforeprint', () => {
    printState = $$('details').map(el => [el,el.open]);
    $$('details').forEach(el => el.open = true);
  });
  addEventListener('afterprint', () => printState.forEach(([el,open]) => el.open = open));
  $('#print-page')?.addEventListener('click', () => window.print());
  const sections = $$('main>section');
  if (sections.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(items => {
      items.forEach(item => {
        if (item.isIntersecting) $$('.sidebar nav a').forEach(a => {
          const current = a.hash === `#${item.target.id}`;
          a.classList.toggle('active',current);
          if(current) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current');
        });
      });
    },{rootMargin:'-15% 0px -70% 0px',threshold:0});
    sections.forEach(s => observer.observe(s));
  }
})();
