import * as React from "react";
import { useKey } from "rooks";

import Cell from "./Cell";

type FieldProps = {
  columnNumber?: number;
};

type SelectedCell = {
  x: number;
  y: number;
};

type Direction = "up" | "down" | "left" | "right";

const height = 400;
const width = 800;

const Field = ({ columnNumber = 20 }: FieldProps): JSX.Element => {
  const cellSize = width / columnNumber;
  const rowNumber = Math.floor(height / cellSize);

  const grid: number[][] = new Array(rowNumber).fill(
    new Array(columnNumber).fill(0)
  );

  const [selectedCell, setSelectedCell] = React.useState<SelectedCell>({
    x: Math.round(columnNumber / 2),
    y: Math.round(rowNumber / 2) - 1,
  });

  const move = React.useCallback(
    (direction: Direction) => {
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
    [columnNumber, rowNumber]
  );

  useKey(["ArrowUp"], () => move("up"));
  useKey(["ArrowDown"], () => move("down"));
  useKey(["ArrowRight"], () => move("right"));
  useKey(["ArrowLeft"], () => move("left"));

  return (
    <div className="bg-gray-700">
      <svg width={width} height={height}>
        {grid.map((row, rowIdx) =>
          row.map((column, columnIdx) => (
            <Cell
              key={`${rowIdx}-${columnIdx}`}
              x={columnIdx * cellSize}
              y={rowIdx * cellSize}
              cellSize={cellSize}
              selected={
                selectedCell?.x === columnIdx && selectedCell?.y === rowIdx
              }
              setSelectedCell={() =>
                setSelectedCell({ x: columnIdx, y: rowIdx })
              }
            />
          ))
        )}
      </svg>
    </div>
  );
};

export default Field;
