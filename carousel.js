document.addEventListener('DOMContentLoaded', () => {
    const track   = document.querySelector('.carousel');
    const slides  = Array.from(track.children);
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let idx = 0;
    let timer = setInterval(goNext, 5000);
  
    function update() {
      track.style.transform = `translateX(-${idx * 100}%)`;
    }
    function goNext() {
      idx = (idx + 1) % slides.length;
      update();
    }
    function goPrev() {
      idx = (idx - 1 + slides.length) % slides.length;
      update();
    }
  
    nextBtn.addEventListener('click', () => {
      clearInterval(timer);
      goNext();
      timer = setInterval(goNext, 5000);
    });
    prevBtn.addEventListener('click', () => {
      clearInterval(timer);
      goPrev();
      timer = setInterval(goNext, 5000);
    });
  
    // Optional: swipe support
    let startX = null;
    track.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    track.addEventListener('touchend', e => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 50) goPrev();
      if (dx < -50) goNext();
      startX = null;
    });
  });