type CellProps = {
  x: number;
  y: number;
  cellSize: number;
  selected?: boolean;
  setSelectedCell: () => void;
};

const Cell = ({
  x,
  y,
  cellSize,
  selected,
  setSelectedCell,
}: CellProps): JSX.Element => {
  return (
    <rect
      x={x}
      y={y}
      width={cellSize}
      height={cellSize}
      stroke="#E5E7EB"
      fill={selected ? "#047857" : "#374151"}
      onClick={setSelectedCell}
    />
  );
};

export default Cell;
