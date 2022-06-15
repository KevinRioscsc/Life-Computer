const countNeighbors = (grid, cell, x, y) => {
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

export const setup = (grid, ctx) => {
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
      let totalNeighbors = countNeighbors(grid, grid[i][j], i, j);

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
