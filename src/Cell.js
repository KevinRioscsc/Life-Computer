import { grid, onstart } from "./Main.js";
function zero2D(rows, cols) {
  var array = [],
    row = [];
  while (cols--) row.push(0);
  while (rows--) array.push(row.slice());
  return array;
}
class Node {
  constructor(sw, se, nw, ne) {
    this.sw = sw;
    this.se = se;
    this.nw = nw;
    this.ne = ne;

    if (typeof sw === typeof this) {
      this.depth = sw.depth + 1;
      this.area = sw.area + se.area + nw.area + ne.area;
    } else {
      this.depth = 1;
      this.area = sw + se + nw + ne;
    }
    this.id = Math.random();
  }
}

export default class HashLife {
  constructor() {
    this.memoNodes = new Map();
    this.memoRes = new Map();

    this.generation = 0;
    this.worldDepth = 0;

    this.CN1 = new Node(0, 0, 0, 0);
    this.CN2 = new Node(0, 0, 0, 1);
    this.CN3 = new Node(0, 0, 1, 0);
    this.CN4 = new Node(0, 0, 1, 1);
    this.CN5 = new Node(0, 1, 0, 0);
    this.CN6 = new Node(0, 1, 0, 1);
    this.CN7 = new Node(0, 1, 1, 0);
    this.CN8 = new Node(0, 1, 1, 1);
    this.CN9 = new Node(1, 0, 0, 0);
    this.CN10 = new Node(1, 0, 0, 1);
    this.CN11 = new Node(1, 0, 1, 0);
    this.CN12 = new Node(1, 0, 1, 1);
    this.CN13 = new Node(1, 1, 0, 0);
    this.CN14 = new Node(1, 1, 0, 1);
    this.CN15 = new Node(1, 1, 1, 0);
    this.CN16 = new Node(1, 1, 1, 1);

    this.CNList = [
      this.CN1,
      this.CN2,
      this.CN3,
      this.CN4,
      this.CN5,
      this.CN6,
      this.CN7,
      this.CN8,
      this.CN9,
      this.CN10,
      this.CN11,
      this.CN12,
      this.CN13,
      this.CN14,
      this.CN15,
      this.CN16,
    ];
    this.CM = zero2D(6, 6);

    this.C = zero2D(6, 6);

    this.CMr = zero2D(4, 4);

    this.matrix1 = [];
    this.matrix2 = [];
    this.matrix3 = [];
    this.matrix4 = [];
  }

