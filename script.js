// Create stars
function createStars(count) {
  const starsContainer = document.getElementById('stars');
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.width = `${Math.random() * 3}px`;
    star.style.height = star.style.width;
    starsContainer.appendChild(star);
  }
}

// Create planets
function createPlanets(count) {
  const planetsContainer = document.getElementById('planets');
  const colors = [
    '#ff4136',
    '#ff851b',
    '#ffdc00',
    '#2ecc40',
    '#0074d9',
    '#b10dc9',
  ];
  for (let i = 0; i < count; i++) {
    const planet = document.createElement('div');
    planet.classList.add('planet');
    planet.style.left = `${Math.random() * 100}%`;
    planet.style.top = `${Math.random() * 100}%`;
    const size = 20 + Math.random() * 60;
    planet.style.width = `${size}px`;
    planet.style.height = `${size}px`;
    planet.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    planetsContainer.appendChild(planet);
  }
}

// Create asteroids
function createAsteroids(count) {
  const asteroidField = document.getElementById('asteroid-field');
  for (let i = 0; i < count; i++) {
    const asteroid = document.createElement('div');
    asteroid.classList.add('asteroid');
    asteroid.style.left = `${Math.random() * 100}%`;
    asteroid.style.top = `${Math.random() * 100}%`;
    const size = 5 + Math.random() * 15;
    asteroid.style.width = `${size}px`;
    asteroid.style.height = `${size}px`;
    asteroidField.appendChild(asteroid);
  }
}

// Initialize the space scene
createStars(200);
createPlanets(5);
createAsteroids(50);

// Animate stars
function animateStars() {
  anime({
    targets: '.star',
    opacity: [
      { value: 0, duration: 0 },
      { value: 1, duration: 1000 },
      { value: 0, duration: 1000 },
    ],
    scale: [
      { value: 1, duration: 0 },
      { value: 1.5, duration: 1000 },
      { value: 1, duration: 1000 },
    ],
    easing: 'easeInOutQuad',
    delay: anime.stagger(200, { grid: [20, 10], from: 'center' }),
    loop: true,
  });
}

// Animate planets
function animatePlanets() {
  anime({
    targets: '.planet',
    translateX: function () {
      return anime.random(-200, 200);
    },
    translateY: function () {
      return anime.random(-200, 200);
    },
    scale: function () {
      return anime.random(0.8, 1.2);
    },
    rotate: function () {
      return anime.random(-360, 360);
    },
    duration: function () {
      return anime.random(5000, 10000);
    },
    easing: 'easeInOutQuad',
    loop: true,
  });
}

// Animate asteroids
function animateAsteroids() {
  anime({
    targets: '.asteroid',
    translateX: function () {
      return anime.random(-300, 300);
    },
    translateY: function () {
      return anime.random(-300, 300);
    },
    rotate: function () {
      return anime.random(-720, 720);
    },
    duration: function () {
      return anime.random(3000, 8000);
    },
    easing: 'easeInOutQuad',
    loop: true,
  });
}

// Animate spaceship
function animateSpaceship() {
  anime({
    targets: '#spaceship',
    translateY: [-20, 20],
    rotate: [-5, 5],
    duration: 3000,
    easing: 'easeInOutQuad',
    loop: true,
    direction: 'alternate',
  });
}

// Animate black hole
function animateBlackHole() {
  anime({
    targets: '#black-hole',
    scale: [1, 1.2],
    rotate: 360,
    duration: 10000,
    easing: 'linear',
    loop: true,
  });
}

// Start animations
animateStars();
animatePlanets();
animateAsteroids();
animateSpaceship();
animateBlackHole();

// Warp drive effect
document.getElementById('warp-button').addEventListener('click', function () {
  anime({
    targets: '.star, .planet, .asteroid',
    translateX: function (el) {
      return el.getBoundingClientRect().left < window.innerWidth / 2
        ? -1000
        : 1000;
    },
    translateY: function (el) {
      return el.getBoundingClientRect().top < window.innerHeight / 2
        ? -1000
        : 1000;
    },
    scale: 0,
    duration: 2000,
    easing: 'easeInQuad',
  });

  anime({
    targets: '#black-hole',
    scale: 10,
    opacity: 0,
    duration: 2000,
    easing: 'easeInQuad',
  });

  anime({
    targets: '#spaceship',
    translateY: '-50%',
    translateX: ['-50%', '150%'],
    rotate: 720,
    duration: 2000,
    easing: 'easeInQuad',
    complete: function () {
      setTimeout(resetScene, 1000);
    },
  });
});

// Reset the scene after warp
function resetScene() {
  document.getElementById('stars').innerHTML = '';
  document.getElementById('planets').innerHTML = '';
  document.getElementById('asteroid-field').innerHTML = '';

  createStars(200);
  createPlanets(5);
  createAsteroids(50);

  anime.set('#black-hole', { scale: 1, opacity: 1 });
  anime.set('#spaceship', { translateX: '-50%', translateY: 0, rotate: 0 });

  animateStars();
  animatePlanets();
  animateAsteroids();
  animateSpaceship();
  animateBlackHole();
}
