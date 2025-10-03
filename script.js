document.addEventListener('DOMContentLoaded', function() {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const dotsContainer = document.querySelector('.dots');
  let current = 0;
  const intervalMs = 4500;
  let timer;

  if (!slides.length) return;

  // create dots dynamically based on slides
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goto(i));
    dotsContainer.appendChild(dot);
  });

  function setActive(idx) {
    slides.forEach(s => s.classList.remove('active'));
    slides[idx].classList.add('active');
    Array.from(dotsContainer.children).forEach(d => d.classList.remove('active'));
    dotsContainer.children[idx].classList.add('active');
  }

  function goto(idx) {
    clearInterval(timer);
    current = idx;
    setActive(current);
    timer = setInterval(nextSlide, intervalMs);
  }

  function nextSlide() { current = (current + 1) % slides.length; setActive(current); }
  function prevSlide() { current = (current - 1 + slides.length) % slides.length; setActive(current); }

  nextBtn.addEventListener('click', () => { clearInterval(timer); nextSlide(); timer = setInterval(nextSlide, intervalMs); });
  prevBtn.addEventListener('click', () => { clearInterval(timer); prevSlide(); timer = setInterval(nextSlide, intervalMs); });

  // pause on hover
  const slider = document.getElementById('heroSlider');
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', () => timer = setInterval(nextSlide, intervalMs));

  // start autoplay
  timer = setInterval(nextSlide, intervalMs);
});
