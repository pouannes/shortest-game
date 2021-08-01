import * as React from "react";
import { useKey } from "rooks";

import Cell from "./Cell";
import Grid from "./Grid";
import Walls from "./Walls";

type FieldProps = {
  columnNumber?: number;
};

export type SelectedCell = {
  x: number;
  y: number;
};

type GridCell = {
  cell: number;
  bottomWall: boolean;
  rightWall: boolean;
};

export type Grid = GridCell[][];

type Direction = "up" | "down" | "left" | "right";

const height = 400;
const width = 800;

const getRandomGrid = (rowNumber: number, columnNumber: number) => {
  const grid = Array.from({ length: columnNumber }, () =>
    Array.from({ length: rowNumber }, () => ({
      cell: 0,
      bottomWall: true,
      rightWall: true,
    }))
  );

  // remove walls on the far left and bottom
  return grid.map((column, columnIdx) =>
    column.map((cell, rowIdx) => ({
      ...cell,
      rightWall: columnIdx !== columnNumber - 1,
      bottomWall: rowIdx !== rowNumber - 1,
    }))
  );
};

const Field = ({ columnNumber = 20 }: FieldProps): JSX.Element => {
  const cellSize = width / columnNumber;
  const rowNumber = Math.floor(height / cellSize);

  const [grid, setGrid] = React.useState<Grid | null>(null);

  React.useEffect(() => {
    setGrid(getRandomGrid(rowNumber, columnNumber));
  }, [columnNumber, rowNumber]);

  const [selectedCell, setSelectedCell] = React.useState<SelectedCell>({
    x: Math.round(columnNumber / 2),
    y: Math.round(rowNumber / 2) - 1,
  });

  const move = React.useCallback(
    (direction: Direction) => {
      let hasWall;

      if (grid === null) {
        return;
      }

      switch (direction) {
        case "up":
          setSelectedCell((prevPos) => ({
            ...prevPos,
            y: Math.max(0, prevPos.y - 1),
          }));
          break;
        case "down":
          setSelectedCell((prevPos) => ({
            ...prevPos,
            y: Math.min(rowNumber - 1, prevPos.y + 1),
          }));
          break;
        case "right":
          setSelectedCell((prevPos) => ({
            ...prevPos,
            x: Math.min(columnNumber - 1, prevPos.x + 1),
          }));
          break;
        case "left":
          setSelectedCell((prevPos) => ({
            ...prevPos,
            x: Math.max(0, prevPos.x - 1),
          }));
          break;
        default:
          break;
      }
    },
    [columnNumber, rowNumber, grid]
  );

  useKey(["ArrowUp", "w"], () => move("up"));
  useKey(["ArrowDown", "s"], () => move("down"));
  useKey(["ArrowRight", "d"], () => move("right"));
  useKey(["ArrowLeft", "a"], () => move("left"));

  return (
    <div className="relative bg-gray-700">
      <button
        className="absolute left-0 p-3 bg-gray-400 rounded-md -top-20 "
        onClick={() => setGrid(getRandomGrid(rowNumber, columnNumber))}
      >
        Randomize walls
      </button>
      <svg width={width} height={height}>
        {grid !== null ? (
          <>
            <Grid
              grid={grid}
              cellSize={cellSize}
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
            />
            <Walls grid={grid} cellSize={cellSize} />{" "}
          </>
        ) : null}
      </svg>
    </div>
  );
};

export default Field;
