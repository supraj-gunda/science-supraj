/*
  Conway's Game of Life simulation used at the top of index.html.

  EASY THINGS TO CUSTOMIZE
  - Initial/random cell density: randomize(density = 0.19)
  - Simulation speed: the 120 ms threshold inside animationLoop()
  - Cell/grid colors: ctx.fillStyle and ctx.strokeStyle inside draw()
  - Preset Pattern button options: add/edit objects in the patterns array
  - Approximate grid density on different screen sizes: targetCell inside fitCanvas()

  The grid wraps at the edges (toroidal topology), so cells on the left can interact
  with cells on the right, and cells at the top can interact with cells at the bottom.
*/
(() => {
  const canvas = document.getElementById('life-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const toggleButton = document.querySelector('[data-life-toggle]');
  const randomButton = document.querySelector('[data-life-random]');
  const clearButton = document.querySelector('[data-life-clear]');
  const patternButton = document.querySelector('[data-life-pattern]');
  // Optional status hooks. They are harmless if the matching elements are not present in index.html.
  const generationNode = document.querySelector('[data-life-generation]');
  const statusNode = document.querySelector('[data-life-status]');

  // Starting dimensions are immediately recalculated to fit the canvas.
  let cols = 42;
  let rows = 34;
  let grid = [];
  let running = true;
  let generation = 0;
  let lastStep = 0;
  let drawing = false;
  let drawingValue = 1;
  let resizeTimer;

  // Presets shown one-at-a-time when the visitor presses the Pattern button.
  // Add another { name, cells: [[x, y], ...] } object here to extend the cycle.
  const patterns = [
    {
      name: 'glider',
      cells: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]
    },
    {
      name: 'pulsar seed',
      cells: [[0, 0], [1, 0], [2, 0], [4, 0], [0, 1], [3, 2], [4, 2], [1, 3], [2, 3], [4, 3], [0, 4], [2, 4], [4, 4]]
    },
    {
      name: 'acorn',
      cells: [[1, 0], [3, 1], [0, 2], [1, 2], [4, 2], [5, 2], [6, 2]]
    }
  ];
  let patternIndex = 0;

  function emptyGrid() {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  // density is the probability that each cell starts alive. 0.19 = 19%.
  function randomize(density = 0.19) {
    grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (Math.random() < density ? 1 : 0))
    );
    generation = 0;
    draw();
  }

  // Count the eight neighboring cells. Modulo arithmetic makes the board wrap at edges.
  function countNeighbors(x, y) {
    let count = 0;
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        if (dx === 0 && dy === 0) continue;
        const nx = (x + dx + cols) % cols;
        const ny = (y + dy + rows) % rows;
        count += grid[ny][nx];
      }
    }
    return count;
  }

  // Apply Conway's rules once: survive with 2–3 neighbors; birth with exactly 3.
  function step() {
    const next = emptyGrid();
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const neighbors = countNeighbors(x, y);
        next[y][x] = grid[y][x]
          ? Number(neighbors === 2 || neighbors === 3)
          : Number(neighbors === 3);
      }
    }
    grid = next;
    generation += 1;
  }

  // Match the canvas's pixel resolution and logical grid size to its responsive CSS size.
  function fitCanvas() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Smaller targetCell values create more, smaller cells.
    const targetCell = rect.width < 480 ? 11 : 13;
    const nextCols = Math.max(24, Math.floor(rect.width / targetCell));
    const nextRows = Math.max(20, Math.floor(rect.height / targetCell));
    if (nextCols !== cols || nextRows !== rows) {
      const old = grid;
      const oldRows = rows;
      const oldCols = cols;
      cols = nextCols;
      rows = nextRows;
      grid = emptyGrid();
      const xOffset = Math.floor((cols - oldCols) / 2);
      const yOffset = Math.floor((rows - oldRows) / 2);
      for (let y = 0; y < oldRows; y += 1) {
        for (let x = 0; x < oldCols; x += 1) {
          const nx = x + xOffset;
          const ny = y + yOffset;
          if (old[y]?.[x] && nx >= 0 && nx < cols && ny >= 0 && ny < rows) grid[ny][nx] = 1;
        }
      }
    }
    draw();
  }

  // Draw the dark background, faint grid lines, then each living lime-green cell.
  function draw() {
    const rect = canvas.getBoundingClientRect();
    const cellW = rect.width / cols;
    const cellH = rect.height / rows;

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = '#171915';
    ctx.fillRect(0, 0, rect.width, rect.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.055)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 1; x < cols; x += 1) {
      const px = Math.round(x * cellW) + 0.5;
      ctx.moveTo(px, 0);
      ctx.lineTo(px, rect.height);
    }
    for (let y = 1; y < rows; y += 1) {
      const py = Math.round(y * cellH) + 0.5;
      ctx.moveTo(0, py);
      ctx.lineTo(rect.width, py);
    }
    ctx.stroke();

    ctx.fillStyle = '#b6e53b';
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        if (!grid[y][x]) continue;
        const inset = Math.max(1, Math.min(cellW, cellH) * 0.12);
        ctx.fillRect(
          x * cellW + inset,
          y * cellH + inset,
          Math.max(1, cellW - inset * 2),
          Math.max(1, cellH - inset * 2)
        );
      }
    }

    if (generationNode) generationNode.textContent = String(generation).padStart(4, '0');
  }

  function animationLoop(timestamp) {
    // 120 ms ≈ 8 simulation generations per second. Increase this number to slow it down.
    if (running && timestamp - lastStep > 120) {
      step();
      draw();
      lastStep = timestamp;
    }
    requestAnimationFrame(animationLoop);
  }

  function updateStatus() {
    if (toggleButton) toggleButton.textContent = running ? 'Pause' : 'Run';
    if (statusNode) statusNode.textContent = running ? 'evolving' : 'paused';
  }

  function cellFromEvent(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.min(cols - 1, Math.max(0, Math.floor(((event.clientX - rect.left) / rect.width) * cols))),
      y: Math.min(rows - 1, Math.max(0, Math.floor(((event.clientY - rect.top) / rect.height) * rows)))
    };
  }

  function paint(event) {
    const { x, y } = cellFromEvent(event);
    grid[y][x] = drawingValue;
    draw();
  }

  // Clear the board and center the next preset from the patterns array.
  function loadPattern() {
    grid = emptyGrid();
    const pattern = patterns[patternIndex % patterns.length];
    const offsetX = Math.floor(cols / 2 - 3);
    const offsetY = Math.floor(rows / 2 - 2);
    pattern.cells.forEach(([x, y]) => {
      if (grid[offsetY + y]?.[offsetX + x] !== undefined) grid[offsetY + y][offsetX + x] = 1;
    });
    patternIndex += 1;
    generation = 0;
    if (patternButton) patternButton.textContent = pattern.name;
    draw();
  }

  toggleButton?.addEventListener('click', () => {
    running = !running;
    updateStatus();
  });
  randomButton?.addEventListener('click', () => randomize());
  clearButton?.addEventListener('click', () => {
    grid = emptyGrid();
    generation = 0;
    running = false;
    updateStatus();
    draw();
  });
  patternButton?.addEventListener('click', loadPattern);

  // Pointer drawing works for mouse, pen, and touch. Clicking a live cell begins erasing;
  // clicking a dead cell begins drawing, and dragging keeps that same paint mode.
  canvas.addEventListener('pointerdown', (event) => {
    drawing = true;
    canvas.setPointerCapture(event.pointerId);
    const { x, y } = cellFromEvent(event);
    drawingValue = grid[y][x] ? 0 : 1;
    paint(event);
  });
  canvas.addEventListener('pointermove', (event) => {
    if (drawing) paint(event);
  });
  canvas.addEventListener('pointerup', () => { drawing = false; });
  canvas.addEventListener('pointercancel', () => { drawing = false; });

  // Debounce resize work so the grid is not rebuilt on every single resize event.
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(fitCanvas, 120);
  });

  // Initial state: fit the board, seed it randomly, and start animating.
  grid = emptyGrid();
  fitCanvas();
  randomize();
  updateStatus();
  requestAnimationFrame(animationLoop);
})();
