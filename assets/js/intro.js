const scrollSection = ['main', 'target', 'nothing'];
const blog = document.getElementsByClassName('.intro');
const wrap = document.getElementsByClassName('blog')[0];
let scrollIndex = 1;

const canvas = document.getElementById('sunCanvas');
const ctx = canvas.getContext('2d');

wrap.addEventListener('wheel', (e) => {
  e.preventDefault();
  if (e.deltaY > 0) {
    if (scrollIndex === scrollSection.length - 1) {
      return;
    } else {
      scrollIndex = scrollIndex + 1;
    }
  } else if (e.deltaY < 0) {
    if (scrollIndex === 0) {
      return;
    } else {
      scrollIndex = scrollIndex - 1;
    }
  }

  const element = document.getElementById(scrollSection[scrollIndex]);
  element.scrollIntoView({ behavior: 'smooth' });
});

function drawSun() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 80);

  gradient.addColorStop(0, '#FFD700'); // Inner color (Gold)
  gradient.addColorStop(1, '#FFA500'); // Outer color (Orange)

  // Set sun color to the gradient
  ctx.fillStyle = gradient;

  // Draw the sun
  ctx.beginPath();
  ctx.arc(200, 200, 80, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
}

drawSun();
