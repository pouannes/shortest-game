import Grid from "@/types/Grid";
import GridCell from "@/types/GridCell";

import _ from "lodash";

type GenerateMaze = {
  x: number;
  y: number;
  grid: Grid;
};

type Direction = "up" | "down" | "right" | "left";

const directions: Direction[] = ["up", "down", "right", "left"];

export const DY = (val: number, direction: Direction) =>
  direction === "up" ? val - 1 : direction === "down" ? val + 1 : val;
export const DX = (val: number, direction: Direction) =>
  direction === "right" ? val + 1 : direction === "left" ? val - 1 : val;

const carveBetweenCell = (
  cell1: GridCell,
  cell2: GridCell,
  direction: Direction
) => {
  switch (direction) {
    case "up":
      cell2.bottomWall = false;
      break;
    case "down":
      cell1.bottomWall = false;
      break;
    case "right":
      cell1.rightWall = false;
      break;
    case "left":
      cell2.rightWall = false;
      break;
  }
};

const generateMaze = ({ x, y, grid }: GenerateMaze) => {
  const randDirection = _.shuffle<Direction>(directions);

  randDirection.forEach((direction) => {
    const newX = DX(x, direction);
    const newY = DY(y, direction);

    // if the move is valid and the next case isn't occupied
    if (
      newX >= 0 &&
      newX <= grid.length - 1 &&
      newY >= 0 &&
      newY <= grid[newX].length - 1 &&
      grid[newX][newY].cell === 0
    ) {
      carveBetweenCell(grid[x][y], grid[newX][newY], direction);
      grid[newX][newY].cell = 1;
      return generateMaze({ x: newX, y: newY, grid });
    }
  });

  return grid;
};

export default generateMaze;
