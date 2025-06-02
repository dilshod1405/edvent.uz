"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroHome() {
  const canvasRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const access = localStorage.getItem("access");
      setHasAccess(!!access);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const isMobile = window.innerWidth <= 768;
    const pointCount = isMobile ? 40 : 100;
    const maxDist = isMobile ? 70 : 120;
    const mouseDist = isMobile ? 100 : 150;

    let points = Array.from({ length: pointCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
    }));

    let mouse = { x: 0, y: 0 };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let p of points) {
        for (let step = 0; step < 3; step++) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fill();
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / maxDist})`;
            ctx.stroke();
          }
        }
      }

      for (let p of points) {
        const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (dist < mouseDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(173,216,230,${1 - dist / mouseDist})`;
          ctx.stroke();
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        width={typeof window !== "undefined" ? window.innerWidth : 1920}
        height={typeof window !== "undefined" ? window.innerHeight : 1080}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-6 max-w-[1200px] mx-auto w-full gap-12">
        <motion.div
          className="flex flex-col justify-center w-full md:w-[70%] max-w-xl space-y-6 text-center md:text-left min-h-[350px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Edvent – Kelajak kasblariga yo‘l
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">
            O‘zgarayotgan texnologiyalar olamida zamonaviy ko‘nikmalarga ega bo‘ling
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {hasAccess ? (
              <Link
                href="/api/dashboard/kurslarim"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition"
              >
                Kurslarim
              </Link>
            ) : (
              <Link
                href="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition"
              >
                Hoziroq boshlash
              </Link>
            )}
            <Link
              href="/free-lessons"
              className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full font-medium transition"
            >
              Bepul darslar
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center w-full md:w-[30%] min-h-[350px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <figure
            onClick={() => setModalOpen(true)}
            className="cursor-pointer bg-gradient-to-br from-indigo-600 to-indigo-400 shadow-2xl rounded-full flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 hover:scale-110 transition-transform duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 sm:w-24 sm:h-24 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </figure>
        </motion.div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-[80vw] max-w-3xl aspect-video bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src="/videos/video.mp4"
              title="Video"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 hover:bg-red-700 transition"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
