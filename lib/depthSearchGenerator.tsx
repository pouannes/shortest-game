import Direction from "@/types/Direction";
import Grid from "@/types/Grid";
import { DX, DY, isCellAccessible, isCoordinateWithinBounds } from "./utils";

const directions: Direction[] = ["up", "down", "right", "left"];

type GenerateMaze = {
  x: number;
  y: number;
  grid: Grid;
};

function* depthSearchGenerator({ x, y, grid }: GenerateMaze) {
  const stack = [];

  stack.push({ x, y });
  while (stack.length > 0) {
    const currentCell = stack.pop();

    if (
      currentCell &&
      grid[currentCell.x][currentCell.y].cellStatus === "unvisited"
    ) {
      grid[currentCell.x][currentCell.y].cellStatus = "visited";
      console.log(grid);
      yield grid;

      directions.forEach((direction) => {
        const newX = DX(currentCell.x, direction);
        const newY = DY(currentCell.y, direction);

        const column = grid[newX];

        if (
          isCoordinateWithinBounds(newX, newY, grid) &&
          isCellAccessible(
            grid[currentCell.x][currentCell.y],
            column[newY],
            direction
          )
        ) {
          stack.push({ x: newX, y: newY });
        }
      });
    }
  }
}

export default depthSearchGenerator;
