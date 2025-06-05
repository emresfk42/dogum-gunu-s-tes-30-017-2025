
const countdown = document.getElementById('countdown');
const birthday = new Date("June 10, 2025 00:00:00").getTime();
let fireworksStarted = false;

const xmasCountdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = birthday - now;

  if (distance <= 0) {
    clearInterval(xmasCountdown);
    countdown.innerHTML = "İyi ki Doğdun Aşkımmm! 🎉";
    startFireworks();
  } else {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdown.innerHTML = `${days}g ${hours}s ${minutes}d ${seconds}s kaldı!`;
  }
}, 1000);

const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

let particles = [];

function createParticle(x, y) {
  const colors = ["#ff69b4", "#ffc0cb", "#ffff66", "#ffffff"];
  return {
    x,
    y,
    radius: random(2, 4),
    color: colors[Math.floor(Math.random() * colors.length)],
    speedX: random(-3, 3),
    speedY: random(-4, -1),
    alpha: 1
  };
}

function fireworkBurst() {
  const x = random(100, canvas.width - 100);
  const y = random(100, canvas.height / 2);
  for (let i = 0; i < 50; i++) {
    particles.push(createParticle(x, y));
  }
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, index) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.alpha -= 0.01;
    if (p.alpha <= 0) {
      particles.splice(index, 1);
    } else {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  });
  ctx.globalAlpha = 1;
  if (fireworksStarted) {
    if (Math.random() < 0.05) fireworkBurst();
    requestAnimationFrame(animateFireworks);
  }
}

function startFireworks() {
  fireworksStarted = true;
  animateFireworks();
}

for (let i = 0; i < 15; i++) {
  const balloon = document.createElement('div');
  balloon.style.position = 'absolute';
  balloon.style.left = Math.random() * 100 + 'vw';
  balloon.style.bottom = '-100px';
  balloon.style.width = '30px';
  balloon.style.height = '40px';
  balloon.style.background = '#ff66cc';
  balloon.style.borderRadius = '50% 50% 50% 50%';
  balloon.style.animation = `float ${5 + Math.random() * 5}s ease-in infinite`;
  balloon.style.zIndex = '0';
  document.body.appendChild(balloon);
}
