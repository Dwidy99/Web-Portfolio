import { useRef, useEffect } from "react";

const SnowEffect = () => {
  const canvasRef = useRef(null);

  // Fungsi untuk membuat partikel salju
  const createSnowflakes = () => {
    const snowflakes = [];
    for (let i = 0; i < 100; i++) {
      snowflakes.push({
        x: Math.random() * window.innerWidth, // Posisi horizontal acak
        y: Math.random() * window.innerHeight, // Posisi vertikal acak
        opacity: Math.random(), // Transparansi
        speedX: Math.random() * 2 - 4, // Diperlambat 10x
        speedY: Math.random() * 1 + 0.5, // Diperlambat 10x
        radius: Math.random() * 2 + 2, // Ukuran partikel
      });
    }
    return snowflakes;
  };

  // Fungsi untuk menggambar partikel salju
  const drawSnowflakes = (ctx, snowflakes) => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.beginPath();
    snowflakes.forEach((flake) => {
      ctx.moveTo(flake.x, flake.y);
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
    });
    ctx.fillStyle = "rgba(205, 205, 205, 0.8)";
    ctx.fill();
  };

  // Fungsi untuk memperbarui posisi partikel salju
  const updateSnowflakes = (snowflakes) => {
    return snowflakes.map((flake) => {
      let newX = flake.x + flake.speedX;
      let newY = flake.y + flake.speedY;

      // Jika partikel keluar dari layar, reset posisinya ke atas
      if (newY > window.innerHeight) {
        newY = 0;
        newX = Math.random() * window.innerWidth;
      }
      if (newX > window.innerWidth) {
        newX = 0;
      } else if (newX < 0) {
        newX = window.innerWidth;
      }

      return { ...flake, x: newX, y: newY };
    });
  };

  // Animasi salju
  const animateSnow = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let snowflakes = createSnowflakes();

    const animate = () => {
      drawSnowflakes(ctx, snowflakes);
      snowflakes = updateSnowflakes(snowflakes);
      requestAnimationFrame(animate);
    };

    animate();
  };

  // Inisialisasi efek salju saat komponen dimount
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    animateSnow();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0"
    ></canvas>
  );
};

export default SnowEffect;
