import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Cpu, Pause, Sparkles } from 'lucide-react';

type AlgorithmType = 'bubble' | 'selection' | 'insertion';

interface AlgoInfo {
  name: string;
  bestTime: string;
  avgTime: string;
  worstTime: string;
  spaceComplexity: string;
  description: string;
}

const ALGO_METADATA: Record<AlgorithmType, AlgoInfo> = {
  bubble: {
    name: 'Bubble Sort',
    bestTime: 'O(N)',
    avgTime: 'O(N²)',
    worstTime: 'O(N²)',
    spaceComplexity: 'O(1)',
    description: 'Iteratively compares adjacent elements and swaps them if out of order, bubbling the largest unsorted element to the end.'
  },
  selection: {
    name: 'Selection Sort',
    bestTime: 'O(N²)',
    avgTime: 'O(N²)',
    worstTime: 'O(N²)',
    spaceComplexity: 'O(1)',
    description: 'Finds the minimum element from the unsorted sub-array and places it at the beginning, reducing comparisons in best/worst cases.'
  },
  insertion: {
    name: 'Insertion Sort',
    bestTime: 'O(N)',
    avgTime: 'O(N²)',
    worstTime: 'O(N²)',
    spaceComplexity: 'O(1)',
    description: 'Builds the sorted array one item at a time by inserting each new element into its proper position in the sorted prefix.'
  }
};

interface DsaVisualizerProps {
  isDark: boolean;
}

