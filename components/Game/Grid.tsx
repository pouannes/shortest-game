import GridType from "@/types/Grid";
import SelectedCell from "@/types/SelectedCell";
import Cell from "./Cell";

type GridProps = {
  grid: GridType;
  cellSize: number;
  setSelectedCell: ({ x, y }: SelectedCell) => void;
};

const Grid = ({ grid, cellSize, setSelectedCell }: GridProps) => {
  return (
    <>
      {grid.map((column, columnIdx) =>
        column.map((cell, rowIdx) => (
          <Cell
            key={`${columnIdx}-${rowIdx}`}
            x={columnIdx * cellSize}
            y={rowIdx * cellSize}
            status={cell.cellStatus}
            cellSize={cellSize}
            setSelectedCell={() => setSelectedCell({ x: columnIdx, y: rowIdx })}
          />
        ))
      )}
    </>
  );
};

export default Grid;
