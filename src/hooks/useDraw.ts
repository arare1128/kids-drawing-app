import type { PointerEvent as ReactPointerEvent, RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Point, Tool } from '../types';

const palette = ['#ff5c5c', '#ffad33', '#2ec4b6', '#3787ff', '#9b5de5', '#ef476f'];

const useDraw = (canvasRef: RefObject<HTMLCanvasElement | null>) => {
  const [color, setColor] = useState(palette[0]);
  const [lineWidth, setLineWidth] = useState(10);
  const [tool, setTool] = useState<Tool>('pen');
  const pointsRef = useRef<Point[]>([]);
  const pointerIdRef = useRef<number | null>(null);
  const isDrawingRef = useRef(false);

  const getPoint = (event: ReactPointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    return {
      x: event.clientX - (rect?.left ?? 0),
      y: event.clientY - (rect?.top ?? 0),
    };
  };

  const drawStamp = useCallback(
    (point: Point) => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      const img = new Image();
      img.src = '/stamp.svg';
      img.onload = () => {
        ctx.drawImage(img, point.x - 36, point.y - 36, 72, 72);
      };
    },
    [canvasRef],
  );

  const startDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const point = getPoint(event);
    if (tool === 'stamp') {
      drawStamp(point);
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerIdRef.current = event.pointerId;
    isDrawingRef.current = true;
    pointsRef.current = [point];
  };

  const draw = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || pointerIdRef.current !== event.pointerId) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const point = getPoint(event);
    const previous = pointsRef.current.at(-1);
    if (!previous) return;
    const midpoint = { x: (previous.x + point.x) / 2, y: (previous.y + point.y) / 2 };
    ctx.strokeStyle = tool === 'eraser' ? '#fffdf7' : color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.quadraticCurveTo(previous.x, previous.y, midpoint.x, midpoint.y);
    ctx.stroke();
    pointsRef.current.push(point);
  };

  const stopDrawing = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (pointerIdRef.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    isDrawingRef.current = false;
    pointsRef.current = [];
    pointerIdRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const randomizeColor = () => setColor(palette[Math.floor(Math.random() * palette.length)]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const ratio = Math.max(1, Math.min(window.devicePixelRatio, 2));
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      canvas.getContext('2d')?.scale(ratio, ratio);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvasRef]);

  return {
    clearCanvas,
    drawStamp,
    randomizeColor,
    setColor,
    setLineWidth,
    setTool,
    startDrawing,
    draw,
    stopDrawing,
    color,
    lineWidth,
    tool,
  };
};

export default useDraw;
