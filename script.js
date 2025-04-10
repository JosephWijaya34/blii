let progress = 0;
let startX = 0;
let active = 0;
let isDown = false;

const speedWheel = 0.02;
const speedDrag = -0.1;

const $items = document.querySelectorAll('.carousel-item');
const guideSection = document.getElementById("guideBook");

const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty('--zIndex', zIndex);
  item.style.setProperty('--active', (index - active) / $items.length);
};

// const animate = () => {
//   progress = Math.max(0, Math.min(progress, 100));
//   active = Math.floor((progress / 100) * ($items.length - 1));
//   $items.forEach((item, index) => displayItems(item, index, active));

//   if (active === $items.length - 1) {
//     document.body.classList.remove("no-scroll");
//     setTimeout(() => {
//       guideSection.scrollIntoView({ behavior: "smooth" });
//     }, 600);
//   } else {
//     document.body.classList.add("no-scroll");
//   }
// };
const navButtons = document.querySelector('.nav-buttons');

const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));
  $items.forEach((item, index) => displayItems(item, index, active));

  if (active === $items.length - 1) {
    // Hide nav buttons di slide 10
    navButtons.style.display = 'none';
    document.body.classList.remove("no-scroll");
  } else {
    navButtons.style.display = 'flex';
    document.body.classList.add("no-scroll");
  }
};

animate();

$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i / $items.length) * 100;
    animate();
  });
});

document.addEventListener('mousewheel', (e) => {
  progress += e.deltaY * speedWheel;
  animate();
});

document.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.clientX;
});

document.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  const x = e.clientX;
  progress += (x - startX) * speedDrag;
  startX = x;
  animate();
});

document.addEventListener('mouseup', () => isDown = false);

document.getElementById('nextBtn').addEventListener('click', () => {
  progress += 100 / ($items.length - 1);
  animate();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  progress -= 100 / ($items.length - 1);
  animate();
});

function goToGuide() {
  document.getElementById("guideBook").scrollIntoView({ behavior: "smooth" });
}
