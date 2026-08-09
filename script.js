// ===============================
// JACKY & YIING WEDDING INVITATION
// Edit the settings below if needed.
// ===============================
const WEDDING_DATE = "2026-10-25T10:00:00+08:00";
const VENUE = "14/15 Jalan Jambu Melaka 2, Jinjang Selatan, Kuala Lumpur";

// Add the couple's WhatsApp number here, e.g. "60123456789"
// Leave blank if you want the RSVP buttons disabled.
const WHATSAPP_NUMBER = "+6014-6449336";

const loading = document.getElementById("loading");
window.addEventListener("load", () => {
  setTimeout(() => loading.classList.add("hide"), 650);
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Countdown
function updateCountdown() {
  const target = new Date(WEDDING_DATE).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / 86400);
  const hours = Math.floor((sec % 86400) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Maps / Waze
const encodedVenue = encodeURIComponent(VENUE);
document.getElementById("mapsBtn").href =
  `https://www.google.com/maps/search/?api=1&query=${encodedVenue}`;
document.getElementById("wazeBtn").href =
  `https://www.waze.com/ul?q=${encodedVenue}&navigate=yes`;

// RSVP
function sendRSVP(attending) {
  const name = document.getElementById("guestName").value.trim();
  const count = document.getElementById("guestCount").value;
  if (!name) {
    document.getElementById("guestName").focus();
    alert("请先输入您的姓名。");
    return;
  }
  if (!WHATSAPP_NUMBER) {
    alert("+6014-6449336");
    return;
  }
  const status = attending ? "会出席" : "无法出席";
  const text = `Jacky & Yiing Wedding RSVP%0A%0A姓名：${encodeURIComponent(name)}%0A人数：${count} 位%0A回复：${encodeURIComponent(status)}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
}
document.getElementById("attendBtn").addEventListener("click", () => sendRSVP(true));
document.getElementById("declineBtn").addEventListener("click", () => sendRSVP(false));

// ===============================
// Music
// ===============================

const musicBtn = document.getElementById("musicBtn");

let audio = null;
let musicReady = false;
let musicStarted = false;

// 检查 music.mp3 是否存在
fetch("music.mp3", { method: "HEAD" })
  .then(response => {
    if (response.ok) {
      audio = new Audio("music.mp3");
      audio.loop = true;
      audio.preload = "auto";
      musicReady = true;
    }
  })
  .catch(() => {});


// 播放音乐
async function playMusic() {
  if (!musicReady || !audio) return;

  try {
    await audio.play();

    musicStarted = true;
    musicBtn.innerHTML = "<span>Ⅱ</span>";
    musicBtn.classList.add("playing");

  } catch (error) {
    console.log("Music playback was blocked.");
  }
}


// 暂停音乐
function pauseMusic() {
  if (!audio) return;

  audio.pause();

  musicBtn.innerHTML = "<span>♪</span>";
  musicBtn.classList.remove("playing");
}


// 点击音乐按钮：播放 / 暂停
musicBtn.addEventListener("click", async (event) => {

  event.stopPropagation();

  if (!musicReady) {
    alert("请将 music.mp3 放在网站文件夹内。");
    return;
  }

  if (audio.paused) {
    await playMusic();
  } else {
    pauseMusic();
  }
});


// ===============================
// Scroll to Open → 自动播放音乐
// ===============================

let openTriggered = false;

function startMusicWhenOpen() {

  if (openTriggered) return;

  openTriggered = true;

  if (musicReady) {
    playMusic();
  }
}


// 用户开始向下滑动
window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {
    startMusicWhenOpen();
  }

}, { passive: true });


// 点击首页也可以触发音乐
const hero = document.querySelector(".hero-image");

if (hero) {
  hero.addEventListener("click", () => {
    startMusicWhenOpen();
  });
}
