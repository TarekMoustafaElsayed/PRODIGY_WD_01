

const reviews = [
  { avatar: 'assets/user-1.JPG', text: '"This sushi restaurant is legendary. 3a4 ya chef dababa!"', pos: '50% 50%' },
  { avatar: 'assets/user-2.jpeg', text: '"The chef is so goofy, he serves the juiciest sushi ever!"', pos: '62% 50%' },
  { avatar: 'assets/user-3.jpg', text: '"The sushi here is to die for 😋 I wanna eat here forever and ever!"', pos: '50% 38%' },
  { avatar: 'assets/user-4.jpeg', text: '"ここのスタッフ、みんなすごく親切でいい人たちだね ya man"', pos: '50% 18%' },
  { avatar: 'assets/user-5.jpg', text: '"cosplayers assemble! Kazama\'s sushi did it once again"', pos: '5% 50%' },
];

history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

const audio = new Audio('assets/The Disaster of Passion (May Theme) - Guilty Gear Strive OST.mp3');
audio.loop = true;

function toggleMusic() {
  if (audio.paused) {
    audio.currentTime = 0;
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.shiftKey && (e.key === 'o' || e.key === 'O')) {
    e.preventDefault();
    toggleMusic();
  }
});

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

          const catalogue = document.querySelector('.popular-foods__catalogue');
          const allCards = [...catalogue.querySelectorAll('.popular-foods__card')];
          const order = Array.from({length: 7}, (_, i) => i);

          setTimeout(function rotate() {
            const [l, c, r, n] = order.slice(0, 4);

            [allCards[l], allCards[c], allCards[r]].forEach(el => {
              el.style.animation = 'swipeRightOut 0.5s cubic-bezier(0.0, 0.0, 0.2, 1) forwards';
              el.classList.add('swipe-out');
            });

            setTimeout(() => {
              [allCards[l], allCards[c], allCards[r], allCards[n]].forEach(el => {
                el.style.animation = 'none';
                el.style.transform = '';
                el.style.opacity = '';
                el.classList.remove('active-card', 'swipe-out', 'swipe-in', 'hidden-card');
              });

              const first4 = order.splice(0, 4);
              order.unshift(first4[3], first4[0], first4[1]);
              order.push(first4[2]);

              allCards.forEach(el => { el.style.display = 'none'; });
              [order[0], order[1], order[2]].forEach(i => {
                allCards[i].style.display = '';
                allCards[i].style.transform = 'translateX(-300px) rotate(-6deg) scale(0.85)';
                allCards[i].style.opacity = '0';
                allCards[i].classList.remove('hidden-card');
              });
              void allCards[order[0]].offsetWidth;

              [order[0], order[1], order[2]].forEach(i => {
                allCards[i].style.animation = 'swipeRightIn 0.5s cubic-bezier(0.0, 0.0, 0.2, 1) forwards';
              });
              allCards[order[1]].classList.add('active-card');

              catalogue.replaceChildren(allCards[order[0]], allCards[order[1]], allCards[order[2]],
                ...allCards.filter((_, i) => ![order[0], order[1], order[2]].includes(i)));

              setTimeout(() => {
                [order[0], order[1], order[2]].forEach(i => {
                  allCards[i].style.animation = 'none';
                  allCards[i].style.transform = '';
                  allCards[i].style.opacity = '1';
                });
                setTimeout(rotate, 4000);
              }, 500);
            }, 500);
          }, 4000);
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