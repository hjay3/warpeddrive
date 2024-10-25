const cityContainer = document.getElementById('city-container');
const buildingsContainer = document.getElementById('buildings');
const carsContainer = document.getElementById('cars');
const streetLightsContainer = document.getElementById('street-lights');
const weatherEffects = document.getElementById('weather-effects');
let isNight = false;
let isRaining = false;

function createBuildings(count) {
  for (let i = 0; i < count; i++) {
    const building = document.createElement('div');
    building.classList.add('building');
    const height = 100 + Math.random() * 300;
    const width = 50 + Math.random() * 100;
    building.style.height = `${height}px`;
    building.style.width = `${width}px`;
    building.style.left = `${i * (width + 20)}px`;
    building.style.zIndex = Math.floor(height);

    // Add windows
    const windowCount = Math.floor((height / 20) * (width / 20));
    for (let j = 0; j < windowCount; j++) {
      const windowEl = document.createElement('div');
      windowEl.classList.add('window');
      windowEl.style.left = `${Math.random() * (width - 10)}px`;
      windowEl.style.bottom = `${Math.random() * (height - 10)}px`;
      building.appendChild(windowEl);
    }

    buildingsContainer.appendChild(building);
  }
}

function createCars(count) {
  for (let i = 0; i < count; i++) {
    const car = document.createElement('div');
    car.classList.add('car');
    car.style.left = `${-100 + i * 200}px`;
    carsContainer.appendChild(car);
  }
}

function createStreetLights(count) {
  for (let i = 0; i < count; i++) {
    const light = document.createElement('div');
    light.classList.add('street-light');
    light.style.left = `${i * 200}px`;
    const bulb = document.createElement('div');
    bulb.classList.add('light');
    light.appendChild(bulb);
    streetLightsContainer.appendChild(light);
  }
}

function animateCity() {
  // Animate buildings
  anime({
    targets: '.building',
    scaleY: [
      { value: 0.9, duration: 1500 },
      { value: 1, duration: 1500 },
    ],
    easing: 'easeInOutQuad',
    loop: true,
  });

  // Animate cars
  anime({
    targets: '.car',
    translateX: '100%',
    duration: 5000,
    loop: true,
    easing: 'linear',
  });

  // Animate street lights
  anime({
    targets: '.light',
    opacity: [0.5, 1],
    scale: [1, 1.2],
    duration: 1000,
    loop: true,
    direction: 'alternate',
    easing: 'easeInOutQuad',
  });
}

function toggleDayNight() {
  isNight = !isNight;
  if (isNight) {
    document.getElementById('background').style.background =
      'linear-gradient(to bottom, #191970 0%, #000033 100%)';
    document.querySelectorAll('.window').forEach((window) => {
      window.style.backgroundColor = Math.random() > 0.3 ? '#FFD700' : '#555';
    });
    document.querySelectorAll('.light').forEach((light) => {
      light.style.boxShadow = '0 0 20px 10px rgba(255, 255, 0, 0.7)';
    });
  } else {
    document.getElementById('background').style.background =
      'linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 100%)';
    document.querySelectorAll('.window').forEach((window) => {
      window.style.backgroundColor = '#FFD700';
    });
    document.querySelectorAll('.light').forEach((light) => {
      light.style.boxShadow = '0 0 10px 5px rgba(255, 255, 0, 0.5)';
    });
  }
}

function createRaindrop() {
  const raindrop = document.createElement('div');
  raindrop.classList.add('raindrop');
  raindrop.style.left = `${Math.random() * 100}%`;
  raindrop.style.top = '-20px';
  weatherEffects.appendChild(raindrop);

  anime({
    targets: raindrop,
    translateY: '120%',
    opacity: 0,
    duration: 1000,
    easing: 'linear',
    complete: function () {
      weatherEffects.removeChild(raindrop);
      if (isRaining) createRaindrop();
    },
  });
}

function toggleWeather() {
  isRaining = !isRaining;
  if (isRaining) {
    for (let i = 0; i < 100; i++) {
      setTimeout(createRaindrop, i * 20);
    }
  } else {
    weatherEffects.innerHTML = '';
  }
}

// Initialize the city
createBuildings(10);
createCars(5);
createStreetLights(5);
animateCity();

// Event listeners for UI buttons
document
  .getElementById('day-night-toggle')
  .addEventListener('click', toggleDayNight);
document
  .getElementById('weather-toggle')
  .addEventListener('click', toggleWeather);

// Add parallax effect
cityContainer.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
  cityContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
