import { GitBranch } from 'lucide-react';

const AlgorithmCard = ({ id, algo, selected, disabled, onSelect }) => (
  <button
    onClick={() => onSelect(id)}
    disabled={disabled}
    className={`p-3 sm:p-4 rounded-xl text-left transition-all border ${
      selected
        ? 'bg-zinc-800 border-zinc-500 ring-1 ring-zinc-500'
        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <div className='flex items-center gap-2 mb-1.5'>
      <GitBranch className='text-zinc-400 flex-shrink-0' size={16} />
      <span className='text-zinc-100 font-semibold text-sm'>{algo.name}</span>
    </div>
    <p className='text-zinc-400 text-xs mb-1 font-mono'>{algo.complexity}</p>
    <p className='text-zinc-500 text-xs hidden sm:block'>{algo.description}</p>
  </button>
);

export default AlgorithmCard;
