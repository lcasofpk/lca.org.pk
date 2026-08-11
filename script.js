// ---------- PDF / Document Search ----------
function initDocSearch(){
  const input = document.getElementById('doc-search');
  const results = document.getElementById('doc-results');
  const countEl = document.getElementById('doc-count');
  if(!input || !results) return;

  function render(list){
    results.innerHTML = '';
    if(list.length === 0){
      results.innerHTML = '<p style="color:#888;padding:20px;">No documents match your search.</p>';
    }
    list.forEach(doc => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h4>${doc.title}</h4><p>${doc.category} &middot; ${doc.region}</p><a class="download-btn" href="${doc.url}" target="_blank" rel="noopener">Open Document</a>`;
      results.appendChild(card);
    });
    if(countEl) countEl.textContent = list.length + (list.length === 1 ? ' document' : ' documents');
  }

  render(ADLG_DOCUMENTS);

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const filtered = ADLG_DOCUMENTS.filter(doc =>
      doc.title.toLowerCase().includes(q) ||
      doc.category.toLowerCase().includes(q) ||
      doc.region.toLowerCase().includes(q)
    );
    render(filtered);
  });
}

// ---------- Video Grid + Modal Player ----------
function initVideoGrid(){
  const grid = document.getElementById('video-grid');
  if(!grid) return;

  ADLG_VIDEOS.forEach(v => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <div class="video-thumb-wrap">
        <img src="https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg" alt="${v.title}" onerror="this.onerror=null;this.parentElement.classList.add('thumb-fallback');this.style.display='none';">
        <div class="play-overlay">▶</div>
      </div>
      <div class="video-title">${v.title}</div>`;
    card.addEventListener('click', () => openVideoModal(v.youtubeId, v.title));
    grid.appendChild(card);
  });
}

function openVideoModal(id, title){
  const overlay = document.createElement('div');
  overlay.className = 'video-modal-overlay';
  overlay.innerHTML = `
    <div class="video-modal">
      <button class="video-modal-close" aria-label="Close">&times;</button>
      <div class="video-modal-frame">
        <iframe src="https://www.youtube.com/embed/${id}?autoplay=1" title="${title}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => {
    if(e.target === overlay || e.target.classList.contains('video-modal-close')){
      overlay.remove();
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initDocSearch();
  initVideoGrid();
});
