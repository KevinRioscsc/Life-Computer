import { decode } from "../src/rle.js";

const newShape = decode(
  `30b2o17b$29bobo15b2o$29bo17b2o$17bo11b3o17b$2o15b2o30b$2o16b2o29b$13b
  2o2b2o30b$29b3o17b$29bo17b2o$29bobo15b2o$13b2o2b2o11b2o17b$2o16b2o29b$
  2o15b2o30b$17bo!`
);

const p =
  decode(`2o25b2o$bo25bob$bobo7bo13bobob$2b2o5bo2bo5bo6b2o2b$12bo5b2o9b$8bo10b2o
    8b$8bo3b2o4b2o9b$9b5o15b2$9b5o15b$8bo3b2o4b2o9b$8bo10b2o8b$12bo5b2o9b$
    2b2o5bo2bo5bo6b2o2b$bobo7bo13bobob$bo25bob$2o25b2o!`);

const period =
  decode(`25bo14bo$24bobo12bobob2o$23bo2bo2b2o7bo2bobobob2o$23bob2obobo8b3obobobo$22b
2o4bo13b4obo2bo$24b2o2b2o9b3o5bobobo$24bo3b3o7bo4b2o2bobobo$21b2obo3b3o7b2o
2bo3b2ob2o$22bob2o2b3o11b3o2bo$22bo5b3o12b2ob2o$23b3o2b2o15b2ob2o$25bo22bo
2bo$29b2obo12bo2bob2o$29bo2bo7b2ob2o4bo$29bo2bo7bo4b3obo4bo6b2o$31b2o8bo6bo
4bobo4bo2bo2bo4b2o$26b2o5b2o8bob3o4bo2bo4bobo3b3o2bobo2b2o$15b2o5b2obobo5bo
7b5o6b4ob2obo2b3o3bobo2bo2bo$5b2o4bo2bo2bo3bobobobobobo8bobo14bobobobo2bo2b
ob2obobo$2o2bobo2b3o3bobo3bo3bo2b2o9b2obo11b3o3b2o4bo2bo4bob2o$o2bo2bobo3b
3o2bob2ob4o4b2ob2o7b2o9bo6bo2bo3bo3b2obo$bobobo2bo2bo2bobobobo9bo4bo5b2o8b
3o2bobo2b2o2bobobo4bo$2obo2bobo2b2obobo4bobo7bo6bobo10b2obobob2o2bobob2ob5o
$3bob2ob2o2b2obo6bobo7bob2o3bo10bo4bo4b2o2bo3bo$3bo4bobo2bob2o3bobo26bo3b2o
bobobo3bo3bo2bo$4b5ob2obobo2bo6b2o15bo6bo3bo2b2obo2bob2o3b3o$9bo3bo2b2obobo
3b2o13b2ob2o4bo4bo4bob2o$6bo2bo3bo3bobobobo2bo8bo6bo6bo3bo2b2obo2bob2o3b3o$
6b3o3b2obo2bob2o4bo7b3o12bo3b2obobobo3bo3bo2bo$15b2obo3bobo2bo5b2ob2o12bo4b
o4b2o2bo3bo$6b3o3b2obo2bob2o4bo7b3o14b2obobob2o2bobob2ob5o$6bo2bo3bo3bobobo
bo2bo8bo15b3o2bobo2b2o2bobobo4bo$9bo3bo2b2obobo3b2o26bo6bo2bo3bo3b2obo$4b5o
b2obobo2bo6b2o27b3o3b2o4bo2bo4bob2o$3bo4bobo2bob2o3bobo34bobobobo2bo2bob2ob
obo$3bob2ob2o2b2obo6bobo8bo2bo15b4ob2obo2b3o3bobo2bo2bo$2obo2bobo2b2obobo4b
obo7bo2b2o2bo13bo2bo4bobo3b3o2bobo2b2o$bobobo2bo2bo2bobobobo10bo2b2o2bo14bo
bo4bo2bo2bo4b2o$o2bo2bobo3b3o2bob2ob4o7b4o17bo6b2o$2o2bobo2b3o3bobo4bo2bo5b
obo2bobo$5b2o4bo2bo2bo4bobo6b2o4b2o$15b2o6bo!`);

const shape = newShape.map((item) => {
  return {
    x: item[0],
    y: item[1],
    state: 1,
  };
});

const p54 = p.map((item) => {
  return {
    x: item[0],
    y: item[1],
    state: 1,
  };
});
const p20 = period.map((item) => {
  return {
    x: item[0],
    y: item[1],
    state: 1,
  };
});
export const shapeConfig = [
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
export const shapes = [
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
  {
    name: "eater",
    status: [
      { x: 0, y: 0, state: 1 },
      { x: 1, y: 0, state: 1 },
      { x: 0, y: 1, state: 1 },
      { x: 2, y: 1, state: 1 },
      { x: 2, y: 2, state: 1 },
      { x: 2, y: 3, state: 1 },
      { x: 3, y: 3, state: 1 },
    ],
  },
  {
    name: "p46",
    status: shape,
  },
  {
    name: "p54",
    status: p54,
  },
  {
    name: "p20",
    status: p20,
  },
];
