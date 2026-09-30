document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');
    const experience = document.querySelector('#experience');
    let countersStarted = false;

    function animateCounters() {
      if (countersStarted) return;
      countersStarted = true;

      counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        const duration = 1100;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);

          counter.textContent = Math.floor(target * eased);

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            counter.textContent = target;
          }
        }

        requestAnimationFrame(tick);
      });
    }

    if (experience && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            animateCounters();
            observer.disconnect();
          }
        },
        { threshold: 0.25 }
      );

      observer.observe(experience);
    } else {
      animateCounters();
    }

    const carousel = document.querySelector('#worksCarousel');
    const track = carousel
      ? carousel.querySelector('.works-track')
      : null;

    const slides = track
      ? Array.from(track.querySelectorAll('.work-slide'))
      : [];

    const dots = document.querySelector('#worksDots');
    const prev = document.querySelector('#worksPrev');
    const next = document.querySelector('#worksNext');

    let current = 0;
    let timer;

    if (track && slides.length) {

      slides.forEach((_, index) => {
        const dot = document.createElement('button');

        dot.type = 'button';
        dot.className =
          'carousel-dot' + (index === 0 ? ' active' : '');

        dot.setAttribute(
          'aria-label',
          'Показать работу ' + (index + 1)
        );

        dot.addEventListener('click', () => {
          goTo(index);
          restartAutoPlay();
        });

        dots.appendChild(dot);
      });

      function goTo(index) {
        current =
          (index + slides.length) % slides.length;

        track.style.transform =
          'translateX(-' + (current * 100) + '%)';

        dots
          .querySelectorAll('.carousel-dot')
          .forEach((dot, i) => {
            dot.classList.toggle(
              'active',
              i === current
            );
          });
      }

      function restartAutoPlay() {
        clearInterval(timer);

        timer = setInterval(() => {
          goTo(current + 1);
        }, 5000);
      }

      prev.addEventListener('click', () => {
        goTo(current - 1);
        restartAutoPlay();
      });

      next.addEventListener('click', () => {
        goTo(current + 1);
        restartAutoPlay();
      });

      carousel.addEventListener(
        'mouseenter',
        () => clearInterval(timer)
      );

      carousel.addEventListener(
        'mouseleave',
        restartAutoPlay
      );

      carousel.addEventListener(
        'touchstart',
        () => clearInterval(timer),
        { passive: true }
      );

      carousel.addEventListener(
        'touchend',
        restartAutoPlay,
        { passive: true }
      );

      restartAutoPlay();
    }
});
