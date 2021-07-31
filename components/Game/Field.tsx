import * as React from "react";

import Cell from "./Cell";

type FieldProps = {
  columnNumber?: number;
};

type SelectedCell = {
  x: number;
  y: number;
};

const height = 400;
const width = 800;

const Field = ({ columnNumber = 20 }: FieldProps): JSX.Element => {
  const [selectedCell, setSelectedCell] = React.useState<SelectedCell | null>(
    null
  );

  const cellSize = width / columnNumber;

  const grid: number[][] = new Array(columnNumber).fill(
    new Array(columnNumber).fill(0)
  );

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
