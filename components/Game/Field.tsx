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
import { countVisitedCells, increaseGridSize } from "@/lib/utils";

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

  const [humanGrid, setHumanGrid] = React.useState<GridType | null>(null);
  const [computerGrid, setComputerGrid] = React.useState<GridType | null>(null);

  const [selectedCell, setSelectedCell] =
    React.useState<SelectedCellType | null>(null);

  useMove({
    grid: humanGrid,
    selectedCell,
    setSelectedCell,
    rowNumber,
    columnNumber,
  });

  // initialize both maze
  React.useEffect(() => {
    const smallHumanGrid = generateMaze({
      x: 0,
      y: 0,
      grid: getBaseGrid(rowNumber / 2, columnNumber / 2),
    });
    setHumanGrid(increaseGridSize(smallHumanGrid));

    const smallComputerGrid = generateMaze({
      x: 0,
      y: 0,
      grid: getBaseGrid(rowNumber / 2, columnNumber / 2),
    });
    setComputerGrid(increaseGridSize(smallComputerGrid));

    setSelectedCell({
      x: Math.round(columnNumber / 2),
      y: Math.round(rowNumber / 2) - 1,
    });
  }, [columnNumber, rowNumber]);

  // mark the cell as visited when selectedCell moves
  React.useEffect(() => {
    setHumanGrid((prevGrid) =>
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
    if (computerGrid && !generator) {
      setGenerator(
        depthSearchGenerator({
          x: Math.round(columnNumber / 2),
          y: Math.round(rowNumber / 2) - 1,
          grid: _.clone(computerGrid),
        })
      );
    }
  }, [columnNumber, generator, computerGrid, rowNumber]);

  const handleNextComputerMove = React.useCallback(() => {
    // if there's still cells to visit
    if (
      computerGrid?.some((column) =>
        column.some((cell) => cell.cellStatus !== "visited")
      )
    ) {
      setComputerGrid(_.clone(generator?.next()?.value));
    }
  }, [computerGrid, generator]);

  // trigger computer move when human discovers a new cell
  const prevNumberHumanVisitedCells = React.useRef<number>(1);
  React.useEffect(() => {
    const numberHumanVisitedCells = humanGrid && countVisitedCells(humanGrid);
    const numberComputerVisitedCells =
      computerGrid && countVisitedCells(computerGrid);

    if (
      typeof numberComputerVisitedCells === "number" &&
      typeof numberHumanVisitedCells === "number"
    ) {
      if (
        numberHumanVisitedCells > 0 &&
        prevNumberHumanVisitedCells.current !== numberHumanVisitedCells
      ) {
        prevNumberHumanVisitedCells.current = numberHumanVisitedCells;
        handleNextComputerMove();
      } else if (numberComputerVisitedCells < numberHumanVisitedCells) {
        handleNextComputerMove();
      }
    }
  }, [computerGrid, handleNextComputerMove, humanGrid]);

  useKey(["n"], handleNextComputerMove);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative bg-gray-800 border-2 border-gray-700 rounded-md">
        {/* <button
          className="absolute left-0 p-3 bg-gray-400 rounded-md -top-20"
          onClick={() =>
            setHumanGrid(
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
        </button> */}
        <svg width={width} height={height}>
          {humanGrid !== null ? (
            <>
              <Grid
                grid={humanGrid}
                cellSize={cellSize}
                setSelectedCell={setSelectedCell}
              />
              <Walls grid={humanGrid} cellSize={cellSize} />
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
      <div className="relative mt-4 bg-gray-800 border-2 border-gray-700 rounded-md">
        <svg width={width} height={height}>
          {computerGrid !== null ? (
            <>
              <Grid
                grid={computerGrid}
                cellSize={cellSize}
                setSelectedCell={setSelectedCell}
              />
              <Walls grid={computerGrid} cellSize={cellSize} />
            </>
          ) : null}
        </svg>
      </div>
    </div>
  );
};

export default Field;
