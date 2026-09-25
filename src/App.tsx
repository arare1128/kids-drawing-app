import { useRef } from 'react';
import Canvas from './components/Canvas';
import Controls from './components/Controls';
import useDraw from './hooks/useDraw';

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useDraw(canvasRef);

  return (
    <main className="relative h-dvh overflow-hidden bg-[#fffdf7]">
      <Canvas
        canvasRef={canvasRef}
        onPointerDown={drawing.startDrawing}
        onPointerMove={drawing.draw}
        onPointerUp={drawing.stopDrawing}
      />
      <Controls
        clearCanvas={drawing.clearCanvas}
        randomizeColor={drawing.randomizeColor}
        setColor={drawing.setColor}
        setLineWidth={drawing.setLineWidth}
        setTool={drawing.setTool}
        activeTool={drawing.tool}
      />
    </main>
  );
};

export default App;
