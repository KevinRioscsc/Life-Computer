import HashLife from "./Cell.js";
const canvas = document.querySelector("canvas");
const pauseBtn = document.querySelector(".pause");
const checkbox = document.querySelector(".checkbox");
const startBtn = document.getElementById("start");

document.getElementById("pause").disabled = true;

const width = 320;
const height = 320;

canvas.width = width;
canvas.height = height;

canvas.style.border = "1px solid black";

const ctx = canvas.getContext("2d");

const res = 20;

let stopped = false;

const gridHeight = height / res;
const gridWidth = width / res;

const create2D = (cols, row) => {
  let cellY = new Array(cols);

  for (let i = 0; i < cellY.length; i++) {
    cellY[i] = new Array(row);
  }

  return cellY;
};

const cols = width / res;
const row = height / res;

export let grid = create2D(cols, row);

const fillGrid = () => {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < row; j++) {
      let x = i * res;
      let y = j * res;

      grid[i][j] = {
        state: 0,
        x: x,
        y: y,
      };
    }
  }
};
fillGrid();

/*Gonna do Draggable here */
const draggable = document.querySelectorAll(".draggable");
const shapeConfig = [
  {
    name: "default",
  },
  {
    name: "reverse",
  },
  {
    name: "side",
  },
  {
    name: "side-reverse",
  },
];
const shapes = [
  /*Slider */
  {
    name: "glider",
    status: [
      { x: 0, y: 0, state: 1 },
      { x: -1, y: -1, state: 1 },
      { x: -2, y: -1, state: 1 },
      { x: -2, y: 0, state: 1 },
      { x: -2, y: 1, state: 1 },
    ],
  },
  {
    name: "slider-2",
    status: [
      { x: 0, y: 0, state: 1 },
      { x: 1, y: 1, state: 1 },
      { x: 2, y: 1, state: 1 },
      { x: 2, y: 0, state: 1 },
      { x: 2, y: -1, state: 1 },
    ],
  },
  {
    name: "slider-3",
    status: [
      { x: 0, y: 0, state: 1 },
      { x: 1, y: 1, state: 1 },
      { x: 1, y: 2, state: 1 },
      { x: 0, y: 2, state: 1 },
      { x: -1, y: 2, state: 1 },
    ],
  },
  {
    name: "slider-4",
    status: [
      { x: 0, y: 0, state: 1 },
      { x: -1, y: -1, state: 1 },
      { x: -1, y: -2, state: 1 },
      { x: 0, y: -2, state: 1 },
      { x: 1, y: -2, state: 1 },
    ],
  },
  {
    name: "glider-gun",
    status: [
      { x: 0, y: 0, state: 1 },
      { x: 1, y: 0, state: 1 },
      { x: 0, y: -1, state: 1 },
      { x: 1, y: -1, state: 1 },
      { x: 10, y: 0, state: 1 },
      { x: 10, y: 1, state: 1 },
      { x: 10, y: -1, state: 1 },
      { x: 11, y: -2, state: 1 },
      { x: 11, y: 2, state: 1 },
      { x: 12, y: -3, state: 1 },
      { x: 12, y: 3, state: 1 },
      { x: 13, y: -3, state: 1 },
      { x: 13, y: 3, state: 1 },
      { x: 14, y: 0, state: 1 },
      { x: 15, y: -2, state: 1 },
      { x: 15, y: 2, state: 1 },
      { x: 16, y: -1, state: 1 },
      { x: 16, y: 1, state: 1 },
      { x: 16, y: 0, state: 1 },
      { x: 17, y: 0, state: 1 },
      { x: 20, y: -1, state: 1 },
      { x: 20, y: -2, state: 1 },
      { x: 20, y: -3, state: 1 },
      { x: 21, y: -1, state: 1 },
      { x: 21, y: -2, state: 1 },
      { x: 21, y: -3, state: 1 },
      { x: 22, y: -4, state: 1 },
      { x: 22, y: 0, state: 1 },
      { x: 24, y: -4, state: 1 },
      { x: 24, y: -5, state: 1 },
      { x: 24, y: 0, state: 1 },
      { x: 24, y: 1, state: 1 },
      { x: 34, y: -3, state: 1 },
      { x: 34, y: -2, state: 1 },
      { x: 35, y: -3, state: 1 },
      { x: 35, y: -2, state: 1 },
    ],
  },
];
let prev;
let prevCord = { x: 10, y: 10 };
let prevPosition;
let shapeSwitch = "default";
let index_of_shape = 0;
let isShift = false;
let current;
let itFit;

