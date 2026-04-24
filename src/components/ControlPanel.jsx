import { Play, Pause, RotateCcw, Zap } from 'lucide-react';

const ControlPanel = ({
  sorting,
  arrayLength,
  speed,
  onToggle,
  onReset,
  onSpeedChange,
  onSizeChange,
}) => (
  <div className='flex flex-col gap-3 sm:gap-4'>
    <div className='flex flex-wrap gap-2 sm:gap-3'>
      <button
        onClick={onToggle}
        disabled={arrayLength === 0}
        className='bg-zinc-100 hover:bg-white text-zinc-900 font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 text-sm sm:text-base'
      >
        {sorting ? <Pause size={16} /> : <Play size={16} />}
        {sorting ? 'Pause' : 'Play'}
      </button>

      <button
        onClick={onReset}
        disabled={sorting}
        className='bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 text-sm sm:text-base border border-zinc-700'
      >
        <RotateCcw size={16} />
        Reset
      </button>
    </div>

    <div className='flex flex-col sm:flex-row gap-3'>
      <div className='flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-3 sm:px-4 py-2.5 rounded-lg flex-1'>
        <Zap className='text-zinc-400 flex-shrink-0' size={16} />
        <span className='text-zinc-300 text-sm whitespace-nowrap'>Speed</span>
        <input
          type='range'
          min='1'
          max='100'
          value={speed}
          onChange={e => onSpeedChange(Number(e.target.value))}
          disabled={sorting}
          className='flex-1 min-w-0 accent-zinc-300'
        />
        <span className='text-zinc-400 font-mono text-sm w-10 text-right'>{speed}%</span>
      </div>

      <div className='flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-3 sm:px-4 py-2.5 rounded-lg flex-1'>
        <span className='text-zinc-300 text-sm whitespace-nowrap'>Size</span>
        <input
          type='range'
          min='10'
          max='100'
          value={arrayLength}
          onChange={e => onSizeChange(Number(e.target.value))}
          disabled={sorting}
          className='flex-1 min-w-0 accent-zinc-300'
        />
        <span className='text-zinc-400 font-mono text-sm w-10 text-right'>{arrayLength}</span>
      </div>
    </div>
  </div>
);

export default ControlPanel;
