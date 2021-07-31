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

type walls = {
  vertical: boolean[][];
  horizontal: boolean[][];
};

type Direction = "up" | "down" | "left" | "right";

const height = 400;
const width = 800;

const getRandomWalls = (rowNumber: number, columnNumber: number) => ({
  vertical: Array.from({ length: rowNumber }, () =>
    Array.from({ length: columnNumber - 1 }, () => Math.random() > 0.5)
  ),
  horizontal: Array.from({ length: rowNumber - 1 }, () =>
    Array.from({ length: columnNumber }, () => Math.random() > 0.5)
  ),
});

const Field = ({ columnNumber = 20 }: FieldProps): JSX.Element => {
  const cellSize = width / columnNumber;
  const rowNumber = Math.floor(height / cellSize);

  const grid: number[][] = new Array(rowNumber).fill(
    new Array(columnNumber).fill(0)
  );

  const [walls, setWalls] = React.useState<walls | null>(null);

  React.useEffect(() => {
    setWalls(getRandomWalls(rowNumber, columnNumber));
  }, [columnNumber, rowNumber]);

  const [selectedCell, setSelectedCell] = React.useState<SelectedCell>({
    x: Math.round(columnNumber / 2),
    y: Math.round(rowNumber / 2) - 1,
  });

  const move = React.useCallback(
    (direction: Direction) => {
      let hasWall;

      if (walls === null) {
        return;
      }

      switch (direction) {
        case "up":
          hasWall =
            selectedCell.y === 0 ||
            walls.horizontal[selectedCell.y - 1][selectedCell.x];
          !hasWall &&
            setSelectedCell((prevPos) => ({
              ...prevPos,
              y: Math.max(0, prevPos.y - 1),
            }));
          break;
        case "down":
          hasWall =
            selectedCell.y === rowNumber - 1 ||
            walls.horizontal[selectedCell.y][selectedCell.x];
          !hasWall &&
            setSelectedCell((prevPos) => ({
              ...prevPos,
              y: Math.min(rowNumber - 1, prevPos.y + 1),
            }));
          break;
        case "right":
          hasWall =
            selectedCell.x === columnNumber - 1 ||
            walls.vertical[selectedCell.y][selectedCell.x];
          !hasWall &&
            setSelectedCell((prevPos) => ({
              ...prevPos,
              x: Math.min(columnNumber - 1, prevPos.x + 1),
            }));
          break;
        case "left":
          hasWall =
            selectedCell.x === 0 ||
            walls.vertical[selectedCell.y][selectedCell.x - 1];
          !hasWall &&
            setSelectedCell((prevPos) => ({
              ...prevPos,
              x: Math.max(0, prevPos.x - 1),
            }));
          break;
        default:
          break;
      }
    },
    [columnNumber, rowNumber, selectedCell, walls]
  );

  useKey(["ArrowUp", "w"], () => move("up"));
  useKey(["ArrowDown", "s"], () => move("down"));
  useKey(["ArrowRight", "d"], () => move("right"));
  useKey(["ArrowLeft", "a"], () => move("left"));

  return (
    <div className="relative bg-gray-700">
      <button
        className="absolute left-0 p-3 bg-gray-400 rounded-md -top-20 "
        onClick={() => setWalls(getRandomWalls(rowNumber, columnNumber))}
      >
        Randomize walls
      </button>
      <svg width={width} height={height}>
        <Grid
          grid={grid}
          cellSize={cellSize}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
        />
        {walls !== null ? (
          <>
            {" "}
            <Walls
              walls={walls.vertical}
              cellSize={cellSize}
              direction="vertical"
            />
            <Walls
              walls={walls.horizontal}
              cellSize={cellSize}
              direction="horizontal"
            />
          </>
        ) : null}
      </svg>
    </div>
  );
};

export default Field;
