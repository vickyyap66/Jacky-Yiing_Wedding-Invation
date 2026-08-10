// ===============================
// JACKY & YIING WEDDING INVITATION
// Edit the settings below if needed.
// ===============================
const WEDDING_DATE = "2026-10-25T10:00:00+08:00";
const VENUE = "14/15 Jalan Jambu Melaka 2, Jinjang Selatan, Kuala Lumpur";

// Add the couple's WhatsApp number here, e.g. "60123456789"
// Leave blank if you want the RSVP buttons disabled.
const WHATSAPP_NUMBER = "60146449336";

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

// ===============================
// RSVP → WhatsApp
// ===============================

function sendRSVP(attending) {

  const name = document.getElementById("guestName").value.trim();
  const count = document.getElementById("guestCount").value;

  // 检查姓名
  if (!name) {
    document.getElementById("guestName").focus();
    alert("请先输入您的姓名。");
    return;
  }

  // WhatsApp号码
  if (!WHATSAPP_NUMBER) {
    alert("60146449336");
    return;
  }

  // 根据按钮选择出席状态
  const status = attending ? "会出席" : "无法出席";

  // 自动填写到 WhatsApp 对话框的固定内容
  const message =
`Jacky & Yiing Wedding RSVP

姓名：${name}
人数：${count} 位
回复：${status}

谢谢！`;

  // 编码讯息
  const encodedMessage = encodeURIComponent(message);

  // 打开 WhatsApp，并自动把讯息放进输入框
  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}


// 我会出席
document.getElementById("attendBtn").addEventListener("click", () => {
  sendRSVP(true);
});

// 无法出席
document.getElementById("declineBtn").addEventListener("click", () => {
  sendRSVP(false);
});

// ===============================
// Music
// ===============================

const musicBtn = document.getElementById("musicBtn");

// 直接加载音乐，不使用 fetch HEAD 检查
const audio = new Audio("music.mp3");
audio.loop = true;
audio.preload = "auto";

let musicStarted = false;


// 播放音乐
async function playMusic() {
  try {
    await audio.play();

    musicStarted = true;
    musicBtn.innerHTML = "<span>Ⅱ</span>";
    musicBtn.classList.add("playing");

  } catch (error) {
    console.log("Music playback blocked:", error);
  }
}


// 暂停音乐
function pauseMusic() {
  audio.pause();

  musicBtn.innerHTML = "<span>♪</span>";
  musicBtn.classList.remove("playing");
}


// ===============================
// 音乐按钮：播放 / 暂停
// ===============================

musicBtn.addEventListener("click", (event) => {

  event.stopPropagation();

  if (audio.paused) {
    playMusic();
  } else {
    pauseMusic();
  }

});


// ===============================
// SCROLL TO OPEN → 自动播放
// ===============================

let openTriggered = false;

function startMusicWhenOpen() {

  if (openTriggered) return;

  openTriggered = true;

  playMusic();
}


// 监听第一次向下滑动
window.addEventListener("scroll", () => {

  if (window.scrollY > 10) {
    startMusicWhenOpen();
  }

}, { passive: true });


// ===============================
// 首页点击
// → 自动播放音乐
// → 自动滑到 Welcome
// ===============================

const hero = document.querySelector(".hero-image");
const welcomeSection = document.getElementById("welcome");

if (hero) {

  hero.addEventListener("click", () => {

    // 开始播放音乐
    startMusicWhenOpen();

    // 滑到 Welcome 第二页
    if (welcomeSection) {
      welcomeSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  });

}

// ===============================
// Wedding Video
// 滑到视频页面 → 自动播放
// 离开视频页面 → 自动暂停
// ===============================

const weddingVideo = document.querySelector(".wedding-video");

if (weddingVideo) {

  const videoObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        weddingVideo.play().catch(error => {
          console.log("Video playback blocked:", error);
        });
      } else {
        weddingVideo.pause();
      }

    });

  }, {
    threshold: 0.4
  });

  videoObserver.observe(weddingVideo);
}
