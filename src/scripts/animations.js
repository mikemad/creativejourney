export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections except hero
  document.querySelectorAll('section:not(#hero)').forEach(section => {
    observer.observe(section);
  });

  // Observe service cards individually
  document.querySelectorAll('.group').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

// Smooth scroll for anchor links
export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
