document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('galleryBento');
  const sentry = document.getElementById('loadingSentry');
  if (!container || !sentry || typeof galleryData === 'undefined') return;

  const chunkSize = 16;
  let currentIndex = 0;

  const loadChunk = () => {
    const chunk = galleryData.slice(currentIndex, currentIndex + chunkSize);
    if (chunk.length === 0) {
      sentry.style.display = 'none'; // nothing more to load
      return;
    }

    const fragment = document.createDocumentFragment();
    chunk.forEach(item => {
      const gCell = document.createElement('div');
      gCell.className = 'g-cell';
      gCell.dataset.cat = item.cat;
      
      const img = document.createElement('img');
      img.src = item.src;
      img.loading = 'lazy';
      
      const label = document.createElement('span');
      label.className = 'g-label';
      label.textContent = item.cat;
      
      gCell.appendChild(img);
      gCell.appendChild(label);
      fragment.appendChild(gCell);
    });

    container.appendChild(fragment);
    currentIndex += chunkSize;

    if (currentIndex >= galleryData.length) {
      sentry.innerHTML = 'All shots loaded.';
      sentry.style.opacity = 0.5;
      sentryObserver.disconnect();
    }
  };

  const sentryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // tiny timeout to prevent main thread blocking jitter
        setTimeout(loadChunk, 200); 
      }
    });
  }, { rootMargin: '0px 0px 600px 0px' });

  // Load first chunk instantly
  loadChunk();
  sentryObserver.observe(sentry);
});