  generateTree(depth) {
    if (depth === 0) return 0;

    this.n1 = this.CN1;

    for (let i = 2; i < depth + 1; i++) {
      this.n1 = this.create(this.n1, this.n1, this.n1, this.n1);
    }

    return this.n1;
  }
  processMatrix() {
    this.M = this.CM;
    this.Mr = this.C;

    for (let i = 1; i < 5; i++) {
      for (let j = 1; j < 5; j++) {
        this.n1 = this.M[i - 1][j - 1];
        this.n2 = this.M[i][j - 1];
        this.n3 = this.M[i + 1][j - 1];
        this.n4 = this.M[i + 1][j];
        this.n5 = this.M[i + 1][j + 1];
        this.n6 = this.M[i][j + 1];
        this.n7 = this.M[i - 1][j + 1];
        this.n8 = this.M[i - 1][j];

        this.res = this.M[i][j];

        this.nAlive =
          this.n1 +
          this.n2 +
          this.n3 +
          this.n4 +
          this.n5 +
          this.n6 +
          this.n7 +
          this.n8;

        if (this.nAlive < 2 || this.nAlive > 3) this.res = 0;
        else {
          if (this.nAlive === 3) this.res = 1;
        }
        this.Mr[i][j] = this.res;
      }
    }
  }
  nodeToMatrix(node) {
    this.CM[1][1] = node.sw.sw;
    this.CM[1][2] = node.sw.se;
    this.CM[1][3] = node.se.sw;
    this.CM[1][4] = node.se.se;

    this.CM[2][1] = node.sw.nw;
    this.CM[2][2] = node.sw.ne;
    this.CM[2][3] = node.se.nw;
    this.CM[2][4] = node.se.ne;

    this.CM[3][1] = node.nw.sw;
    this.CM[3][2] = node.nw.se;
    this.CM[3][3] = node.ne.sw;
    this.CM[3][4] = node.ne.se;

    this.CM[4][1] = node.nw.nw;
    this.CM[4][2] = node.nw.ne;
    this.CM[4][3] = node.ne.nw;
    this.CM[4][4] = node.ne.ne;
  }
  matrixToNode() {
    this.M = this.C;
    this.Nodesw = this.create(
      this.M[1][1],
      this.M[1][2],
      this.M[2][1],
      this.M[2][2]
    );
    this.Nodese = this.create(
      this.M[1][3],
      this.M[1][4],
      this.M[2][3],
      this.M[2][4]
    );
    this.Nodenw = this.create(
      this.M[3][1],
      this.M[3][2],
      this.M[4][1],
      this.M[4][2]
    );
    this.Nodene = this.create(
      this.M[3][3],
      this.M[3][4],
      this.M[4][3],
      this.M[4][4]
    );

    return this.create(this.Nodesw, this.Nodese, this.Nodenw, this.Nodene);
  }
  addBorder(node) {
    this.depth = node.depth;

    this.nodeBorder = this.generateTree(this.depth - 1);

    this.resSW = this.create(
      this.nodeBorder,
      this.nodeBorder,
      this.nodeBorder,
      node.sw
    );
    this.resSE = this.create(
      this.nodeBorder,
      this.nodeBorder,
      node.se,
      this.nodeBorder
    );
    this.resNW = this.create(
      this.nodeBorder,
      node.nw,
      this.nodeBorder,
      this.nodeBorder
    );
    this.resNE = this.create(
      node.ne,
      this.nodeBorder,
      this.nodeBorder,
      this.nodeBorder
    );

    return this.create(this.resSW, this.resSE, this.resNW, this.resNE);
  }
  create(sw, se, nw, ne) {
    this.node = this;
    if (typeof sw === typeof 0) this.node = this.pickCanonical(sw, se, nw, ne);
    else this.node = new Node(sw, se, nw, ne);

    if (this.memoNodes.has(this.node)) {
      return this.memoNodes.get(this.node);
    }
    this.memoNodes.set(this.node, this.node);
    return this.node;
  }
  pickCanonical(sw, se, nw, ne) {
    this.sw = sw === 1 ? 1 : 0;
    this.se = se === 1 ? 1 : 0;
    this.nw = nw === 1 ? 1 : 0;
    this.ne = ne === 1 ? 1 : 0;
    this.CN;

    this.CNList.forEach((item) => {
      if (
        this.sw == item.sw &&
        this.se == item.se &&
        this.nw == item.nw &&
        this.ne == item.ne
      )
        this.CN = item;
    });

    return this.CN;
  }
  centerNode(node) {
    /*Return the depth-1 center node of a node */

    return this.create(node.sw.ne, node.se.nw, node.nw.se, node.ne.sw);
  }
  /*
  centeredHorizontal(w, e) {
    return new Node(w.ne.se, e.nw.sw, w.se.ne, e.sw.nw);
  }

  centeredVertical(n, s) {
    return new Node(n.sw.se, n.se.sw, s.nw.ne, s.ne.ne);
  }
  centeredSubSubnodes() {
    return new Node(this.nw.se.se, this.ne.sw.sw, this.sw.ne.ne, this.se.nw.nw);
  }

  assembleCenterNode(sw, se, nw, ne) {
    return new Node(sw, se, nw, ne);
  }*/

