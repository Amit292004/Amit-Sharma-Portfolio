"use client";

import { useRef, useEffect, useState } from "react";

class Point3D {
  x: number;
  y: number;
  z: number;
  px: number = 0; // projected x
  py: number = 0; // projected y
  color: string = "";

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export default function ThreeDCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0, active: false, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let points: Point3D[] = [];
    
    // Constants for 3D sphere
    const N = 90; // Number of particles
    const R = 140; // Sphere radius
    const focalLength = 320; // Perspective focal length
    
    // Fibonacci spiral distribution of points on a sphere
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = Math.PI * 2 * goldenRatio;

    for (let i = 0; i < N; i++) {
      const t = i / N;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      const x = R * Math.sin(inclination) * Math.cos(azimuth);
      const y = R * Math.sin(inclination) * Math.sin(azimuth);
      const z = R * Math.cos(inclination);

      points.push(new Point3D(x, y, z));
    }

    // Auto rotation speeds
    let angleX = 0.002;
    let angleY = 0.003;
    let angleZ = 0.0015;

    // Resizing handler
    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    window.addEventListener("resize", resize);
    resize();

    // Rotation functions
    const rotateX = (p: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = p.y * cos - p.z * sin;
      const z1 = p.y * sin + p.z * cos;
      p.y = y1;
      p.z = z1;
    };

    const rotateY = (p: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = p.x * cos + p.z * sin;
      const z1 = -p.x * sin + p.z * cos;
      p.x = x1;
      p.z = z1;
    };

    const rotateZ = (p: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = p.x * cos - p.y * sin;
      const y1 = p.x * sin + p.y * cos;
      p.x = x1;
      p.y = y1;
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Adjust rotation speed based on mouse movement
      let currentAngleX = angleX;
      let currentAngleY = angleY;
      
      if (mouse.active) {
        // Map mouse offset from center to small rotation bias
        const dx = (mouse.x - centerX) / centerX;
        const dy = (mouse.y - centerY) / centerY;
        currentAngleY += dx * 0.005;
        currentAngleX -= dy * 0.005;
      }

      // 1. Rotate and project all points
      points.forEach((p) => {
        rotateX(p, currentAngleX);
        rotateY(p, currentAngleY);
        rotateZ(p, angleZ);

        // Apply mouse drag/push effect in 3D
        if (mouse.active) {
          const dx = p.x - (mouse.x - centerX);
          const dy = p.y - (mouse.y - centerY);
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) * 0.08;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Project 3D coordinates to 2D perspective screen
        // Translate Z by 250px so it's always in front of the camera (positive Z)
        const scale = focalLength / (focalLength + p.z);
        p.px = centerX + p.x * scale;
        p.py = centerY + p.y * scale;
      });

      // 2. Draw connections (lines) between close points
      const maxDistance = 75; // Connect points closer than this threshold
      ctx.lineWidth = 0.5;

      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            // Opacity decreases with 3D distance and depth
            const avgZ = (p1.z + p2.z) / 2;
            // Map avgZ (-R to R) to scale factor (closer is brighter)
            const depthFactor = (R - avgZ) / (2 * R); // 0 (far) to 1 (close)
            const alpha = (1 - dist / maxDistance) * 0.22 * (0.3 + 0.7 * depthFactor);

            // Create blue-purple gradient line
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`; // primary color: #3b82f6 (blue)
            ctx.stroke();
          }
        }
      }

      // 3. Sort points by Z (depth sorting) so rear particles draw first
      const sortedPoints = [...points].sort((a, b) => b.z - a.z);

      // 4. Draw points
      sortedPoints.forEach((p) => {
        const scale = focalLength / (focalLength + p.z);
        const radius = Math.max(0.5, (1.8 * scale));
        
        // Depth-based transparency and color
        const depthFactor = (R - p.z) / (2 * R); // 0 (far) to 1 (close)
        const alpha = 0.15 + 0.75 * depthFactor;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        
        // Dynamic gradient: front points are bright blue/purple, back points are dark indigo
        if (p.z < 0) {
          ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`; // light blue
        } else {
          ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`; // purple
        }
        ctx.fill();

        // Draw ambient glow for front-most points
        if (p.z < -R * 0.5) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${alpha * 0.15})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouse]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
      targetX: e.clientX - rect.left,
      targetY: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    setMouse((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[300px] flex items-center justify-center cursor-crosshair overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block pointer-events-none" />
      
      {/* Decorative center glowing orb */}
      <div className="absolute w-[80px] h-[80px] rounded-full bg-blue-500/10 blur-xl pointer-events-none animate-pulse" />
      <div className="absolute w-[30px] h-[30px] rounded-full bg-purple-500/10 blur-md pointer-events-none" />
    </div>
  );
}
