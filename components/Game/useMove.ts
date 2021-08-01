import * as React from "react";
import { DX, DY } from "@/lib/generateMaze";
import Direction from "@/types/Direction";
import GridType from "@/types/Grid";
import SelectedCell from "@/types/SelectedCell";

import { useKey } from "rooks";

type UseMove = {
  grid: GridType | null;
  selectedCell: SelectedCell | null;
  setSelectedCell: (
    value: SelectedCell | ((prev: SelectedCell | null) => SelectedCell | null)
  ) => void;
  rowNumber: number;
  columnNumber: number;
};

const useMove = ({
  grid,
  selectedCell,
  setSelectedCell,
  rowNumber,
  columnNumber,
}: UseMove) => {
  const move = React.useCallback(
    (direction: Direction) => {
      if (grid === null || selectedCell === null) {
        return;
      }

      const { x, y } = selectedCell;
      const newX = DX(x, direction);
      const newY = DY(y, direction);

      // if the movement isn't legit because of the grid boundaries
      if (
        newX < 0 ||
        newX > grid.length - 1 ||
        newY < 0 ||
        newY > grid[newX].length - 1
      ) {
        return;
      }

      switch (direction) {
        case "up":
          !grid[newX][newY].bottomWall &&
            setSelectedCell((prevPos) =>
              prevPos
                ? {
                    ...prevPos,
                    y: Math.max(0, prevPos.y - 1),
                  }
                : prevPos
            );
          break;
        case "down":
          !grid[x][y].bottomWall &&
            setSelectedCell((prevPos) =>
              prevPos
                ? {
                    ...prevPos,
                    y: Math.min(rowNumber - 1, prevPos.y + 1),
                  }
                : prevPos
            );
          break;
        case "right":
          !grid[x][y].rightWall &&
            setSelectedCell((prevPos) =>
              prevPos
                ? {
                    ...prevPos,
                    x: Math.min(columnNumber - 1, prevPos.x + 1),
                  }
                : prevPos
            );
          break;
        case "left":
          !grid[newX][newY].rightWall &&
            setSelectedCell((prevPos) =>
              prevPos
                ? {
                    ...prevPos,
                    x: Math.max(0, prevPos.x - 1),
                  }
                : prevPos
            );
          break;
        default:
          break;
      }
    },
    [grid, selectedCell, setSelectedCell, rowNumber, columnNumber]
  );

  useKey(["ArrowUp", "w"], () => move("up"));
  useKey(["ArrowDown", "s"], () => move("down"));
  useKey(["ArrowRight", "d"], () => move("right"));
  useKey(["ArrowLeft", "a"], () => move("left"));
};

export default useMove;