export const DsaVisualizer: React.FC<DsaVisualizerProps> = ({ isDark }) => {
  const [array, setArray] = useState<number[]>([]);
  const [activeAlgo, setActiveAlgo] = useState<AlgorithmType>('bubble');
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [comparisonsCount, setComparisonsCount] = useState<number>(0);
  const [swapsCount, setSwapsCount] = useState<number>(0);
  const [speedMs, setSpeedMs] = useState<number>(50);

  const isSortingRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(false);

  const ARRAY_SIZE = 18;

  const generateArray = () => {
    isSortingRef.current = false;
    isPausedRef.current = false;
    setIsSorting(false);
    setIsPaused(false);
    setComparing([]);
    setSwapping([]);
    setSortedIndices([]);
    setComparisonsCount(0);
    setSwapsCount(0);

    const newArr: number[] = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 15);
    }
    setArray(newArr);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const sleep = (ms: number) => {
    return new Promise<void>((resolve) => {
      const checkPause = () => {
        if (!isSortingRef.current) {
          resolve();
          return;
        }
        if (isPausedRef.current) {
          setTimeout(checkPause, 50);
        } else {
          setTimeout(resolve, ms);
        }
      };
      checkPause();
    });
  };

  const runBubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sorted: number[] = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSortingRef.current) return;

        setComparing([j, j + 1]);
        comparisons++;
        setComparisonsCount(comparisons);
        await sleep(speedMs);

        if (arr[j] > arr[j + 1]) {
          setSwapping([j, j + 1]);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swaps++;
          setSwapsCount(swaps);
          setArray([...arr]);
          await sleep(speedMs);
        }
        setSwapping([]);
      }
      sorted.push(n - i - 1);
      setSortedIndices([...sorted]);
    }
    setComparing([]);
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setIsSorting(false);
    isSortingRef.current = false;
  };

  const runSelectionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sorted: number[] = [];

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (!isSortingRef.current) return;

        setComparing([minIdx, j]);
        comparisons++;
        setComparisonsCount(comparisons);
        await sleep(speedMs);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        setSwapping([i, minIdx]);
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        swaps++;
        setSwapsCount(swaps);
        setArray([...arr]);
        await sleep(speedMs);
      }
      setSwapping([]);
      sorted.push(i);
      setSortedIndices([...sorted]);
    }
    setComparing([]);
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setIsSorting(false);
    isSortingRef.current = false;
  };

  const runInsertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    const sorted: number[] = [0];
    setSortedIndices([...sorted]);

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      while (j >= 0) {
        if (!isSortingRef.current) return;
        setComparing([j, j + 1]);
        comparisons++;
        setComparisonsCount(comparisons);
        await sleep(speedMs);

        if (arr[j] > key) {
          setSwapping([j, j + 1]);
          arr[j + 1] = arr[j];
          swaps++;
          setSwapsCount(swaps);
          setArray([...arr]);
          await sleep(speedMs);
          j = j - 1;
        } else {
          break;
        }
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setSwapping([]);
      sorted.push(i);
      setSortedIndices([...sorted]);
    }
    setComparing([]);
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setIsSorting(false);
    isSortingRef.current = false;
  };

  const startSort = () => {
    if (isSorting) return;
    setIsSorting(true);
    isSortingRef.current = true;
    setIsPaused(false);
    isPausedRef.current = false;

    if (activeAlgo === 'bubble') runBubbleSort();
    else if (activeAlgo === 'selection') runSelectionSort();
    else if (activeAlgo === 'insertion') runInsertionSort();
  };

  const togglePause = () => {
    const newPaused = !isPaused;
    setIsPaused(newPaused);
    isPausedRef.current = newPaused;
  };

  const currentMeta = ALGO_METADATA[activeAlgo];

  return (
    <section id="dsa-lab" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Core CS & Algorithms Lab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Algorithmic Logic & Data Structures Visualizer
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Interactive benchmark built with Java/JavaScript core logic, demonstrating array traversal, element swapping, and time complexity bounds.
          </p>
        </div>

        {/* Visualizer Shell */}
        <div className={`p-6 rounded-2xl border ${
          isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          {/* Top Controls: Algorithm Picker & Speed */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-800/40">
            {/* Algo Selector Buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-neutral-950/40 dark:bg-neutral-950/60 border border-neutral-800/60">
              {(['bubble', 'selection', 'insertion'] as AlgorithmType[]).map((algo) => (
                <button
                  key={algo}
                  disabled={isSorting}
                  onClick={() => {
                    setActiveAlgo(algo);
                    generateArray();
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    activeAlgo === algo
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  } ${isSorting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {ALGO_METADATA[algo].name}
                </button>
              ))}
            </div>

            {/* Actions: Start, Pause, Reset, Speed */}
            <div className="flex items-center flex-wrap gap-2.5">
              <button
                onClick={generateArray}
                disabled={isSorting && !isPaused}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isDark
                    ? 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white'
                    : 'border-neutral-300 bg-neutral-100 text-neutral-700 hover:text-neutral-900'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Array</span>
              </button>

              {isSorting && (
                <button
                  onClick={togglePause}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-600 hover:bg-amber-500 text-white transition-colors"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
              )}

              <button
                onClick={startSort}
                disabled={isSorting}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white shadow-sm transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isSorting ? 'Sorting in Progress...' : 'Run Sort'}</span>
              </button>

              {/* Speed toggle */}
              <div className="flex items-center gap-1 pl-2 text-xs text-neutral-400">
                <span>Speed:</span>
                <select
                  value={speedMs}
                  disabled={isSorting}
                  onChange={(e) => setSpeedMs(Number(e.target.value))}
                  className={`px-2 py-1 rounded text-xs border ${
                    isDark ? 'bg-neutral-900 border-neutral-700 text-neutral-200' : 'bg-neutral-50 border-neutral-300 text-neutral-800'
                  }`}
                >
                  <option value={100}>Slow (100ms)</option>
                  <option value={40}>Normal (40ms)</option>
                  <option value={15}>Fast (15ms)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization Canvas */}
          <div className="py-6">
            <div className={`h-64 sm:h-72 w-full flex items-end justify-between gap-1 sm:gap-2 px-3 pt-6 pb-2 rounded-xl border ${
              isDark ? 'bg-neutral-950/70 border-neutral-800/80' : 'bg-neutral-50 border-neutral-200'
            }`}>
              {array.map((val, idx) => {
                const isComparing = comparing.includes(idx);
                const isSwapping = swapping.includes(idx);
                const isSorted = sortedIndices.includes(idx);

                let barColor = isDark ? 'bg-neutral-700' : 'bg-neutral-300';
                if (isSorted) barColor = 'bg-emerald-500';
                if (isComparing) barColor = 'bg-amber-400';
                if (isSwapping) barColor = 'bg-cyan-400';

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                    {/* Tooltip value */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 text-[10px] font-mono text-neutral-300">
                      {val}
                    </div>
                    <div
                      style={{ height: `${val}%` }}
                      className={`w-full rounded-t-sm transition-all duration-75 ${barColor}`}
                    />
                    <div className="text-[10px] font-mono text-neutral-500 mt-1.5 hidden sm:block">
                      {val}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 text-xs text-neutral-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-neutral-600 dark:bg-neutral-700 inline-block" />
                  <span>Unsorted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" />
                  <span>Comparing Elements</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block" />
                  <span>Swapping / Moving</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                  <span>Sorted In-Place</span>
                </div>
              </div>

              {/* Counters */}
              <div className="flex items-center gap-4 font-mono text-xs">
                <span>Comparisons: <strong className="text-neutral-800 dark:text-neutral-200">{comparisonsCount}</strong></span>
                <span>Swaps: <strong className="text-neutral-800 dark:text-neutral-200">{swapsCount}</strong></span>
              </div>
            </div>
          </div>

          {/* Complexity & Analysis Card */}
          <div className={`p-4 rounded-xl border grid grid-cols-1 md:grid-cols-12 gap-4 items-center ${
            isDark ? 'bg-neutral-950/50 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
          }`}>
            <div className="md:col-span-7">
              <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                Algorithm Breakdown · {currentMeta.name}
              </div>
              <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 mt-1">
                {currentMeta.description}
              </p>
            </div>

            <div className="md:col-span-5 grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <div className="text-[10px] text-neutral-500 uppercase">Best</div>
                <div className="text-xs font-mono font-bold text-neutral-200">{currentMeta.bestTime}</div>
              </div>
              <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <div className="text-[10px] text-neutral-500 uppercase">Average</div>
                <div className="text-xs font-mono font-bold text-neutral-200">{currentMeta.avgTime}</div>
              </div>
              <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <div className="text-[10px] text-neutral-500 uppercase">Worst</div>
                <div className="text-xs font-mono font-bold text-neutral-200">{currentMeta.worstTime}</div>
              </div>
              <div className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                <div className="text-[10px] text-neutral-500 uppercase">Space</div>
                <div className="text-xs font-mono font-bold text-emerald-400">{currentMeta.spaceComplexity}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
