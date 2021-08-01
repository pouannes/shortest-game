import * as React from "react";
import { useKey } from "rooks";

import Cell from "./Cell";
import Grid from "./Grid";
import Walls from "./Walls";
import SelectedCell from "./SelectedCell";
import GridType from "@/types/Grid";
import generateMaze, { DX, DY } from "@/lib/generateMaze";

type FieldProps = {
  columnNumber?: number;
};

export type SelectedCell = {
  x: number;
  y: number;
};

type Direction = "up" | "down" | "left" | "right";

const height = 400;
const width = 800;

const getBaseGrid = (rowNumber: number, columnNumber: number) => {
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

  const [grid, setGrid] = React.useState<GridType | null>(null);

  // initialize maze
  React.useEffect(() => {
    setGrid(
      generateMaze({ x: 0, y: 0, grid: getBaseGrid(rowNumber, columnNumber) })
    );
  }, [columnNumber, rowNumber]);

  const [selectedCell, setSelectedCell] = React.useState<SelectedCell>({
    x: Math.round(columnNumber / 2),
    y: Math.round(rowNumber / 2) - 1,
  });

  const move = React.useCallback(
    (direction: Direction) => {
      if (grid === null) {
        return;
      }

      const { x, y } = selectedCell;
      const newX = DX(x, direction);
      const newY = DY(y, direction);

      if (
        newX < 0 ||
        newX > grid.length - 1 ||
        newY < 0 ||
        newY > grid[newX].length - 1 ||
        grid[newX][newY].cell === 0
      ) {
        return;
      }

      switch (direction) {
        case "up":
          !grid[newX][newY].bottomWall &&
            setSelectedCell((prevPos) => ({
              ...prevPos,
              y: Math.max(0, prevPos.y - 1),
            }));
          break;
        case "down":
          !grid[x][y].bottomWall &&
            setSelectedCell((prevPos) => ({
              ...prevPos,
              y: Math.min(rowNumber - 1, prevPos.y + 1),
            }));
          break;
        case "right":
          !grid[x][y].rightWall &&
            setSelectedCell((prevPos) => ({
              ...prevPos,
              x: Math.min(columnNumber - 1, prevPos.x + 1),
            }));
          break;
        case "left":
          !grid[newX][newY].rightWall &&
            setSelectedCell((prevPos) => ({
              ...prevPos,
              x: Math.max(0, prevPos.x - 1),
            }));
          break;
        default:
          break;
      }
    },
    [grid, selectedCell, rowNumber, columnNumber]
  );

  useKey(["ArrowUp", "w"], () => move("up"));
  useKey(["ArrowDown", "s"], () => move("down"));
  useKey(["ArrowRight", "d"], () => move("right"));
  useKey(["ArrowLeft", "a"], () => move("left"));

  return (
    <div className="relative bg-gray-800 border-2 border-gray-700 rounded-md">
      <button
        className="absolute left-0 p-3 bg-gray-400 rounded-md -top-20"
        onClick={() =>
          setGrid(
            generateMaze({
              x: 0,
              y: 0,
              grid: getBaseGrid(rowNumber, columnNumber),
            })
          )
        }
      >
        Randomize walls
      </button>
      <svg width={width} height={height}>
        {grid !== null ? (
          <>
            <Grid
              grid={grid}
              cellSize={cellSize}
              setSelectedCell={setSelectedCell}
            />
            <Walls grid={grid} cellSize={cellSize} />
            <SelectedCell
              x={selectedCell.x}
              y={selectedCell.y}
              cellSize={cellSize}
            />
          </>
        ) : null}
      </svg>
    </div>
  );
};

export default Field;
