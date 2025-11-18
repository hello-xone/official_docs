"use client";

import React, { useEffect, useRef } from 'react';
import styles from './PixelBlastBackground.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  color: string;
  originalSize: number;
  distanceFromCenter: number;
  isBackground: boolean;
}

export default function PixelBlastBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 先定义 createParticle 函数
    const createParticle = (
      x: number, 
      y: number, 
      centerX: number, 
      centerY: number, 
      isPolygon: boolean = false,
      isBackground: boolean = false
    ): Particle => {
      // 计算粒子到中心的距离
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // 设置消失速度
      let decay;
      if (isBackground) {
        // 背景粒子消失速度
        decay = 0.002 + Math.random() * 0.003;
      } else {
        // 多边形粒子消失速度更快
        const maxDistance = 150;
        const distanceFactor = distance / maxDistance;
        decay = 0.008 + distanceFactor * 0.012;
      }
      
      // 增加背景粒子的运动速度，使其更明显
      const speed = isBackground ? 
        Math.random() * 0.8 + 0.3 : // 增加背景粒子速度
        (isPolygon ? Math.random() * 0.3 + 0.05 : Math.random() * 0.3 + 0.1);
      
      const angle = Math.random() * Math.PI * 2;
      
      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay,
        size: 6,
        color: '#ff0000',
        originalSize: 6,
        distanceFromCenter: distance,
        isBackground,
      };
    };

    // 再定义 initBackgroundParticles 函数
    const initBackgroundParticles = () => {
      particlesRef.current = [];
      // 增加初始背景粒子数量
      for (let i = 0; i < 20; i++) {
        const particle = createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          0, 0, false, true
        );
        // 增加初始速度，使粒子明显运动
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.6 + 0.3;
        particle.vx = Math.cos(angle) * speed;
        particle.vy = Math.sin(angle) * speed;
        particlesRef.current.push(particle);
      }
    };

    // 初始化背景粒子
    initBackgroundParticles();

    // 绘制6×6十字架
    const drawCross = (x: number, y: number, size: number, color: string, alpha: number) => {
      const halfSize = size / 2;
      const thirdSize = size / 6;
      
      ctx.save();
      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      
      // 横线
      ctx.fillRect(x - halfSize, y - thirdSize, size, thirdSize * 2);
      // 竖线
      ctx.fillRect(x - thirdSize, y - halfSize, thirdSize * 2, size);
      
      ctx.restore();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    // 判断点是否在多边形内（射线法）
    const pointInPolygon = (x: number, y: number, vertices: {x: number, y: number}[]): boolean => {
      let inside = false;
      for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x, yi = vertices[i].y;
        const xj = vertices[j].x, yj = vertices[j].y;
        
        const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    // 创建新的背景粒子
    const createNewBackgroundParticle = (fromEdge: boolean = true) => {
      let x, y;
      
      if (fromEdge) {
        // 从边缘生成
        const side = Math.floor(Math.random() * 4);
        switch (side) {
          case 0: // 顶部
            x = Math.random() * canvas.width;
            y = -10;
            break;
          case 1: // 右侧
            x = canvas.width + 10;
            y = Math.random() * canvas.height;
            break;
          case 2: // 底部
            x = Math.random() * canvas.width;
            y = canvas.height + 10;
            break;
          default: // 左侧
            x = -10;
            y = Math.random() * canvas.height;
        }
      } else {
        // 在画布内部随机位置生成
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
      }
      
      const particle = createParticle(x, y, 0, 0, false, true);
      
      // 设置更随机的初始速度
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.6 + 0.3;
      particle.vx = Math.cos(angle) * speed;
      particle.vy = Math.sin(angle) * speed;
      
      particlesRef.current.push(particle);
    };

    // 创建不规则多边形区域的粒子
    const createPolygonParticles = (centerX: number, centerY: number) => {
      const particleCount = 120;
      const radius = 150;
      const sides = 7 + Math.floor(Math.random() * 5);
      
      // 计算多边形的顶点
      const vertices = [];
      for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2;
        const randomRadius = radius * (0.6 + Math.random() * 0.8);
        const x = centerX + Math.cos(angle) * randomRadius;
        const y = centerY + Math.sin(angle) * randomRadius;
        vertices.push({ x, y });
      }
      
      // 在多边形区域内生成粒子 - 使用密度梯度
      for (let i = 0; i < particleCount; i++) {
        const densityFactor = Math.random();
        const targetDistance = densityFactor * radius * 0.8;
        
        let x, y;
        let inside = false;
        let attempts = 0;
        
        while (!inside && attempts < 100) {
          const angle = Math.random() * Math.PI * 2;
          const distanceVariation = (Math.random() - 0.5) * radius * 0.2;
          const actualDistance = Math.max(0, targetDistance + distanceVariation);
          
          x = centerX + Math.cos(angle) * actualDistance;
          y = centerY + Math.sin(angle) * actualDistance;
          
          inside = pointInPolygon(x, y, vertices);
          attempts++;
        }
        
        if (!inside) {
          x = centerX + (Math.random() - 0.5) * radius * 1.6;
          y = centerY + (Math.random() - 0.5) * radius * 1.6;
          inside = pointInPolygon(x, y, vertices);
        }
        
        if (inside) {
          const particle = createParticle(x, y, centerX, centerY, true, false);
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 0.15 + 0.02;
          particle.vx = Math.cos(angle) * speed;
          particle.vy = Math.sin(angle) * speed;
          particlesRef.current.push(particle);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;

      // 更新粒子位置
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // 边界处理
        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = canvas.height + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;

        // 轻微减速
        particle.vx *= 0.998;
        particle.vy *= 0.998;

        // 所有粒子都有生命周期
        particle.life -= particle.decay;
      });

      // 绘制所有粒子
      particles.forEach(particle => {
        if (particle.life > 0) {
          drawCross(particle.x, particle.y, particle.size, particle.color, particle.life);
        }
      });

      // 移除死亡的粒子
      const deadParticles = particles.filter(particle => particle.life <= 0);
      particlesRef.current = particles.filter(particle => particle.life > 0);
      
      // 为每个死亡的背景粒子创建一个新的背景粒子
      deadParticles.forEach(particle => {
        if (particle.isBackground) {
          // 50%的概率从边缘生成，50%的概率从内部生成
          const fromEdge = Math.random() > 0.5;
          createNewBackgroundParticle(fromEdge);
        }
      });

      // 确保有足够数量的背景粒子
      const backgroundParticles = particlesRef.current.filter(p => p.isBackground);
      if (backgroundParticles.length < 150) {
        // 补充缺失的背景粒子
        for (let i = 0; i < 150 - backgroundParticles.length; i++) {
          // 50%的概率从边缘生成，50%的概率从内部生成
          const fromEdge = Math.random() > 0.5;
          createNewBackgroundParticle(fromEdge);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // 点击创建不规则多边形区域的粒子
    const handleClick = (e: MouseEvent) => {
      createPolygonParticles(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.pixelBlastContainer}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}