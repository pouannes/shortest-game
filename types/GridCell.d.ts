import CellStatus from "./CellStatus";

type GridCell = {
  cellStatus: CellStatus;
  bottomWall: boolean;
  rightWall: boolean;
};

export default GridCell;
