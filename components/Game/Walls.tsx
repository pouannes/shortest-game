import * as React from "react";
import { Grid } from "@/types/Grid";
type WallsProps = {
  grid: Grid;
  cellSize: number;
};

const Walls = ({ grid, cellSize }: WallsProps) => {
  return grid ? (
    <>
      {grid.map((column, columnIdx) =>
        column.map((cell, rowIdx) => (
          <React.Fragment key={`${columnIdx}-${rowIdx}`}>
            {cell.bottomWall ? (
              <Wall
                x={columnIdx * cellSize}
                y={rowIdx * cellSize + cellSize}
                cellSize={cellSize}
                direction={"horizontal"}
              />
            ) : null}
            {cell.rightWall ? (
              <Wall
                x={columnIdx * cellSize + cellSize}
                y={rowIdx * cellSize}
                cellSize={cellSize}
                direction={"vertical"}
              />
            ) : null}
          </React.Fragment>
        ))
      )}
    </>
  ) : null;
};

type WallProps = {
  x: number;
  y: number;
  cellSize: number;
  direction: "horizontal" | "vertical";
};

const Wall = ({ x, y, cellSize, direction }: WallProps) => {
  const strokeWidth = 2;
  return (
    <line
      x1={direction === "vertical" ? x : x - strokeWidth / 2}
      y1={direction === "vertical" ? y - strokeWidth / 2 : y}
      x2={direction === "vertical" ? x : x + cellSize + strokeWidth / 2}
      y2={direction === "vertical" ? y + cellSize + strokeWidth / 2 : y}
      stroke={"#2563EB"}
      strokeWidth={strokeWidth}
    />
  );
};

export default Walls;
