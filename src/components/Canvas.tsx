import type { PointerEvent, RefObject } from 'react';

interface CanvasProps {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  onPointerDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  onPointerUp: (event: PointerEvent<HTMLCanvasElement>) => void;
}

const Canvas = ({ canvasRef, onPointerDown, onPointerMove, onPointerUp }: CanvasProps) => {
  return (
    <canvas
      ref={canvasRef}
      className="h-dvh w-full touch-none bg-[#fffdf7]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    />
  );
};

export default Canvas;
