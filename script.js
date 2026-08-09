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
    alert("请在 script.js 中填写新人的 WhatsApp 号码，即可启用 RSVP。");
    return;
  }
  const status = attending ? "会出席" : "无法出席";
  const text = `Jacky & Yiing Wedding RSVP%0A%0A姓名：${encodeURIComponent(name)}%0A人数：${count} 位%0A回复：${encodeURIComponent(status)}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
}
document.getElementById("attendBtn").addEventListener("click", () => sendRSVP(true));
document.getElementById("declineBtn").addEventListener("click", () => sendRSVP(false));

// Music button is intentionally prepared for an optional audio file.
// Put music.mp3 in this folder to enable it.
const musicBtn = document.getElementById("musicBtn");
let audio = null;
let musicReady = false;
fetch("music.mp3", {method:"HEAD"}).then(r => {
  if (r.ok) {
    audio = new Audio("music.mp3");
    audio.loop = true;
    musicReady = true;
  }
}).catch(() => {});
musicBtn.addEventListener("click", async () => {
  if (!musicReady) {
    alert("如需背景音乐，请把音乐文件命名为 music.mp3 放进网站文件夹。");
    return;
  }
  if (audio.paused) {
    await audio.play();
    musicBtn.innerHTML = "<span>Ⅱ</span>";
  } else {
    audio.pause();
    musicBtn.innerHTML = "<span>♪</span>";
  }
});
