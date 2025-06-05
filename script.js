
const countdown = document.getElementById("countdown");
const birthday = new Date("2025-06-10T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = birthday - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdown.innerHTML = `Sürpriz için kalan süre: ${days}g ${hours}s ${minutes}d ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
