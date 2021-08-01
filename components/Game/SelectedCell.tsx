type SelectedCellProps = {
  x: number;
  y: number;
  cellSize: number;
};

const SelectedCell = ({ x, y, cellSize }: SelectedCellProps) => {
  return (
    <circle
      cx={x * cellSize + cellSize / 2}
      cy={y * cellSize + cellSize / 2}
      r={(cellSize / 2) * 0.6}
      fill="#9CA3AF"
    />
  );
};

export default SelectedCell;
