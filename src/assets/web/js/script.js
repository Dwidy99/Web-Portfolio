// Darkmode toggle
// const darkToggle = document.querySelector("#dark-toggle");
// const html = document.querySelector("html");
// const snowCanvas = document.querySelector("#snowCanvas");

// darkToggle.addEventListener("click", function (e) {
//   if (darkToggle.checked) {
//     html.classList.add("dark");
//     snowCanvas.style.display = "block";
//     localStorage.theme = "dark";
//   } else {
//     html.classList.remove("dark");
//     snowCanvas.style.display = "none";
//     localStorage.theme = "light";
//   }
// });

// // Pindahkan posisi toggle sesuai mode
// if (
//   localStorage.theme === "dark" ||
//   (!("theme" in localStorage) &&
//     window.matchMedia("(prefers-color-scheme: dark)").matches)
// ) {
//   darkToggle.checked = true;
//   snowCanvas.style.display = "block";
// } else {
//   darkToggle.checked = false;
//   snowCanvas.style.display = "none";
// }

// Typewritter
// const text =
//   "bukan!, Belajar web programming itu mudah dan menyenangkan, bukan!";
// const speed = 100; // Kecepatan mengetik (ms)
// const delayBeforeRestart = 1500; // Delay sebelum mengulang (ms)
// let index = 0;

// function typeWriter() {
//   if (index < text.length) {
//     const currentChar = text[index];
//     document.getElementById("typing").innerHTML +=
//       currentChar === "bukan!"
//         ? `<strong>${currentChar}</strong>`
//         : currentChar; // Bold untuk "!"
//     index++;
//     setTimeout(typeWriter, speed);
//   } else {
//     // Setelah selesai mengetik, tambahkan delay dan fade-out
//     setTimeout(() => {
//       fadeOut(() => {
//         document.getElementById("typing").innerHTML = ""; // Reset teks
//         index = 0; // Reset indeks ke awal
//         typeWriter(); // Mulai ulang animasi
//       });
//     }, delayBeforeRestart);
//   }
// }

// // Efek fade-out
// function fadeOut(callback) {
//   const element = document.getElementById("typing");
//   let opacity = 1;
//   const fadeSpeed = 50; // Kecepatan fade-out
//   const interval = setInterval(() => {
//     if (opacity <= 0) {
//       clearInterval(interval); // Hentikan fade-out
//       element.style.opacity = 1; // Reset opacity ke 1
//       callback(); // Panggil callback untuk memulai ulang animasi
//     } else {
//       opacity -= 0.1;
//       element.style.opacity = opacity; // Kurangi opacity secara bertahap
//     }
//   }, fadeSpeed);
// }

// typeWriter(); // Mulai animasi saat halaman dimuat

// // Snow Effect
// const canvas = document.getElementById("snowCanvas");
// const ctx = canvas.getContext("2d");

// // Sesuaikan ukuran canvas dengan ukuran jendela
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

// // Buat array untuk partikel salju
// const snowflakes = [];

// // Fungsi untuk membuat partikel salju
// function createSnowflakes() {
//   for (let i = 0; i < 100; i++) {
//     snowflakes.push({
//       x: Math.random() * canvas.width, // Posisi horizontal acak
//       y: Math.random() * canvas.height, // Posisi vertikal acak
//       opacity: Math.random(), // Transparansi
//       speedX: Math.random() * 2 - 1, // Kecepatan horizontal (-1 ke 1)
//       speedY: Math.random() * 3 + 1, // Kecepatan vertikal (1 ke 4)
//       radius: Math.random() * 3 + 1, // Ukuran partikel
//     });
//   }
// }

// // Fungsi untuk menggambar partikel salju
// function drawSnowflakes() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.beginPath();
//   snowflakes.forEach((flake) => {
//     ctx.moveTo(flake.x, flake.y);
//     ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
//   });
//   ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
//   ctx.fill();
//   updateSnowflakes();
// }

// // Fungsi untuk memperbarui posisi partikel salju
// function updateSnowflakes() {
//   snowflakes.forEach((flake) => {
//     flake.x += flake.speedX;
//     flake.y += flake.speedY;

//     // Jika partikel keluar dari layar, reset posisinya ke atas
//     if (flake.y > canvas.height) {
//       flake.y = 0;
//       flake.x = Math.random() * canvas.width;
//     }
//     if (flake.x > canvas.width) {
//       flake.x = 0;
//     } else if (flake.x < 0) {
//       flake.x = canvas.width;
//     }
//   });
// }

// // Animasi salju
// function animateSnow() {
//   drawSnowflakes();
//   requestAnimationFrame(animateSnow);
// }

// // Inisialisasi
// createSnowflakes();
// animateSnow();

// // Resize canvas jika ukuran jendela berubah
// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });
