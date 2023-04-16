import React, { useState } from "react";
import NumberDisplay from "../NunberDisplay";
import CellElement from "../Cell";

import { generateCells } from "../../utlis";
import { Cell } from "../../types";

import "./App.scss"

const ROWS = 9
const COLS = 9
const BOMBS = 10

const App: React.FC = () => {

    const [cells, setCells] = useState(generateCells(ROWS, COLS))

    console.log(cells)

    const renderBorder = (
        cells.map((row, rowIndex) => (
            <div className="BorderRows" key={rowIndex}>
                {row.map((col, colIndex) => (
                    <CellElement
                        key={`${rowIndex} - ${colIndex}`}
                        value={col.value}
                        status={col.status}
                    />
                ))}
            </div>
        ))
    )


    return (
        <div className="App">
            <div className="Header">
                <NumberDisplay value={0} />
                <div className="Face">
                    <span role="img" aria-label="face">😊</span>
                </div>
                <NumberDisplay value={0} />
            </div>
            <div className="Body">
                {renderBorder}
            </div>
        </div>
    )
}

export default App