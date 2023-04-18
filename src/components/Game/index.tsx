import React, { useState, useEffect, useCallback } from "react";
import NumberDisplay from "../NunberDisplay";
import CellElement from "../Cell";

import { createNewGame, getAllAvaliableCellsClicked, isWin, showBombs } from "../../utlis";
import { useSelector } from "react-redux";

import "./Game.scss"
import { CellType, cellStatus, cellValue } from "../../types";

// const ROWS = 9
// const COLS = 9
// const BOMBS = 10
interface stateInterface {
    game: {
        rowNum: number
        colNum: number
        bombs: number
    }
}

const Game: React.FC = () => {

    const { rowNum, colNum, bombs: bombsNum } = useSelector((state: stateInterface) => { return state.game })
    const [cells, setCells] = useState(localStorage.getItem('historyGame') ? JSON.parse(localStorage.getItem('historyGame')!) : createNewGame(rowNum, colNum, bombsNum))
    const [bombs, setBombs] = useState(localStorage.getItem('bombs') ? JSON.parse(localStorage.getItem('bombs')!) : bombsNum)
    const [time, setTime] = useState(0)
    const [isStart, setIsStart] = useState(false)
    const [isOver, setGameOver] = useState(false)
    const [win, setWin] = useState(false)

    const storeGame = useCallback(() => {
        localStorage.setItem('historyGame', JSON.stringify(cells))
        localStorage.setItem('bombs', JSON.stringify(bombs))
    }, [cells, bombs])

    useEffect(() => {
        storeGame()
    }, [cells, bombs])

    useEffect(() => {
        const newGame = localStorage.getItem('historyGame') ? JSON.parse(localStorage.getItem('historyGame')!) : createNewGame(rowNum, colNum, bombsNum)
        const newBombs = localStorage.getItem('bombs') ? JSON.parse(localStorage.getItem('bombs')!) : bombsNum
        setCells(newGame)
        setBombs(newBombs)
    }, [rowNum, colNum, bombsNum])

    // game timer
    useEffect(() => {
        let timer: number
        if (isStart) {
            timer = setInterval(() => {
                setTime(prev => prev + 1)
            }, 1000)
        }

        return () => {
            clearInterval(timer)
        }
    }, [isStart, time])

    useEffect(() => {
        if (isWin(cells, bombs)) {
            setWin(true)
        }
        if (win) {
            setIsStart(false)
            setGameOver(true)
            window.alert("You win!!!!")
        }
    }, [cells, win])




    const handleLeftClick = (rowIndex: number, colIndex: number) => {
        if (isOver) {
            return
        }
        if (!isStart) {
            setIsStart(true)
        }
        if (cells[rowIndex][colIndex].status === cellStatus.clicked || cells[rowIndex][colIndex].status === cellStatus.flagged) {
            return
        }

        if (cells[rowIndex][colIndex].value === cellValue.bomb) {
            cells[rowIndex][colIndex].red = true
            showBombs(cells)
            setIsStart(false)
            setGameOver(true)
        }

        let newCells = [...cells]
        if (cells[rowIndex][colIndex].value === cellValue.bomb) {
            newCells[rowIndex][colIndex].status = cellStatus.clicked

        } else {
            newCells = getAllAvaliableCellsClicked(newCells, rowIndex, colIndex)
        }

        setCells(newCells)
    }

    const handleRightClick = (rowIndex: number, colIndex: number) => {
        if (isOver) {
            return
        }
        if (!isStart) {
            setIsStart(true)
        }
        if (cells[rowIndex][colIndex].status === cellStatus.clicked) {
            return
        }
        const newCells = [...cells]
        if (cells[rowIndex][colIndex].status === cellStatus.available) {
            newCells[rowIndex][colIndex].status = cellStatus.flagged
            setCells(newCells)
            setBombs((prev: number) => prev - 1)

        } else if (cells[rowIndex][colIndex].status === cellStatus.flagged) {
            newCells[rowIndex][colIndex].status = cellStatus.available
            setCells(newCells)
            setBombs((prev: number) => prev + 1)
        }

    }

    const resetGameHandler = () => {
        if (window.confirm('Do you want to restart the game?')) {
            setCells(createNewGame(rowNum, colNum, bombsNum))
            setBombs(bombsNum)
            setIsStart(false)
            setGameOver(false)
            setTime(0)
            storeGame()
        }
    }

    const renderBorder = (
        cells.map((row: CellType[], rowIndex: number) => (
            <div className="BorderRows" key={rowIndex}>
                {row.map((col: CellType, colIndex: number) => (
                    <CellElement
                        key={`${rowIndex} - ${colIndex}`}
                        value={col.value}
                        status={col.status}
                        red={col.red}
                        row={rowIndex}
                        col={colIndex}
                        leftClick={handleLeftClick}
                        rightClick={handleRightClick}
                    />
                ))}
            </div>
        ))
    )

    return (
        <div className="App">
            <div className="Header">
                <NumberDisplay value={bombs} />
                <div className="Face" onClick={resetGameHandler}>
                    {
                        !isOver
                            ? <span role="img" aria-label="face">😊</span>
                            : <span role="img" aria-label="face">😈</span>
                    }
                </div>
                <NumberDisplay value={time} />
            </div>
            <div className="Body">
                {renderBorder}
            </div>
        </div>
    )
}

export default Game