  evolve(node) {
    let result;
    //console.log("evolve", node);
    if (node.depth === this.worldDepth) {
      this.generation += 2 ** (this.worldDepth - 2);
    }
    if (node.area === 0) {
      // console.log("area 0 get center:",this.centerNode(node) );

      return this.centerNode(node);
    }
    if (this.memoRes.has(node)) {
      console.log("we remember");
      return this.memoRes.get(node);
    }
    if (node.depth === 2) {
      this.nodeToMatrix(node);
      this.processMatrix();
      result = this.centerNode(this.matrixToNode());
    } else {
      let node11 = this.create(node.sw.sw, node.sw.se, node.sw.nw, node.sw.ne);
      let node21 = this.create(node.sw.nw, node.sw.ne, node.nw.sw, node.nw.se);
      let node31 = this.create(node.nw.sw, node.nw.se, node.nw.nw, node.nw.ne);
      let node12 = this.create(node.sw.se, node.se.sw, node.sw.ne, node.se.nw);
      let node22 = this.create(node.sw.ne, node.se.nw, node.nw.se, node.ne.sw);
      let node32 = this.create(node.nw.se, node.ne.sw, node.nw.ne, node.ne.nw);
      let node13 = this.create(node.se.sw, node.se.se, node.se.nw, node.se.ne);
      let node23 = this.create(node.se.nw, node.se.ne, node.ne.sw, node.ne.se);
      let node33 = this.create(node.ne.sw, node.ne.se, node.ne.nw, node.ne.ne);
      /*
      console.log("break down depth - 1: ", node11);
      console.log("break down depth - 1: ", node12);
      console.log("break down depth - 1: ", node13);
      console.log("break down depth - 1: ", node21);
      console.log("break down depth - 1: ", node22);
      console.log("break down depth - 1: ", node23);
      console.log("break down depth - 1: ", node31);
      console.log("break down depth - 1: ", node32);
      console.log("break down depth - 1: ", node33);*/

      let res11 = this.evolve(node11);
      let res12 = this.evolve(node12);
      let res13 = this.evolve(node13);
      let res21 = this.evolve(node21);
      let res22 = this.evolve(node22);
      let res23 = this.evolve(node23);
      let res31 = this.evolve(node31);
      let res32 = this.evolve(node32);
      let res33 = this.evolve(node33);
      /*
      console.log("the result of the evolve, ", res11);
      console.log("the result of the evolve, ", res12);
      console.log("the result of the evolve, ", res13);
      console.log("the result of the evolve, ", res21);
      console.log("the result of the evolve, ", res22);
      console.log("the result of the evolve, ", res23);
      console.log("the result of the evolve, ", res31);
      console.log("the result of the evolve, ", res32);
      console.log("the result of the evolve, ", res33);*/

      let swSquare = this.centerNode(this.create(res11, res12, res21, res22));

      let seSquare = this.centerNode(this.create(res12, res13, res22, res23));

      let nwSquare = this.centerNode(this.create(res21, res22, res31, res32));

      let neSquare = this.centerNode(this.create(res22, res23, res32, res33));
      /*
      console.log("SW NODE", swSquare);
      console.log("SE NODE", seSquare);
      console.log("NW NODE", nwSquare);
      console.log("NE NODE", neSquare);*/

      result = this.create(swSquare, seSquare, nwSquare, neSquare);

      this.memoRes.set(node, result);
    }
    return result;
  }
  nodeToGrid(node) {
    this.matrix1.push(node.nw.nw);
    this.matrix1.push(node.nw.ne);
    this.matrix1.push(node.ne.nw);
    this.matrix1.push(node.ne.ne);

    this.matrix2.push(node.nw.sw);
    this.matrix2.push(node.nw.se);
    this.matrix2.push(node.ne.sw);
    this.matrix2.push(node.ne.se);

    this.matrix3.push(node.sw.nw);
    this.matrix3.push(node.sw.ne);
    this.matrix3.push(node.sw.nw);
    this.matrix3.push(node.sw.ne);

    this.matrix4.push(node.sw.sw);
    this.matrix4.push(node.sw.se);
    this.matrix4.push(node.se.sw);
    this.matrix4.push(node.se.se);

    /*
    let arr = zero2D(4, 4);

    arr[0][0] = node.nw.nw;
    arr[0][1] = node.nw.ne;
    arr[0][2] = node.ne.nw;
    arr[0][3] = node.ne.ne;

    arr[1][0] = node.nw.sw;
    arr[1][1] = node.nw.se;
    arr[1][2] = node.ne.sw;
    arr[1][3] = node.ne.se;

    arr[2][0] = node.sw.nw;
    arr[2][1] = node.sw.ne;
    arr[2][2] = node.se.nw;
    arr[2][3] = node.se.ne;

    arr[3][0] = node.sw.sw;
    arr[3][1] = node.sw.se;
    arr[3][2] = node.se.sw;
    arr[3][3] = node.se.se;

    this.matrix.push(arr);*/

    return arr;
  }
  contruct(level, grid) {
    if (level === 1) {
      return this.create(
        grid[0][1].state,
        grid[1][1].state,
        grid[0][0].state,
        grid[1][0].state
      );
    }

    let NWarr = [];
    let NEarr = [];
    let SWarr = [];
    let SEarr = [];

    let newSize = grid.length / 2;

    for (let i = 0; i < newSize; i++) {
      NWarr[i] = grid[i].slice(0, newSize);
      // console.log(grid[i].slice(0, newSize));
      NEarr[i] = grid[i + newSize].slice(0, newSize);
      //console.log(grid[i].slice(newSize));
      SWarr[i] = grid[i].slice(newSize);
      //console.log(grid[i + newSize].slice(0, newSize));
      SEarr[i] = grid[i + newSize].slice(newSize);
      //console.log(grid[i + newSize].slice(newSize));
    }

    return this.create(
      this.contruct(level - 1, SWarr),
      this.contruct(level - 1, SEarr),
      this.contruct(level - 1, NWarr),
      this.contruct(level - 1, NEarr)
    );
  }
  destruct(node) {
    if (node.depth === 2) {
      return this.nodeToGrid(node);
    }
    let topLvl = this.create(node.sw.sw, node.sw.se, node.sw.nw, node.sw.ne);
    let destructSE = this.create(
      node.se.sw,
      node.se.se,
      node.se.nw,
      node.se.ne
    );
    let destructNW = this.create(
      node.nw.sw,
      node.nw.se,
      node.nw.nw,
      node.nw.ne
    );
    let destructNE = this.create(
      node.ne.sw,
      node.ne.se,
      node.ne.nw,
      node.ne.ne
    );

    this.destruct(destructNW);
    this.destruct(destructNE);
    this.destruct(topLvl);
    this.destruct(destructSE);

    return this.matrix;
  }
  transformToGrid(grid, gridArr) {
    this.newGrid = grid;

    const len = gridArr.length / 2 / 4;
    let multiplyer = 1;
    let halfLen = grid.length - 1;
    let half = grid.length / 2;

    for (let h = 0; h < gridArr.length; h += 4) {
      if (h === gridArr.length / 2) {
        multiplyer = 2;
      }
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          console.log(h);

          let iC = halfLen - 4 * (i % 2) - h;
          let jC = j + 4 * Math.floor(i / 2);
          console.log(iC, jC);

          grid[iC - 3][jC + half * Math.floor(h / half)].state =
            gridArr[h + i][j][0];
          console.log(jC + half * Math.floor(h / half));
          // console.log(grid[iC - 3][jC]);
          grid[iC - 2][jC + half * Math.floor(h / half)].state =
            gridArr[h + i][j][1];
          //console.log(grid[iC - 2][jC]);
          grid[iC - 1][jC + half * Math.floor(h / half)].state =
            gridArr[h + i][j][2];
          //console.log(grid[iC - 1][jC]);
          grid[iC][jC + half * Math.floor(h / half)].state =
            gridArr[h + i][j][3];
          console.log(
            grid[iC - 3][jC],
            grid[iC - 2][jC],
            grid[iC - 1][jC],
            grid[iC][jC]
          );
          if (h === 4) {
            console.log("===============================");
          }
        }
      }
    }

    return grid;
  }
}
