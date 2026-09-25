import type { CanvasActions, Tool } from '../types';

interface ControlsProps extends CanvasActions {
  activeTool: Tool;
}

const Controls = ({
  setColor,
  setLineWidth,
  setTool,
  randomizeColor,
  clearCanvas,
  activeTool,
}: ControlsProps) => {
  const colors = [
    ['#ff5c5c', '赤'],
    ['#ffad33', 'オレンジ'],
    ['#2ec4b6', 'みどり'],
    ['#3787ff', 'あお'],
    ['#9b5de5', 'むらさき'],
  ] as const;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3 sm:p-5">
      <div className="pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-2 rounded-[2rem] border-4 border-white/80 bg-[#fff8e7]/95 p-2 shadow-[0_8px_30px_rgba(75,55,30,0.18)] backdrop-blur-sm sm:gap-3 sm:p-3">
        <div className="flex items-center gap-1.5">
          {colors.map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-label={`${label}のペン`}
              onClick={() => {
                setColor(value);
                setTool('pen');
              }}
              className="h-11 w-11 rounded-full border-4 border-white shadow-sm transition-transform hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
              style={{ backgroundColor: value }}
            />
          ))}
          <button
            type="button"
            aria-label="ランダムな色"
            onClick={randomizeColor}
            className="h-11 w-11 rounded-full bg-[conic-gradient(#ff5c5c,#ffad33,#2ec4b6,#3787ff,#9b5de5,#ff5c5c)] text-xl shadow-sm transition-transform hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
          >
            ?
          </button>
        </div>
        <div className="h-10 w-px bg-[#d8cdbb]" />
        <button
          type="button"
          aria-label="細いペン"
          onClick={() => {
            setLineWidth(8);
            setTool('pen');
          }}
          className={`rounded-full px-4 py-3 text-sm font-black text-[#4b4035] ${activeTool === 'pen' ? 'bg-white shadow-sm' : ''}`}
        >
          細い
        </button>
        <button
          type="button"
          aria-label="太いペン"
          onClick={() => {
            setLineWidth(22);
            setTool('pen');
          }}
          className="rounded-full bg-white px-4 py-3 text-sm font-black text-[#4b4035] shadow-sm"
        >
          太い
        </button>
        <button
          type="button"
          aria-label="消しゴム"
          onClick={() => setTool('eraser')}
          className={`rounded-full px-4 py-3 text-sm font-black text-[#4b4035] ${activeTool === 'eraser' ? 'bg-[#d7f4ef]' : 'bg-white shadow-sm'}`}
        >
          消す
        </button>
        <button
          type="button"
          aria-label="スタンプ"
          onClick={() => setTool('stamp')}
          className={`rounded-full bg-[#ffd166] px-4 py-3 text-sm font-black text-[#4b4035] shadow-sm ${activeTool === 'stamp' ? 'ring-4 ring-[#ef476f]/40' : ''}`}
        >
          スタンプ
        </button>
        <button
          type="button"
          aria-label="キャンバスを消去"
          onClick={clearCanvas}
          className="rounded-full bg-[#4b4035] px-4 py-3 text-sm font-black text-white shadow-sm transition-transform active:scale-95"
        >
          ぜんぶ消す
        </button>
      </div>
    </div>
  );
};

export default Controls;
