type CellProps = {
  x: number;
  y: number;
  cellSize: number;
  setSelectedCell: () => void;
};

const Cell = ({ x, y, cellSize, setSelectedCell }: CellProps): JSX.Element => {
  const selectedColor = "#9CA3AF";
  const factor = 2;
  return (
    <rect
      x={x}
      y={y}
      width={cellSize}
      height={cellSize}
      stroke={"#374151"}
      fill={"#1F2937"}
      strokeWidth={2}
      onClick={setSelectedCell}
      rx={"0"}
      ry={"0"}
    />
  );
};

export default Cell;
