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
  const selectedColor = "#8B5CF6";
  return (
    <rect
      x={x}
      y={y}
      width={cellSize}
      height={cellSize}
      stroke={selected ? selectedColor : "#6B7280"}
      fill={selected ? selectedColor : "#374151"}
      strokeWidth={2}
      onClick={setSelectedCell}
    />
  );
};

export default Cell;
