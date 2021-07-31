import Cell from "./Cell";
import { SelectedCell } from "./Field";

type GridProps = {
  grid: number[][];
  cellSize: number;
  selectedCell: SelectedCell;
  setSelectedCell: ({ x, y }: SelectedCell) => void;
};

const Grid = ({ grid, cellSize, selectedCell, setSelectedCell }: GridProps) => {
  return (
    <>
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
            setSelectedCell={() => setSelectedCell({ x: columnIdx, y: rowIdx })}
          />
        ))
      )}
    </>
  );
};

export default Grid;
