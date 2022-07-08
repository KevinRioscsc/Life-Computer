import { onstart } from "./Main.js";

export const findCoord = (e, grid, res) => {
  const x = e.offsetX;
  const y = e.offsetY;

  let i = Math.floor(x / res);
  let j = Math.floor(y / res);

  const rangeX = i * res;

  const rangeY = j * res;

  if (
    x >= rangeX &&
    x <= rangeX + res &&
    y >= rangeY &&
    y <= rangeY + res &&
    grid[i][j].state === 0
  ) {
    grid[i][j].state = 1;
    onstart();
  } else if (
    x >= rangeX &&
    x <= rangeX + res &&
    y >= rangeY &&
    y <= rangeY + res &&
    grid[i][j].state === 1
  ) {
    grid[i][j].state = 0;
    onstart();
  }
};
