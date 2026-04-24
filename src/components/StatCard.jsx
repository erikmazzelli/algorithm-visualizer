const StatCard = ({ label, value }) => (
  <div className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-6'>
    <p className='text-zinc-500 text-xs sm:text-sm mb-1'>{label}</p>
    <p className='text-zinc-100 text-2xl sm:text-3xl md:text-4xl font-bold font-mono'>
      {value.toLocaleString()}
    </p>
  </div>
);

export default StatCard;
