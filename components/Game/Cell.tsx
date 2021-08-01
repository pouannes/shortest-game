import CellStatus from "@/types/CellStatus";

type CellProps = {
  x: number;
  y: number;
  status: CellStatus;
  cellSize: number;
  setSelectedCell: () => void;
};

const Cell = ({
  x,
  y,
  status,
  cellSize,
  setSelectedCell,
}: CellProps): JSX.Element => {
  return (
    <rect
      x={x}
      y={y}
      width={cellSize}
      height={cellSize}
      stroke={"#4B5563"}
      fill={status === "visited" ? "#252C37" : "#111827"}
      strokeWidth={2}
      onClick={setSelectedCell}
    />
  );
};

export default Cell;
