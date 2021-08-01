import * as React from "react";

import Grid from "./Grid";
import Walls from "./Walls";
import SelectedCell from "./SelectedCell";
import GridType from "@/types/Grid";
import GridCell from "@/types/GridCell";
import generateMaze from "@/lib/generateMaze";
import SelectedCellType from "@/types/SelectedCell";
import useMove from "./useMove";
import depthSearchGenerator from "@/lib/depthSearchGenerator";

import _ from "lodash";
import { useKey } from "rooks";
import { increaseGridSize } from "@/lib/utils";

type FieldProps = {
  columnNumber?: number;
};

const height = 400;
const width = 800;

const getBaseGrid = (rowNumber: number, columnNumber: number): GridType => {
  const grid = Array.from({ length: columnNumber }, () =>
    Array.from(
      { length: rowNumber },
      (): GridCell => ({
        cellStatus: "init",
        bottomWall: true,
        rightWall: true,
      })
    )
  );

  // remove walls on the far left and bottom
  return grid.map((column, columnIdx) =>
    column.map((cell, rowIdx) => ({
      ...cell,
      rightWall: columnIdx !== columnNumber - 1,
      bottomWall: rowIdx !== rowNumber - 1,
    }))
  );
};

const Field = ({ columnNumber = 16 }: FieldProps): JSX.Element => {
  const cellSize = width / columnNumber;
  const rowNumber = Math.floor(height / cellSize);

  const [grid, setGrid] = React.useState<GridType | null>(null);

  const [selectedCell, setSelectedCell] =
    React.useState<SelectedCellType | null>(null);

  useMove({ grid, selectedCell, setSelectedCell, rowNumber, columnNumber });

  const handleNextComputerMove = () => {
    // if there's still cells to visit
    if (
      grid?.some((column) =>
        column.some((cell) => cell.cellStatus !== "visited")
      )
    ) {
      setGrid(_.clone(generator?.next()?.value));
    }
  };

  // initialize maze
  React.useEffect(() => {
    const smallGrid = generateMaze({
      x: 0,
      y: 0,
      grid: getBaseGrid(rowNumber / 2, columnNumber / 2),
    });

    setGrid(increaseGridSize(smallGrid));
    setSelectedCell({
      x: Math.round(columnNumber / 2),
      y: Math.round(rowNumber / 2) - 1,
    });
  }, [columnNumber, rowNumber]);

  // mark the cell as visited when selectedCell moves
  React.useEffect(() => {
    setGrid((prevGrid) =>
      prevGrid
        ? prevGrid.map((column, columnIdx) =>
            columnIdx === selectedCell?.x
              ? column.map((cell, rowIdx) =>
                  rowIdx === selectedCell?.y
                    ? { ...cell, cellStatus: "visited" }
                    : cell
                )
              : column
          )
        : prevGrid
    );
  }, [selectedCell]);

  // set up generator for AI
  const [generator, setGenerator] = React.useState<Generator<GridType> | null>(
    null
  );
  React.useEffect(() => {
    if (grid && !generator) {
      setGenerator(
        depthSearchGenerator({
          x: Math.round(columnNumber / 2),
          y: Math.round(rowNumber / 2) - 1,
          grid: _.clone(grid),
        })
      );
    }
  }, [columnNumber, generator, grid, rowNumber]);

  useKey(["n"], handleNextComputerMove);

  return (
    <div className="relative bg-gray-800 border-2 border-gray-700 rounded-md">
      <button
        className="absolute left-0 p-3 bg-gray-400 rounded-md -top-20"
        onClick={() =>
          setGrid(
            generateMaze({
              x: 0,
              y: 0,
              grid: getBaseGrid(rowNumber, columnNumber),
            })
          )
        }
      >
        Randomize walls
      </button>
      <button
        className="absolute right-0 p-3 bg-gray-400 rounded-md -top-20"
        onClick={handleNextComputerMove}
      >
        Next step
      </button>
      <svg width={width} height={height}>
        {grid !== null ? (
          <>
            <Grid
              grid={grid}
              cellSize={cellSize}
              setSelectedCell={setSelectedCell}
            />
            <Walls grid={grid} cellSize={cellSize} />
            {selectedCell ? (
              <SelectedCell
                x={selectedCell.x}
                y={selectedCell.y}
                cellSize={cellSize}
              />
            ) : null}
          </>
        ) : null}
      </svg>
    </div>
  );
};

export default Field;
