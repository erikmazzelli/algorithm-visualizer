const BAR_NORMAL = '#3f3f46';    // zinc-700
const BAR_COMPARING = '#d4d4d8'; // zinc-300
const BAR_PIVOT = '#f87171';     // red-400

const LEGEND = [
  { color: BAR_NORMAL, label: 'Unsorted' },
  { color: BAR_COMPARING, label: 'Comparing' },
  { color: BAR_PIVOT, label: 'Pivot' },
];

const Visualizer = ({ array, highlightedIndices, pivotIndex }) => (
  <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-8'>
    <div className='flex items-end justify-center gap-px sm:gap-0.5 h-48 sm:h-64 md:h-96'>
      {array.map((value, idx) => (
        <div
          key={idx}
          className='transition-all duration-75 rounded-t-sm'
          style={{
            height: `${(value / 420) * 100}%`,
            width: `${Math.max(100 / array.length, 2)}%`,
            backgroundColor:
              pivotIndex === idx
                ? BAR_PIVOT
                : highlightedIndices.includes(idx)
                  ? BAR_COMPARING
                  : BAR_NORMAL,
          }}
        />
      ))}
    </div>

    <div className='flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-6'>
      {LEGEND.map(({ color, label }) => (
        <div key={label} className='flex items-center gap-2'>
          <div className='w-3 h-3 sm:w-4 sm:h-4 rounded-sm' style={{ backgroundColor: color }} />
          <span className='text-zinc-400 text-xs sm:text-sm'>{label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default Visualizer;
