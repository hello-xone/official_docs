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

// 定义粒子生成区域接口
interface ParticleArea {
  x: number;    // 区域中心x坐标
  y: number;    // 区域中心y坐标
  radius: number; // 区域半径
  density: number; // 粒子密度 (0-1)
}

export default function PixelBlastBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>();

  // 配置特定的粒子生成区域（根据背景图线框位置调整）
  // 这些坐标将相对于画布大小进行计算
  const particleAreas: ParticleArea[] = [
    { x: 0.2, y: 0.3, radius: 0.1, density: 0.8 },  // 左上区域
    { x: 0.8, y: 0.3, radius: 0.1, density: 0.8 },  // 右上区域
    { x: 0.2, y: 0.7, radius: 0.1, density: 0.8 },  // 左下区域
    { x: 0.8, y: 0.7, radius: 0.1, density: 0.8 },  // 右下区域
    { x: 0.5, y: 0.5, radius: 0.2, density: 1.0 }   // 中心区域
  ];

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

    // 在特定区域内随机生成位置
    const getRandomPositionInAreas = (): { x: number, y: number } => {
      // 根据密度权重选择一个区域
      const totalDensity = particleAreas.reduce((sum, area) => sum + area.density, 0);
      let random = Math.random() * totalDensity;

      let selectedArea: ParticleArea | undefined;
      for (const area of particleAreas) {
        random -= area.density;
        if (random <= 0) {
          selectedArea = area;
          break;
        }
      }

      if (!selectedArea) {
        selectedArea = particleAreas[0];
      }

      // 在选中的区域内生成随机位置（使用极坐标确保在圆形区域内均匀分布）
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.sqrt(Math.random()) * selectedArea.radius;

      // 转换为画布坐标（selectedArea的x,y是相对值，乘以画布宽高）
      const x = selectedArea.x * canvas.width + Math.cos(angle) * distance * canvas.width;
      const y = selectedArea.y * canvas.height + Math.sin(angle) * distance * canvas.height;

      return { x, y };
    };

    // 再定义 initBackgroundParticles 函数
    const initBackgroundParticles = () => {
      particlesRef.current = [];
      // 增加初始背景粒子数量
      for (let i = 0; i < 20; i++) {
        const position = getRandomPositionInAreas();
        const particle = createParticle(
          position.x,
          position.y,
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
      const position = getRandomPositionInAreas();

      const particle = createParticle(position.x, position.y, 0, 0, false, true);

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