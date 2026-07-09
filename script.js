//Animation script for scrolling to the about us section

document.addEventListener('DOMContentLoaded', () => {
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
      threshold: 0.25,
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
      threshold: 0.35,
      rootMargin: '0px 0px 150px 0px'
    });

    popularObserver.observe(popularSection);
  }
});