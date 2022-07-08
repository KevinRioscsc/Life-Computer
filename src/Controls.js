import { onstart } from "./Main.js";

export const reset = (grid, stopped, cols, row, random) => {
  stopped = true;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < row; j++) {
      grid[i][j].state = 0;
    }
  }
  random.disabled = false;
  onstart();
  return stopped;
};

export const pause = (stopped, pauseBtn) => {
  stopped = !stopped;
  if (stopped) {
    pauseBtn.innerHTML = "Resume";
  }
  pauseBtn.ariaDisable = true;
  if (!stopped) {
    pauseBtn.innerHTML = "Pause";
  }
  return stopped;
};

export const start = (stopped) => {
  stopped = false;

  return stopped;
};

export const randomize = (grid, COLS, ROWS, RES, CTX) => {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      let x = i * RES;
      let y = j * RES;
      grid[i][j] = {
        state: Math.floor(Math.random() * 2),
        x: x,
        y: y,
      };

      if (grid[i][j].state === 1) {
        CTX.fillStyle = "#CC8899";
        CTX.fillRect(x, y, RES, RES);
      }
    }
  }
};
