import { useState, useEffect, useRef } from 'react';
import { BarChart2 } from 'lucide-react';
import AlgorithmCard from './components/AlgorithmCard';
import ControlPanel from './components/ControlPanel';
import StatCard from './components/StatCard';
import Visualizer from './components/Visualizer';

const ALGORITHMS = {
  quicksort: {
    name: 'Quick Sort',
    complexity: 'O(n log n)',
    description: 'Divide and conquer via pivot',
  },
  mergesort: {
    name: 'Merge Sort',
    complexity: 'O(n log n)',
    description: 'Recursively divide then merge',
  },
  heapsort: {
    name: 'Heap Sort',
    complexity: 'O(n log n)',
    description: 'Binary heap structure',
  },
  bubblesort: {
    name: 'Bubble Sort',
    complexity: 'O(n²)',
    description: 'Compare adjacent pairs',
  },
};

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

  useEffect(() => {
    generateArray();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const generateArray = (size = 50) => {
    setArray(Array.from({ length: size }, () => Math.floor(Math.random() * 400) + 20));
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

  const delay = () => sleep(101 - speed);

  // --- Quick Sort ---
  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    setPivotIndex(high);
    let i = low - 1;
    for (let j = low; j < high; j++) {
      setHighlightedIndices([j, high]);
      setComparisons(c => c + 1);
      await delay();
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setSwaps(s => s + 1);
        setArray([...arr]);
        await delay();
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setSwaps(s => s + 1);
    setArray([...arr]);
    setPivotIndex(null);
    await delay();
    return i + 1;
  };

  const quickSort = async (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
      const pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  };

  // --- Merge Sort ---
  const merge = async (arr, left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArr.length && j < rightArr.length) {
      setHighlightedIndices([k]);
      setComparisons(c => c + 1);
      await delay();
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i++];
      } else {
        arr[k] = rightArr[j++];
      }
      setSwaps(s => s + 1);
      setArray([...arr]);
      k++;
    }
    while (i < leftArr.length) { arr[k++] = leftArr[i++]; setArray([...arr]); }
    while (j < rightArr.length) { arr[k++] = rightArr[j++]; setArray([...arr]); }
  };

  const mergeSort = async (arr, left = 0, right = arr.length - 1) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSort(arr, left, mid);
      await mergeSort(arr, mid + 1, right);
      await merge(arr, left, mid, right);
    }
  };

  // --- Heap Sort ---
  const heapify = async (arr, n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n) {
      setComparisons(c => c + 1);
      setHighlightedIndices([left, largest]);
      await delay();
      if (arr[left] > arr[largest]) largest = left;
    }
    if (right < n) {
      setComparisons(c => c + 1);
      setHighlightedIndices([right, largest]);
      await delay();
      if (arr[right] > arr[largest]) largest = right;
    }
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setSwaps(s => s + 1);
      setArray([...arr]);
      await delay();
      await heapify(arr, n, largest);
    }
  };

  const heapSort = async arr => {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setSwaps(s => s + 1);
      setArray([...arr]);
      await delay();
      await heapify(arr, i, 0);
    }
  };

  // --- Bubble Sort ---
  const bubbleSort = async arr => {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setHighlightedIndices([j, j + 1]);
        setComparisons(c => c + 1);
        await delay();
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setSwaps(s => s + 1);
          setArray([...arr]);
          await delay();
        }
      }
    }
  };

  const startSort = async () => {
    setSorting(true);
    const arrCopy = [...array];
    switch (algorithm) {
      case 'quicksort': await quickSort(arrCopy); break;
      case 'mergesort': await mergeSort(arrCopy); break;
      case 'heapsort':  await heapSort(arrCopy);  break;
      case 'bubblesort': await bubbleSort(arrCopy); break;
    }
    setHighlightedIndices([]);
    setPivotIndex(null);
    setSorting(false);
  };

  const stopSort = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSorting(false);
    setHighlightedIndices([]);
    setPivotIndex(null);
  };

  const handleAlgorithmSelect = id => {
    setAlgorithm(id);
    generateArray();
  };

  return (
    <div className='min-h-screen bg-zinc-950 p-3 sm:p-6'>
      <div className='max-w-7xl mx-auto space-y-4 sm:space-y-6'>

        {/* Header + controls */}
        <div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-8'>
          <div className='flex items-center gap-3 mb-5 sm:mb-6'>
            <BarChart2 className='text-zinc-400 flex-shrink-0' size={28} />
            <div>
              <h1 className='text-2xl sm:text-3xl font-bold text-zinc-100'>
                Algorithm Visualizer
              </h1>
              <p className='text-zinc-500 text-sm'>
                Watch sorting algorithms run step by step
              </p>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5 sm:mb-6'>
            {Object.entries(ALGORITHMS).map(([key, algo]) => (
              <AlgorithmCard
                key={key}
                id={key}
                algo={algo}
                selected={algorithm === key}
                disabled={sorting}
                onSelect={handleAlgorithmSelect}
              />
            ))}
          </div>

          <ControlPanel
            sorting={sorting}
            arrayLength={array.length}
            speed={speed}
            onToggle={sorting ? stopSort : startSort}
            onReset={() => generateArray(array.length)}
            onSpeedChange={setSpeed}
            onSizeChange={generateArray}
          />
        </div>

        {/* Stats */}
        <div className='grid grid-cols-3 gap-3 sm:gap-4'>
          <StatCard label='Comparisons' value={comparisons} />
          <StatCard label='Swaps' value={swaps} />
          <StatCard label='Elements' value={array.length} />
        </div>

        {/* Visualizer */}
        <Visualizer
          array={array}
          highlightedIndices={highlightedIndices}
          pivotIndex={pivotIndex}
        />

      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
