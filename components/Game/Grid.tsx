import GridType from "@/types/Grid";
import Cell from "./Cell";
import { SelectedCell } from "./Field";

type GridProps = {
  grid: GridType;
  cellSize: number;
  setSelectedCell: ({ x, y }: SelectedCell) => void;
};

const Grid = ({ grid, cellSize, setSelectedCell }: GridProps) => {
  return (
    <>
      {grid.map((column, columnIdx) =>
        column.map((row, rowIdx) => (
          <Cell
            key={`${columnIdx}-${rowIdx}`}
            x={columnIdx * cellSize}
            y={rowIdx * cellSize}
            cellSize={cellSize}
            setSelectedCell={() => setSelectedCell({ x: columnIdx, y: rowIdx })}
          />
        ))
      )}
    </>
  );
};

export default Grid;
