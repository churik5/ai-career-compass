import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '../lib/cn';

export interface NeuralBackgroundProps {
  className?: string;
  nodeCount?: number;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
}

const COLORS = [
  'rgba(255, 107, 53, 0.55)', // amber
  'rgba(124, 108, 255, 0.45)', // iris
  'rgba(34, 211, 238, 0.45)', // neon
];

const LINK_DISTANCE = 140;

export function NeuralBackground({
  className,
  nodeCount = 55,
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    const effectiveNodeCount = isMobile
      ? Math.max(20, Math.floor(nodeCount * 0.55))
      : nodeCount;

    const nodes: Node[] = [];

    function seed() {
      nodes.length = 0;
      for (let i = 0; i < effectiveNodeCount; i += 1) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          color: COLORS[i % COLORS.length] ?? COLORS[0]!,
          radius: Math.random() * 1.2 + 0.6,
        });
      }
    }

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.18;
            ctx.strokeStyle = `rgba(183, 174, 160, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    let rafId = 0;
    function tick() {
      draw();
      rafId = window.requestAnimationFrame(tick);
    }

    resize();

    if (reduce) {
      draw();
    } else {
      rafId = window.requestAnimationFrame(tick);
    }

    const onResize = () => {
      resize();
      if (reduce) draw();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [nodeCount, reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 h-full w-full',
        'opacity-[0.75]',
        className,
      )}
    />
  );
}
