let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;

const speedWheel = 0.02;
const speedDrag = -0.1;

const $items = document.querySelectorAll('.carousel-item');
const $clickSound = document.getElementById('clickSound');

const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty('--zIndex', zIndex);
  item.style.setProperty('--active', (index - active) / $items.length);
};

const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));
  $items.forEach((item, index) => displayItems(item, index, active));
};

const playSound = () => {
  $clickSound.currentTime = 0;
  $clickSound.play();
};

// Initial setup
animate();

// Klik item langsung lompat
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
    playSound();
  });
});

// Scroll pakai mouse
document.addEventListener('mousewheel', (e) => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
  playSound();
});

// Drag horizontal
document.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
  playSound();
});

document.addEventListener('mouseup', () => {
  isDown = false;
});

// Tombol next & prev
document.getElementById('nextBtn').addEventListener('click', () => {
  progress += 100 / ($items.length - 1);
  animate();
  playSound();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  progress -= 100 / ($items.length - 1);
  animate();
  playSound();
});