draggable.forEach((draggables) => {
  draggables.addEventListener("dragstart", () => {
    checkbox.checked = false;

    draggables.classList.add("dragging");
  });
  draggables.addEventListener("dragend", () => {
    draggables.classList.remove("dragging");

    if (itFit) {
      console.log(shapeSwitch);
      console.log(prevPosition);
      prevPosition.forEach((item) => {
        grid[prevCord.x + item.x][prevCord.y + item.y] = {
          ...grid[prevCord.x][prevCord.y],
          state: item.state,
        };
      });
      onstart();
    }
    onstart();
  });
});

canvas.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (!e.shiftKey) {
    isShift = false;
  }

  /*Get current shape and give it the default shape */
  const currentShape = document.querySelector(".dragging");

  let shapeCoord;
  shapes.forEach((item) => {
    if (item.name === currentShape.id) {
      shapeCoord = item.status;
      current = item.status;
    }
  });
  /*===================================================== */

  const findShape = shapeConfig.find((item) => item.name === shapeSwitch);

  shapeCoord = changeShape(shapeCoord, findShape.name);

  /* Highlight area that shape is hovering */
  const x = e.offsetX;
  const y = e.offsetY;

  const foundCell = findCell(x, y);
  const currentCell = grid[foundCell.x][foundCell.y];

  itFit = canFit(foundCell, shapeCoord);

  drawCell(shapeCoord, foundCell.x, foundCell.y, itFit);

  if (currentCell !== prev) {
    shapeCoord.forEach((item) => {
      if (prevCord.x + item.x >= 0 && prevCord.y + item.y >= 0) {
        ctx.clearRect(
          grid[prevCord.x + item.x][prevCord.y + item.y].x,
          grid[prevCord.x + item.x][prevCord.y + item.y].y,
          res,
          res
        );
        ctx.fillStyle = "#1E3D58";
        ctx.fillRect(
          grid[prevCord.x + item.x][prevCord.y + item.y].x,
          grid[prevCord.x + item.x][prevCord.y + item.y].y,
          res,
          res
        );
        ctx.strokeStyle = "#E8EEF1";
        ctx.strokeRect(
          grid[prevCord.x + item.x][prevCord.y + item.y].x,
          grid[prevCord.x + item.x][prevCord.y + item.y].y,
          res,
          res
        );
      }
    });
    prev = currentCell;
    prevCord = foundCell;
    prevPosition = shapeCoord;
  }
  /*===================================================== */
  if (e.shiftKey && !isShift) {
    prevPosition = shapeCoord;

    shapeSwitch = changeShapeName();

    clearShape();
    isShift = true;
    prevPosition = changeShape(current, shapeSwitch);
  }
});

const clearShape = () => {
  prevPosition.forEach((item) => {
    ctx.clearRect(
      grid[prevCord.x + item.x][prevCord.y + item.y].x,
      grid[prevCord.x + item.x][prevCord.y + item.y].y,
      res,
      res
    );
    ctx.fillStyle = "#1E3D58";
    ctx.fillRect(
      grid[prevCord.x + item.x][prevCord.y + item.y].x,
      grid[prevCord.x + item.x][prevCord.y + item.y].y,
      res,
      res
    );
    ctx.strokeStyle = "#E8EEF1";
    ctx.strokeRect(
      grid[prevCord.x + item.x][prevCord.y + item.y].x,
      grid[prevCord.x + item.x][prevCord.y + item.y].y,
      res,
      res
    );
  });
};

const changeShapeName = () => {
  let currentConfig;
  if (index_of_shape === shapeConfig.length - 1) {
    index_of_shape = 0;
    currentConfig = shapeConfig[index_of_shape];
  } else {
    index_of_shape += 1;
    currentConfig = shapeConfig[index_of_shape];
  }

  return currentConfig.name;
};

const canFit = (foundCell, shapeCoord) => {
  let inBounds = true;
  shapeCoord.forEach((item) => {
    if (foundCell.x + item.x < 0 || foundCell.y + item.y < 0) {
      inBounds = false;
    }
  });

  return inBounds;
};

const changeShape = (arr, name) => {
  if (name === "reverse") {
    const arrCopy = arr.map((item) => {
      return (item = {
        x: item.x * -1,
        y: item.y * -1,
        state: 1,
      });
    });

    return arrCopy;
  } else if (name === "side") {
    const arrCopy = arr.map((item) => {
      return (item = {
        x: item.y,
        y: item.x,
        state: 1,
      });
    });

    return arrCopy;
  } else if (name === "side-reverse") {
    const arrCopy = arr.map((item) => {
      return (item = {
        x: item.y * -1,
        y: item.x * -1,
        state: 1,
      });
    });

    return arrCopy;
  }

  return arr;
};

