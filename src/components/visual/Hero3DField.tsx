"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Hero3DField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 500;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      t += 0.015;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.7);
      skyGrad.addColorStop(0, "#064E3B");
      skyGrad.addColorStop(0.5, "#0D3321");
      skyGrad.addColorStop(1, "#111A14");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // Soft Sun / Golden Morning Glow
      const sunX = w * 0.75 + (mousePos.x - 0.5) * 40;
      const sunY = h * 0.25 + (mousePos.y - 0.5) * 30;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 160);
      sunGlow.addColorStop(0, "rgba(244, 183, 64, 0.45)");
      sunGlow.addColorStop(0.4, "rgba(244, 183, 64, 0.15)");
      sunGlow.addColorStop(1, "rgba(244, 183, 64, 0)");
      ctx.fillStyle = sunGlow;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 160, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric Clouds
      const drawCloud = (cx: number, cy: number, scale: number, alpha: number) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(cx, cy, 30 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 25 * scale, cy - 10 * scale, 38 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 60 * scale, cy, 32 * scale, 0, Math.PI * 2);
        ctx.arc(cx + 35 * scale, cy + 10 * scale, 25 * scale, 0, Math.PI * 2);
        ctx.fill();
      };

      const cloud1X = ((t * 8) % (w + 200)) - 100;
      const cloud2X = (((t * 5) + 300) % (w + 200)) - 100;
      drawCloud(cloud1X, h * 0.18, 0.9, 0.08);
      drawCloud(cloud2X, h * 0.12, 1.2, 0.05);

      // Distant Western Ghats / Hills (Back Layer)
      const hillShift = (mousePos.x - 0.5) * 25;
      ctx.fillStyle = "#0A2416";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.55);
      for (let x = 0; x <= w; x += 30) {
        const y = h * 0.52 + Math.sin((x + hillShift) * 0.005) * 35 + Math.cos((x + hillShift) * 0.009) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Midground Cauvery Delta Paddies (Layer 2)
      const midShift = (mousePos.x - 0.5) * 50;
      ctx.fillStyle = "#0F3D24";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.68);
      for (let x = 0; x <= w; x += 20) {
        const y = h * 0.65 + Math.sin((x + midShift) * 0.007) * 25;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Foreground Rice Field Terraces with animated golden grain ripples
      const fgShift = (mousePos.x - 0.5) * 75;
      ctx.fillStyle = "#16A34A";
      ctx.beginPath();
      ctx.moveTo(0, h * 0.82);
      for (let x = 0; x <= w; x += 15) {
        const y = h * 0.78 + Math.sin((x + fgShift) * 0.008) * 15 + Math.sin(t * 1.5 + x * 0.02) * 4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Subtle crop stalks / golden grain dots swaying in the breeze
      ctx.fillStyle = "#F4B740";
      for (let i = 0; i < 45; i++) {
        const cropX = (i * (w / 45) + fgShift * 0.8 + w) % w;
        const baseY = h * 0.84 + Math.sin(i * 0.5) * 20;
        const sway = Math.sin(t * 2 + i) * 6;
        ctx.fillRect(cropX + sway, baseY - 12, 2, 12);
        ctx.beginPath();
        ctx.arc(cropX + sway, baseY - 13, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePos]);

  return (
    <div className="relative w-full h-[440px] md:h-[500px] overflow-hidden rounded-3xl border border-emerald-900/40 shadow-2xl bg-[#080D0A]">
      <canvas ref={canvasRef} className="w-full h-full block" />
      
      {/* Overlay Ambient Vignette & Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080D0A]/90 via-transparent to-transparent pointer-events-none" />

      {/* Floating Microclimate Sensor Badge Overlay */}
      <div className="absolute top-6 right-6 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#111A14]/85 backdrop-blur-md border border-emerald-800/40 text-emerald-100 shadow-xl pointer-events-none animate-float">
        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
        <div className="text-xs">
          <div className="font-semibold text-emerald-300">Cauvery Delta Microclimate</div>
          <div className="text-emerald-100/75">31.4°C • 68% RH • 650mm Baseline</div>
        </div>
      </div>

      {/* Sowing Window Advisory Chip */}
      <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#111A14]/85 backdrop-blur-md border border-amber-500/30 text-amber-100 shadow-xl pointer-events-none">
        <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">Samba Season 2026</div>
        <div className="text-xs text-amber-200/80">Optimal Sowing Window: Active</div>
      </div>
    </div>
  );
}
