// Comparsa morbida delle sezioni
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Lightbox galleria
const tiles = [...document.querySelectorAll('.tile')];
const lb = document.querySelector('.lightbox');
if (lb && tiles.length) {
  const stage = lb.querySelector('.stage');
  let current = 0;
  const show = (i) => {
    current = (i + tiles.length) % tiles.length;
    stage.innerHTML = tiles[current].innerHTML;
  };
  tiles.forEach((t, i) => t.addEventListener('click', () => { show(i); lb.classList.add('open'); }));
  const close = () => lb.classList.remove('open');
  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.querySelector('.lb-prev').addEventListener('click', (e) => { e.stopPropagation(); show(current - 1); });
  lb.querySelector('.lb-next').addEventListener('click', (e) => { e.stopPropagation(); show(current + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}
