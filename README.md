# Algorithm Visualizer

An interactive web app for visualizing sorting algorithms in real time. Watch how Quick Sort, Merge Sort, Heap Sort, and Bubble Sort work step by step — with live comparison and swap counters, adjustable speed, and dynamic array sizing.

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-teal)

## Features

- **4 sorting algorithms** — Quick Sort, Merge Sort, Heap Sort, and Bubble Sort
- **Real-time visualization** — bars animate as elements are compared and swapped
- **Live metrics** — comparisons and swaps update on every operation
- **Adjustable speed** — slide from slow-motion to near-instant
- **Dynamic array size** — 10 to 100 elements
- **Color coding** — blue for unsorted, yellow for comparing, red for pivot
- **Pause / resume** — stop mid-sort and continue
- **Dark UI** with glass-morphism styling

## Algorithms

| Algorithm   | Time Complexity | Strategy                          |
|-------------|-----------------|-----------------------------------|
| Quick Sort  | O(n log n) avg  | Divide and conquer via pivot      |
| Merge Sort  | O(n log n)      | Recursive divide then merge       |
| Heap Sort   | O(n log n)      | Max-heap build then extract       |
| Bubble Sort | O(n²)           | Repeated adjacent comparisons     |

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Usage

1. Select an algorithm from the cards at the top
2. Adjust array size and speed with the sliders
3. Press **Play** to start the visualization
4. Press **Pause** to pause mid-sort, or **Reset** to generate a new random array
5. Watch the comparisons and swaps counters to compare algorithm efficiency

## Tech Stack

- [React 19](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — build tool with HMR
- [Tailwind CSS 4](https://tailwindcss.com/) — utility-first styling
- [Lucide React](https://lucide.dev/) — icons

## Project Structure

```
src/
└── App.jsx      # Main component — all UI and algorithm logic
```

All four sorting algorithms use `async/await` with configurable delays so each operation is visible as it executes.
