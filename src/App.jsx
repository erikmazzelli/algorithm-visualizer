import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Brain, GitBranch } from 'lucide-react';

const AlgorithmVisualizer = () => {
  const [algorithm, setAlgorithm] = useState('quicksort');
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [highlightedIndices, setHighlightedIndices] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const timeoutRef = useRef(null);

  const algorithms = {
    quicksort: {
      name: 'Quick Sort',
      complexity: 'O(n log n)',
      description: 'Divide and conquer usando pivot',
    },
    mergesort: {
      name: 'Merge Sort',
      complexity: 'O(n log n)',
      description: 'Divide recursivamente e mescla',
    },
    heapsort: {
      name: 'Heap Sort',
      complexity: 'O(n log n)',
      description: 'Usa estrutura de heap binário',
    },
    bubblesort: {
      name: 'Bubble Sort',
      complexity: 'O(n²)',
      description: 'Compara pares adjacentes',
    },
  };

  useEffect(() => {
    generateArray();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const generateArray = (size = 50) => {
    const newArray = Array.from(
      { length: size },
      () => Math.floor(Math.random() * 400) + 20,
    );
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
    setHighlightedIndices([]);
    setPivotIndex(null);
    setSorting(false);
  };

  const sleep = ms =>
    new Promise(resolve => {
      timeoutRef.current = setTimeout(resolve, ms);
    });

  const quickSort = async (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
    return arr;
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    setPivotIndex(high);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      setHighlightedIndices([j, high]);
      setComparisons(c => c + 1);
      await sleep(101 - speed);

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setSwaps(s => s + 1);
        setArray([...arr]);
        await sleep(101 - speed);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setSwaps(s => s + 1);
    setArray([...arr]);
    setPivotIndex(null);
    await sleep(101 - speed);

    return i + 1;
  };

  const mergeSort = async (arr, left = 0, right = arr.length - 1) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
    return arr;
  };

  const merge = async (arr, left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      setHighlightedIndices([k]);
      setComparisons(c => c + 1);
      await sleep(101 - speed);

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      setSwaps(s => s + 1);
      setArray([...arr]);
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      setArray([...arr]);
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      setArray([...arr]);
      j++;
      k++;
    }
  };

  const heapSort = async arr => {
    const n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setSwaps(s => s + 1);
      setArray([...arr]);
      await sleep(101 - speed);
      await heapify(arr, i, 0);
    }

    return arr;
  };

  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      setComparisons(c => c + 1);
      setHighlightedIndices([left, largest]);
      await sleep(101 - speed);
      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < n) {
      setComparisons(c => c + 1);
      setHighlightedIndices([right, largest]);
      await sleep(101 - speed);
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setSwaps(s => s + 1);
      setArray([...arr]);
      await sleep(101 - speed);
      await heapify(arr, n, largest);
    }
  };

  const bubbleSort = async arr => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setHighlightedIndices([j, j + 1]);
        setComparisons(c => c + 1);
        await sleep(101 - speed);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSwaps(s => s + 1);
          setArray([...arr]);
          await sleep(101 - speed);
        }
      }
    }
    return arr;
  };

  const startSort = async () => {
    setSorting(true);
    const arrCopy = [...array];

    switch (algorithm) {
      case 'quicksort':
        await quickSort(arrCopy);
        break;
      case 'mergesort':
        await mergeSort(arrCopy);
        break;
      case 'heapsort':
        await heapSort(arrCopy);
        break;
      case 'bubblesort':
        await bubbleSort(arrCopy);
        break;
    }

    setHighlightedIndices([]);
    setPivotIndex(null);
    setSorting(false);
  };

  const stopSort = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSorting(false);
    setHighlightedIndices([]);
    setPivotIndex(null);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-3 sm:p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-black bg-opacity-50 backdrop-blur-xl border border-blue-500 border-opacity-30 rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6'>
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6'>
            <Brain className='text-blue-400' size={32} />
            <div className='flex-1'>
              <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white'>
                Algorithm Visualizer
              </h1>
              <p className='text-gray-400 text-sm sm:text-base'>
                Visualize como algoritmos de ordenação funcionam em tempo real
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6'>
            {Object.entries(algorithms).map(([key, algo]) => (
              <button
                key={key}
                onClick={() => {
                  setAlgorithm(key);
                  generateArray();
                }}
                disabled={sorting}
                className={`p-3 sm:p-4 rounded-xl transition-all ${
                  algorithm === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-2 border-blue-400'
                    : 'bg-gray-800 border border-gray-700 hover:border-blue-500'
                } ${sorting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className='flex items-center gap-2 mb-2'>
                  <GitBranch className='text-blue-400' size={18} />
                  <h3 className='text-white font-bold text-sm sm:text-base'>
                    {algo.name}
                  </h3>
                </div>
                <p className='text-blue-400 text-xs sm:text-sm mb-1'>
                  {algo.complexity}
                </p>
                <p className='text-gray-400 text-xs hidden sm:block'>
                  {algo.description}
                </p>
              </button>
            ))}
          </div>

          <div className='flex flex-col gap-3 sm:gap-4'>
            <div className='flex flex-wrap gap-2 sm:gap-4'>
              <button
                onClick={sorting ? stopSort : startSort}
                disabled={array.length === 0}
                className='bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 transition-all shadow-lg disabled:opacity-50 text-sm sm:text-base'
              >
                {sorting ? <Pause size={18} /> : <Play size={18} />}
                {sorting ? 'Pausar' : 'Iniciar'}
              </button>

              <button
                onClick={() => generateArray(50)}
                disabled={sorting}
                className='bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg flex items-center gap-2 transition-all disabled:opacity-50 text-sm sm:text-base'
              >
                <RotateCcw size={18} />
                <span className='hidden sm:inline'>Novo Array</span>
                <span className='sm:hidden'>Novo</span>
              </button>
            </div>

            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <div className='flex items-center gap-2 sm:gap-3 bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex-1'>
                <Zap className='text-yellow-400 flex-shrink-0' size={18} />
                <span className='text-white font-semibold text-sm sm:text-base whitespace-nowrap'>
                  Velocidade:
                </span>
                <input
                  type='range'
                  min='1'
                  max='100'
                  value={speed}
                  onChange={e => setSpeed(Number(e.target.value))}
                  disabled={sorting}
                  className='flex-1 min-w-0'
                />
                <span className='text-blue-400 font-mono text-sm sm:text-base'>
                  {speed}%
                </span>
              </div>

              <div className='flex items-center gap-2 sm:gap-3 bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex-1'>
                <span className='text-white font-semibold text-sm sm:text-base whitespace-nowrap'>
                  Tamanho:
                </span>
                <input
                  type='range'
                  min='10'
                  max='100'
                  value={array.length}
                  onChange={e => generateArray(Number(e.target.value))}
                  disabled={sorting}
                  className='flex-1 min-w-0'
                />
                <span className='text-blue-400 font-mono text-sm sm:text-base'>
                  {array.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6'>
          <div className='bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-4 sm:p-6'>
            <p className='text-blue-200 text-xs sm:text-sm mb-1'>Comparações</p>
            <p className='text-white text-2xl sm:text-3xl md:text-4xl font-bold font-mono'>
              {comparisons.toLocaleString()}
            </p>
          </div>
          <div className='bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-4 sm:p-6'>
            <p className='text-purple-200 text-xs sm:text-sm mb-1'>Trocas</p>
            <p className='text-white text-2xl sm:text-3xl md:text-4xl font-bold font-mono'>
              {swaps.toLocaleString()}
            </p>
          </div>
          <div className='bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-4 sm:p-6'>
            <p className='text-green-200 text-xs sm:text-sm mb-1'>Elementos</p>
            <p className='text-white text-2xl sm:text-3xl md:text-4xl font-bold font-mono'>
              {array.length}
            </p>
          </div>
        </div>

        <div className='bg-black bg-opacity-50 backdrop-blur-xl border border-blue-500 border-opacity-30 rounded-2xl p-4 sm:p-8'>
          <div className='flex items-end justify-center gap-0.5 sm:gap-1 h-48 sm:h-64 md:h-96'>
            {array.map((value, idx) => (
              <div
                key={idx}
                className='transition-all duration-100 rounded-t'
                style={{
                  height: `${(value / 420) * 100}%`,
                  width: `${Math.max(100 / array.length, 2)}%`,
                  backgroundColor:
                    pivotIndex === idx
                      ? '#ef4444'
                      : highlightedIndices.includes(idx)
                        ? '#fbbf24'
                        : `hsl(${200 + (value / 420) * 160}, 70%, 50%)`,
                }}
              />
            ))}
          </div>

          <div className='flex flex-wrap justify-center gap-4 sm:gap-8 mt-4 sm:mt-6'>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded'></div>
              <span className='text-gray-300 text-xs sm:text-base'>Normal</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 sm:w-6 sm:h-6 bg-yellow-500 rounded'></div>
              <span className='text-gray-300 text-xs sm:text-base'>
                Comparando
              </span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 sm:w-6 sm:h-6 bg-red-500 rounded'></div>
              <span className='text-gray-300 text-xs sm:text-base'>Pivot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