const drawCell = (shapeCoord, i, j, itFit) => {
  shapeCoord.forEach((item) => {
    if (itFit) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.49)";
      ctx.fillRect(
        grid[i + item.x][j + item.y].x,
        grid[i + item.x][j + item.y].y,
        res,
        res
      );
    } else {
      if (i + item.x >= 0 && j + item.y >= 0) {
        ctx.fillStyle = "red";
        ctx.fillRect(
          grid[i + item.x][j + item.y].x,
          grid[i + item.x][j + item.y].y,
          res,
          res
        );
      }
    }
  });
};
const findCell = (x, y) => {
  let i = Math.floor(x / res);
  let j = Math.floor(y / res);

  return { x: i, y: j };
};

/*================================= */

/* Reset the grid */
const reset = () => {
  stopped = true;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < row; j++) {
      grid[i][j] = {
        ...grid[i][j],
        state: 0,
      };
    }
  }

  onstart();
};

/*================================== */

const findCoord = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;

  let i = Math.floor(x / res);
  let j = Math.floor(y / res);

  const rangeX = i * res;

  const rangeY = j * res;
  console.log(3 % 2);

  if (
    x >= rangeX &&
    x <= rangeX + res &&
    y >= rangeY &&
    y <= rangeY + res &&
    grid[i][j].state === 0
  ) {
    grid[i][j] = {
      ...grid[i][j],
      state: 1,
    };
    onstart();
  } else if (
    x >= rangeX &&
    x <= rangeX + res &&
    y >= rangeY &&
    y <= rangeY + res &&
    grid[i][j].state === 1
  ) {
    grid[i][j] = {
      ...grid[i][j],
      state: 0,
    };
    onstart();
  }
};

canvas.addEventListener("click", (e) => findCoord(e));

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
      ctx.strokeStyle = "#E8EEF1";
      ctx.strokeRect(x, y, res, res);

      if (grid[i][j].state === 1) {
        ctx.fillStyle = "#43B0F1";
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

export const onstart = () => {
  /*
  let left = 0.5 - Math.ceil(canvas.width / res) * res;
  //console.log("left", left);
  let top = 0.5 - Math.ceil(canvas.height / res) * res;
  //console.log("top", top);
  let right = 2 * canvas.width;
  //console.log("right", right);
  let bottom = 2 * canvas.height;
  //console.log("bottom", bottom);

  ctx.clearRect(left, top, right - left, bottom - top);
  ctx.beginPath();
  for (let x = left; x < right; x += res) {
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
  }
  for (let y = top; y < bottom; y += res) {
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
  }
  ctx.strokeStyle = "#888";
  ctx.stroke();*/

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
};
/*Drag Screen
let startDrag;
const getPos = (e) => ({
  x: e.clientX,
  y: e.clientY,
});

const resetScreen = () => {
  startDrag = null;
  //ctx.setTransform(1, 0, 0, 1, 0, 0); // reset translation
  onstart();
};
canvas.addEventListener("mousedown", (e) => {
  //resetScreen();
  startDrag = getPos(e);
});

canvas.addEventListener("mouseup", resetScreen);
//canvas.addEventListener("mouseleave", resetScreen);

canvas.addEventListener("mousemove", (e) => {
  // Only move the grid when we registered a mousedown event
  if (!startDrag) return;
  let pos = getPos(e);
  // Move coordinate system in the same way as the cursor
  ctx.translate(pos.x - startDrag.x, pos.y - startDrag.y);
  onstart();
  startDrag = pos;
  console.log("startDrag", startDrag);
});*/

const setup = () => {
  if (!stopped) {
    document.getElementById("random").disabled = true;
    document.getElementById("pause").disabled = false;
  }
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
  pauseBtn.ariaDisable = true;
  if (!stopped) {
    draw();
    pauseBtn.innerHTML = "Pause";
  }
};

const start = () => {
  stopped = false;
  draw();
};

const hash = new HashLife();

const startGame = () => {
  const level = 4;
  const nodeGrid = hash.contruct(level, grid);
  hash.worldDepth = nodeGrid.depth;
  console.log("current Node: ", nodeGrid);
  const nextGen = hash.evolve(nodeGrid);
  console.log("next Generation", nextGen);

  const border = hash.addBorder(nextGen);

  const gridArr = hash.destruct(border);
  console.log(gridArr);
  //console.log(nextGen);

  const newGrid = hash.transformToGrid(grid, gridArr);
  onstart();
  console.log("newGrid", newGrid);

  //const border = hash.addBorder(nodeGrid);
  /*
  

  const nextGen = hash.evolve(nodeGrid);
  console.log(nextGen);
  const border = hash.addBorder(nextGen);
  console.log(border);

  const gridArr = hash.destruct(border);
  console.log(gridArr);

  const newGrid = hash.transformToGrid(grid, gridArr);
  console.log("newGrid", newGrid);
  onstart();*/
};

startBtn.addEventListener("click", startGame);

const draw = () => {
  setup();
  if (!stopped) {
    setTimeout(() => {
      requestAnimationFrame(draw);
    }, 300);
  }
};

onstart();
