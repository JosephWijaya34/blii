// ======================
// Section 1: Carousel Intro with Typing Animation
// ======================

const slides = document.querySelectorAll(".carousel-slide");
const texts = document.querySelectorAll(".carousel-slide .text");
let currentSlide = 0;
let isTyping = false; // untuk mencegah klik saat animasi belum selesai

// Fungsi menampilkan slide dan mengetikkan teks
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  // Reset semua text element width ke 0
  const textEl = texts[index];
  const fullText = textEl.dataset.text;
  textEl.textContent = ""; // kosongkan teks
  textEl.style.width = "0";
  textEl.classList.remove("typing");

  let charIndex = 0;
  isTyping = true;

  const typingInterval = setInterval(() => {
    textEl.textContent += fullText[charIndex];
    charIndex++;
    if (charIndex === fullText.length) {
      clearInterval(typingInterval);
      isTyping = false; // typing selesai
    }
  }, 30);
}

// Tombol "Lanjut 🚀" ke section berikut
document.getElementById("toStrengthBtn").addEventListener("click", () => {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("strengths").classList.remove("hidden");
});

// Klik layar untuk pindah ke slide berikutnya (kalau typing udah selesai)
document.addEventListener("click", () => {
  if (!isTyping && currentSlide < slides.length - 1) {
    currentSlide++;
    showSlide(currentSlide);
  }
});

// Mulai dari slide pertama
showSlide(currentSlide);


// ========================
// Section 2: Kelebihannya
// ========================
document.getElementById("toJourneyBtn").addEventListener("click", () => {
  document.getElementById("strengths").classList.add("hidden");
  document.getElementById("journey").classList.remove("hidden");
});

// ====== Animate Fun Facts When Section 2 Shows ======
const strengthSection = document.getElementById("strengths");
const funFacts = document.querySelectorAll(".strength-list li");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      funFacts.forEach((item, index) => {
        item.style.setProperty('--delay', `${index * 0.2}s`);
      });
      observer.unobserve(entry.target); // Stop after trigger once
    }
  });
}, { threshold: 0.5 });

observer.observe(strengthSection);

// ======================
// Section 3: Petunjuk / Journey
// ======================
const slideImgs = document.querySelectorAll(".slide");
let currentImg = 0;

// Fungsi untuk menampilkan gambar aktif
function showImage(index) {
  slideImgs.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  // Jika sudah di slide terakhir, sembunyikan tombol
  if (index === slideImgs.length - 1) {
    document.getElementById("nextSlide").style.display = "none";
  }
}

// Event untuk tombol 'next'
document.getElementById("nextSlide").addEventListener("click", () => {
  if (currentImg < slideImgs.length - 1) {
    currentImg++;
    showImage(currentImg);
  }
});


// ======================
// Background Music Autoplay setelah interaksi pertama
// ======================

const bgMusic = document.getElementById("bgMusic");
const clicker = document.getElementById("clicker");

function enableMusic() {
  bgMusic.play().catch(e => {
    console.warn("Autoplay blocked:", e);
  });

  document.removeEventListener("click", enableMusic);
  document.removeEventListener("touchstart", enableMusic);
}

clicker.addEventListener("click", enableMusic);
clicker.addEventListener("touchstart", enableMusic);
