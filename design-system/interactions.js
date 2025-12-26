// Vaplux micro-interactions: tilt/parallax for product cards and clickPop for CTAs
(function(){
  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    const img = card.querySelector('.product-image');
    const maxTilt = 3; // degrees
    const maxTranslate = 6; // px parallax for image

    function onMove(e){
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) - 0.5; // -0.5 .. 0.5
      const py = (y / rect.height) - 0.5;
      const rotY = px * (maxTilt * 2); // left-right
      const rotX = -py * (maxTilt * 2); // up-down
      card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      if(img){
        img.style.transform = `translate(${px * maxTranslate}px, ${py * maxTranslate}px)`;
      }
    }

    function onLeave(){
      card.style.transform = '';
      if(img){ img.style.transform = ''; }
    }

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
  });

  // Click pop feedback for add-to-cart buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn, .btn-cta.primary');
    if(!btn) return;
    btn.classList.add('click-pop');
    setTimeout(() => btn.classList.remove('click-pop'), 180);
  });
})();
