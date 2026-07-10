

const reviews = [
  { avatar: 'assets/user-1.JPG', text: '"This sushi restaurant is legendary. 3a4 ya chef dababa!"', pos: '50% 50%' },
  { avatar: 'assets/user-2.jpeg', text: '"The chef is so goofy, he serves the juiciest sushi ever!"', pos: '62% 50%' },
  { avatar: 'assets/user-3.jpeg', text: '"ここのスタッフ、みんなすごく親切でいい人たちだね ya man"', pos: '50% 18%' },
  { avatar: 'assets/user-4.jpg', text: '"cosplayers assemble! Kazama\'s sushi did it yet again"', pos: '5% 50%' },
];

history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  const avatar = document.getElementById('review-avatar');
  const text = document.getElementById('review-text');
  const reviewContainer = document.querySelector('.hero-content__review');
  let currentIdx = 0;

  function swapReview() {
    if (!avatar || !text || !reviewContainer) return;

    reviewContainer.classList.remove('swiping-in');
    reviewContainer.classList.add('swiping');

    setTimeout(() => {
      currentIdx = (currentIdx + 1) % reviews.length;
      avatar.src = reviews[currentIdx].avatar;
      avatar.style.objectPosition = reviews[currentIdx].pos;
      text.textContent = reviews[currentIdx].text;

      reviewContainer.classList.remove('swiping');
      reviewContainer.classList.add('swiping-in');

      setTimeout(() => {
        reviewContainer.classList.remove('swiping-in');
      }, 400);
    }, 400);
  }

  setInterval(swapReview, 5000);

  const aboutSection = document.querySelector('.about-us');
  const popularSection = document.querySelector('.popular-foods');

  if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.30,
      rootMargin: '0px 0px 100px 0px'
    });

    aboutObserver.observe(aboutSection);
  }

  if (popularSection) {
    const popularObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          popularSection.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.40,
      rootMargin: '0px 0px 150px 0px'
    });

    popularObserver.observe(popularSection);
  }

  const trendingSection = document.querySelector('.trending');
  if (trendingSection) {
    const trendingObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trendingSection.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: '0px 0px 100px 0px'
    });

    trendingObserver.observe(trendingSection);
  }

  const subscriptionSection = document.querySelector('.subscription');
  if (subscriptionSection) {
    const subObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          subscriptionSection.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.30,
      rootMargin: '0px 0px 100px 0px'
    });
    subObserver.observe(subscriptionSection);
  }

  const footerSection = document.querySelector('.footer');
  if (footerSection) {
    const footerObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footerSection.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.30,
      rootMargin: '0px 0px 100px 0px'
    });
    footerObserver.observe(footerSection);
  }

  const tensEl = document.getElementById('counter-tens');
  const unitsEl = document.getElementById('counter-units');
  if (tensEl && unitsEl) {
    let current = 46;
    let direction = 'up';

    function getDigits(num) {
      return { tens: Math.floor(num / 10), units: num % 10 };
    }

    function animateDigit(el, className) {
      el.classList.remove('animate-fade-up', 'animate-fade-down');
      void el.offsetWidth;
      el.classList.add(className);
    }

    function updateCounter() {
      const prev = getDigits(current);
      if (direction === 'up') {
        current++;
        if (current === 50) direction = 'down';
      } else {
        current--;
        if (current === 46) direction = 'up';
      }
      const next = getDigits(current);

      if (prev.tens !== next.tens) {
        tensEl.textContent = String(next.tens);
        unitsEl.textContent = String(next.units);
        animateDigit(tensEl, direction === 'up' ? 'animate-fade-up' : 'animate-fade-down');
        animateDigit(unitsEl, direction === 'up' ? 'animate-fade-up' : 'animate-fade-down');
      } else {
        unitsEl.textContent = String(next.units);
        animateDigit(unitsEl, direction === 'up' ? 'animate-fade-up' : 'animate-fade-down');
      }
    }

    setInterval(updateCounter, 5000);
  }
});