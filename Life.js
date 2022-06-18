const canvas = document.querySelector("canvas");
const pauseBtn = document.querySelector(".pause");
const checkbox = document.querySelector(".checkbox");

document.getElementById("pause").disabled = true;

const width = 5300;
const height = 1800;

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

let grid = create2D(cols, row);

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

draggable.forEach((draggables) => {
  draggables.addEventListener("dragstart", () => {
    checkbox.checked = false;

    draggables.classList.add("dragging");
  });
  draggables.addEventListener("dragend", () => {
    draggables.classList.remove("dragging");
    let shape;
    shapes.forEach((item) => {
      if (draggables.id === item.name) {
        shape = item;
      }
    });
    if (prev) {
      prevPosition.forEach((item) => {
        grid[prevCord.x + item.x][prevCord.y + item.y] = {
          ...grid[prevCord.x][prevCord.y],
          state: item.state,
        };
      });
      onstart();
    }
  });
});

canvas.addEventListener("dragover", (e) => {
  e.preventDefault();

  const currentShape = document.querySelector(".dragging");

  let shapeCoord;
  shapes.forEach((item) => {
    if (item.name === currentShape.id) {
      shapeCoord = item.status;
    }
  });

  if (e.shiftKey) {
    shapeSwitch = changeShapeName();

    console.log(e);
  }

  const findShape = shapeConfig.find((item) => item.name === shapeSwitch);

  shapeCoord = changeShape(shapeCoord, findShape.name);

  /* Highlight area that shape is hovering */
  const x = e.offsetX;
  const y = e.offsetY;

  const foundCell = findCell(x, y);
  const currentCell = grid[foundCell.x][foundCell.y];

  if (currentCell !== prev) {
    shapeCoord.forEach((item) => {
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
    prev = currentCell;
    prevCord = foundCell;
    prevPosition = shapeCoord;
  }
  /*===================================================== */

  drawCell(shapeCoord, foundCell.x, foundCell.y);
});

const changeShapeName = () => {
  if (index_of_shape === shapeConfig.length - 1) {
    console.log("end");
    return shapeConfig[0].name;
  }
  index_of_shape += 1;
  const currentConfig = shapeConfig[index_of_shape];

  return currentConfig.name;
};

const changeShape = (arr, name) => {
  arr.forEach((item) => {
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

const drawCell = (shapeCoord, i, j) => {
  ctx.fillStyle = "rgba(255, 255, 255, 0.49)";

  shapeCoord.forEach((item) => {
    ctx.fillRect(
      grid[i + item.x][j + item.y].x,
      grid[i + item.x][j + item.y].y,
      res,
      res
    );
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

  if (
    x >= grid[i][j].x &&
    x <= grid[i][j].x + res &&
    y >= grid[i][j].y &&
    y <= grid[i][j].y + res &&
    grid[i][j].state === 0
  ) {
    grid[i][j] = {
      ...grid[i][j],
      state: 1,
    };
    onstart();
  } else if (
    x >= grid[i][j].x &&
    x <= grid[i][j].x + res &&
    y >= grid[i][j].y &&
    y <= grid[i][j].y + res &&
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

const onstart = () => {
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
const draw = () => {
  setup();
  if (!stopped) {
    setTimeout(() => {
      requestAnimationFrame(draw);
    }, 300);
  }
};

onstart();
