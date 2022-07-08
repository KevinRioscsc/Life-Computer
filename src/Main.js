import HashLife from "./Cell.js";
import { findCoord } from "./ClickCell.js";
import { reset, pause, start, randomize } from "./Controls.js";
import { shapeConfig, shapes } from "../Shapes/Shapes.js";

const canvas = document.querySelector("canvas");
const pauseBtn = document.querySelector(".pause");
const checkbox = document.querySelector(".checkbox");
const resetBtn = document.getElementById("reset");
const startBtn = document.getElementById("start");
const randomBtn = document.getElementById("random");

document.getElementById("pause").disabled = true;

canvas.style.backgroundColor = "#301934";

/*GLOBAL VARIABLES */

const CANVAS_WIDTH = 3900;
const CANVAS_HEIGHT = 2640;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const CTX = canvas.getContext("2d");
const RES = 20;
let stopped = false;
const COLS = CANVAS_WIDTH / RES;
const ROWS = CANVAS_HEIGHT / RES;

/*=================================== */

const create2D = (COLS, ROWS) => {
  let cellY = new Array(COLS);

  for (let i = 0; i < cellY.length; i++) {
    cellY[i] = new Array(ROWS);
  }

  return cellY;
};

export let grid = create2D(COLS, ROWS);

export const onstart = () => {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      let x = i * RES;
      let y = j * RES;

      if (grid[i][j].state === 1) {
        CTX.fillStyle = "#CC8899";
        CTX.fillRect(x, y, RES, RES);
      } else {
        CTX.clearRect(x, y, RES, RES);
      }
    }
  }
};

const fillGrid = () => {
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      let x = i * RES;
      let y = j * RES;

      grid[i][j] = {
        state: 0,
        x: x,
        y: y,
      };
    }
  }
};

/*On Load */

fillGrid();
onstart();

/*================== */

/*Gonna do Draggable here */
const draggable = document.querySelectorAll(".draggable");

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
        CTX.clearRect(
          grid[prevCord.x + item.x][prevCord.y + item.y].x,
          grid[prevCord.x + item.x][prevCord.y + item.y].y,
          RES,
          RES
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
    CTX.clearRect(
      grid[prevCord.x + item.x][prevCord.y + item.y].x,
      grid[prevCord.x + item.x][prevCord.y + item.y].y,
      RES,
      RES
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
      CTX.fillStyle = "rgba(255, 255, 255, 0.49)";
      CTX.fillRect(
        grid[i + item.x][j + item.y].x,
        grid[i + item.x][j + item.y].y,
        RES,
        RES
      );
    } else {
      if (i + item.x >= 0 && j + item.y >= 0) {
        CTX.fillStyle = "red";
        CTX.fillRect(
          grid[i + item.x][j + item.y].x,
          grid[i + item.x][j + item.y].y,
          RES,
          RES
        );
      }
    }
  });
};
const findCell = (x, y) => {
  let i = Math.floor(x / RES);
  let j = Math.floor(y / RES);

  return { x: i, y: j };
};

/*================================= */

const countNeighbors = (cell, x, y) => {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + COLS) % COLS;
      let rows = (y + j + ROWS) % ROWS;
      if (grid[col][rows].state === 1) {
        sum += 1;
      }
    }
  }

  sum -= cell.state;

  return sum;
};

/*Drag Screen
let startDrag;
const getPos = (e) => ({
  x: e.clientX,
  y: e.clientY,
});

const RESetScreen = () => {
  startDrag = null;
  //CTX.setTransform(1, 0, 0, 1, 0, 0); // reset translation
  onstart();
};
canvas.addEventListener("mousedown", (e) => {
  //RESetScreen();
  startDrag = getPos(e);
});

canvas.addEventListener("mouseup", RESetScreen);
//canvas.addEventListener("mouseleave", RESetScreen);

canvas.addEventListener("mousemove", (e) => {
  // Only move the grid when we registered a mousedown event
  if (!startDrag) return;
  let pos = getPos(e);
  // Move coordinate system in the same way as the cursor
  CTX.translate(pos.x - startDrag.x, pos.y - startDrag.y);
  onstart();
  startDrag = pos;
  console.log("startDrag", startDrag);
});*/

const nestedCopy = (arr) => {
  return JSON.parse(JSON.stringify(arr));
};

const setup = () => {
  if (!stopped) {
    document.getElementById("random").disabled = true;
    document.getElementById("pause").disabled = false;
  }
  let next = nestedCopy(grid);
  //console.log(next);

  onstart();

  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      let currentState = grid[i][j];
      let totalNeighbors = countNeighbors(grid[i][j], i, j);

      if (grid[i][j].state === 0 && totalNeighbors === 3) {
        next[i][j].state = 1;
      } else if (
        grid[i][j].state === 1 &&
        (totalNeighbors < 2 || totalNeighbors > 3)
      ) {
        next[i][j].state = 0;
      } else {
        next[i][j].state = currentState.state;
      }
      //count the neighbors
    }
  }
  grid = next;
};

const hash = new HashLife();

const startGame = () => {
  const level = 5;
  const nodeGrid = hash.contruct(level, grid);
  //const newBorder = hash.addBorder(hash.addBorder(nodeGrid));

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

  hash.matrix = [];
  console.log("newGrid", newGrid);
};

canvas.addEventListener("click", (e) => findCoord(e, grid, RES));

startBtn.addEventListener("click", () => {
  stopped = start(stopped);
  draw();
});
resetBtn.addEventListener("click", () => {
  stopped = reset(grid, stopped, COLS, ROWS, randomBtn);
  draw();
});
pauseBtn.addEventListener("click", () => {
  stopped = pause(stopped, pauseBtn);
  draw();
});

randomBtn.addEventListener("click", () =>
  randomize(grid, COLS, ROWS, RES, CTX)
);

const draw = () => {
  setup();
  if (!stopped) {
    requestAnimationFrame(draw);
  }
};
