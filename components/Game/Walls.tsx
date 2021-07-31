type WallsProps = {
  walls: boolean[][];
  cellSize: number;
  direction: "horizontal" | "vertical";
};

const Walls = ({ walls, cellSize, direction }: WallsProps) => {
  return (
    <>
      {walls.map((row, rowIdx) =>
        row.map((isWall, columnIdx) => (
          <Wall
            key={`${rowIdx}-${columnIdx}`}
            x={
              direction === "horizontal"
                ? columnIdx * cellSize
                : columnIdx * cellSize + cellSize
            }
            y={
              direction === "vertical"
                ? rowIdx * cellSize
                : rowIdx * cellSize + cellSize
            }
            isWall={isWall}
            cellSize={cellSize}
            direction={direction}
          />
        ))
      )}
    </>
  );
};

type WallProps = {
  x: number;
  y: number;
  cellSize: number;
  isWall: boolean;
  direction: "horizontal" | "vertical";
};

const Wall = ({ x, y, cellSize, isWall, direction }: WallProps) => {
  const strokeWidth = 2;
  return (
    <line
      x1={direction === "vertical" ? x : x - strokeWidth / 2}
      y1={direction === "vertical" ? y - strokeWidth / 2 : y}
      x2={direction === "vertical" ? x : x + cellSize + strokeWidth / 2}
      y2={direction === "vertical" ? y + cellSize + strokeWidth / 2 : y}
      stroke={isWall ? "#FECACA" : "transparent"}
      strokeWidth={strokeWidth}
    />
  );
};

export default Walls;
