import React, { MouseEvent } from "react";

import { cellValue, cellStatus } from "../../types";

import './Cell.scss'

interface CellProps {
    value: cellValue,
    status: cellStatus,
    red?: boolean
    row: number,
    col: number,
    leftClick: Function,
    rightClick: Function
}

const CellElement: React.FC<CellProps> = ({ value, status, red, row, col, leftClick, rightClick }) => {


    const contextMenuHandler = (e: MouseEvent) => {
        e.preventDefault()
        rightClick(row, col)
    }

    const leftClickHandler = () => {
        leftClick(row, col)

    }

    const renderCell = () => {
        if (status === cellStatus.available) {
            return
        } else if (status === cellStatus.clicked) {
            if (value === cellValue.bomb) {
                return <span role="img" aria-label="bomb">💣</span>
            }
            if (value !== cellValue.none) {
                return <span className="CellValue">{value}</span>
            }
        } else {
            return <span role="img" aria-label="flag">🚩</span>
        }
    }

    return (
        <div
            className={
                `Cell 
                value-${value} 
                ${status === cellStatus.clicked ? 'clicked' : ''}
                ${red ? 'red' : ''}
                `}
            onClick={leftClickHandler}
            onContextMenu={contextMenuHandler}
        >
            {renderCell()}
        </div>
    )
}

export default CellElement