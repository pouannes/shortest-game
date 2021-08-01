import Direction from "@/types/Direction";
import Grid from "@/types/Grid";
import GridCell from "@/types/GridCell";

export const DY = (val: number, direction: Direction) =>
  direction === "up" ? val - 1 : direction === "down" ? val + 1 : val;
export const DX = (val: number, direction: Direction) =>
  direction === "right" ? val + 1 : direction === "left" ? val - 1 : val;

export const isCellAccessible = (
  cell1: GridCell,
  cell2: GridCell,
  direction: Direction
) => {
  switch (direction) {
    case "up":
      return !cell2?.bottomWall;
    case "down":
      return !cell1?.bottomWall;
    case "right":
      return !cell1?.rightWall;
    case "left":
      return !cell2?.rightWall;
  }
};

export const isCoordinateWithinBounds = (x: number, y: number, grid: Grid) => {
  return x >= 0 && x <= grid.length - 1 && y >= 0 && y <= grid[x].length - 1;
};
