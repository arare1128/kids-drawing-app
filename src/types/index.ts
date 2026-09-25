export interface Point {
  x: number;
  y: number;
}

export interface DrawOptions {
  color: string;
  lineWidth: number;
}

export type Tool = 'pen' | 'eraser' | 'stamp';

export interface CanvasActions {
  clearCanvas: () => void;
  setColor: (color: string) => void;
  setLineWidth: (lineWidth: number) => void;
  setTool: (tool: Tool) => void;
  randomizeColor: () => void;
}
