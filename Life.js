const canvas = document.querySelector("canvas");
const pauseBtn = document.querySelector(".pause");

const width = 1900;
const height = window.innerHeight;
console.log(Math.round(window.innerWidth));

canvas.width = width;
canvas.height = height;

canvas.style.border = "1px solid black";

const ctx = canvas.getContext("2d");

const res = 20;

let stopped = false;

const gridHeight = height / res;
const gridWidth = width / res;

const findCoord = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  console.log(x, y);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < row; j++) {
      let xCoord = i * res;
      let yCoord = j * res;

      if (
        x >= grid[i][j].x &&
        x <= grid[i][j].x + res &&
        y >= grid[i][j].y &&
        y <= grid[i][j].y + res &&
        grid[i][j].state === 0
      ) {
        grid[i][j] = {
          state: 1,
          x: x,
          y: y,
        };
        ctx.fillStyle = "#43B0F1";
        ctx.fillRect(xCoord, yCoord, res, res);
      }
    }
  }
};

canvas.addEventListener("click", (e) => findCoord(e));

const create2D = (cols, row) => {
  let cellY = new Array(cols);

  for (let i = 0; i < cellY.length; i++) {
    cellY[i] = new Array(row);
  }

  return cellY;
};

const cols = width / res;
const row = height / res;

let grid = create2D(cols, row);

const randomize = () => {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < row; j++) {
      let x = i * res;
      let y = j * res;
      grid[i][j] = {
        state: Math.floor(Math.random() * 2),
        x: x,
        y: y,
      };

      ctx.strokeRect(x, y, res, res);

      if (grid[i][j].state === 1) {
        ctx.fillRect(x, y, res, res);
      }
    }
  }
};

const countNeighbors = (cell, x, y) => {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let rows = (y + j + row) % row;
      if (grid[col][rows].state === 1) {
        sum += 1;
      }
    }
  }

  sum -= cell.state;

  return sum;
};

const onstart = () => {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < row; j++) {
      let x = i * res;
      let y = j * res;

      grid[i][j] = {
        state: 0,
        x: x,
        y: y,
      };

      if (grid[i][j].state === 0) {
        ctx.fillStyle = "#1E3D58";
        ctx.fillRect(x, y, res, res);
      }
      ctx.strokeStyle = "#E8EEF1";
      ctx.strokeRect(x, y, res, res);
    }
  }
};

const setup = () => {
  let next = create2D(cols, row);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < row; j++) {
      let x = i * res;
      let y = j * res;

      if (grid[i][j].state === 1) {
        ctx.fillStyle = "#43B0F1";
        ctx.fillRect(x, y, res, res);
      } else {
        ctx.clearRect(x, y, res, res);
        ctx.fillStyle = "#1E3D58";
        ctx.fillRect(x, y, res, res);
        ctx.strokeStyle = "#E8EEF1";
        ctx.strokeRect(x, y, res, res);
      }
    }
  }
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < row; j++) {
      let currentState = grid[i][j];
      let totalNeighbors = countNeighbors(grid[i][j], i, j);

      if (grid[i][j].state === 0 && totalNeighbors === 3) {
        next[i][j] = {
          ...currentState,
          state: 1,
        };
      } else if (
        grid[i][j].state === 1 &&
        (totalNeighbors < 2 || totalNeighbors > 3)
      ) {
        next[i][j] = {
          ...currentState,
          state: 0,
        };
      } else {
        next[i][j] = { ...currentState };
      }
      //count the neighbors
    }
  }
  grid = next;
};
const pause = () => {
  stopped = !stopped;
  if (stopped) {
    pauseBtn.innerHTML = "Resume";
  }

  if (!stopped) {
    draw();
    pauseBtn.innerHTML = "Pause";
  }
};

const draw = () => {
  setup();
  if (!stopped) {
    setTimeout(() => {
      requestAnimationFrame(draw);
    }, 300);
  }
};

onstart();
