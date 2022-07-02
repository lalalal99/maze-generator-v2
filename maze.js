let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");

[canvas.width, canvas.height] = (() => {
  let maxSize = Math.min(window.screen.width, window.screen.height);
  maxSize = Math.floor(maxSize / 100) * 100;
  maxSize = maxSize < 500 ? maxSize : "500";
  return [maxSize, maxSize];
}).call();

let current;

class Maze {
  constructor(rows = 30, cols = 30) {
    this.size = 500;
    this.rows = rows + 2;
    this.cols = cols + 2;

    this.cells = [];
  }

  setup() {
    for (let r = 0; r < this.rows; r++) {
      this.cells.push([]);
      for (let c = 0; c < this.cols; c++) {
        this.cells[r].push(new Cell(r, c, this.size / this.rows));
      }
    }

    // Draws top border
    for (let r = 0; r < this.rows; r++) {
      this.cells[r][0].isWall = true;
      this.cells[r][0].visited = true;
    }
    // Draws right border
    for (let c = 0; c < this.rows; c++) {
      this.cells[this.rows - 1][c].isWall = true;
      this.cells[this.rows - 1][c].visited = true;
    }
    // Draws bottom border
    for (let r = 0; r < this.rows; r++) {
      this.cells[r][this.cols - 1].isWall = true;
      this.cells[r][this.cols - 1].visited = true;
    }
    // Draws left border
    for (let c = 0; c < this.rows; c++) {
      this.cells[0][c].isWall = true;
      this.cells[0][c].visited = true;
    }

    current = this.cells[1][1];
    current.highlight();
  }

  draw() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.cells[r][c].draw();
      }
    }
    console.log(current);
    current.highlight();

    window.requestAnimationFrame(() => {
      this.draw();
    });
  }
}

class Cell {
  constructor(x, y, size, isWall = true) {
    this.gridX = x;
    this.gridY = y;
    this.size = size;
    this.x = x * size;
    this.y = y * size;
    this.xs = this.x + size;
    this.ys = this.y + size;

    this.isWall = isWall;
    this.visited = false;
  }

  draw() {
    let color = this.isWall ? "black" : "#5376b3";
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.xs, this.ys);
  }

  highlight() {
    ctx.fillStyle = "#db5461";
    ctx.fillRect(this.x + 1, this.y + 1, this.size - 2, this.size - 2);
  }
}

const MAZE = new Maze();
MAZE.setup();
MAZE.draw();
