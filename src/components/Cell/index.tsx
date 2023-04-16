import React from "react";

import { cellValue, cellStatus } from "../../types";

import './Cell.scss'

interface CellProps {
    value: cellValue,
    status: cellStatus,
    key: string,
}

const CellElement: React.FC<CellProps> = ({ value, status }) => {
    return (
        <div className="Cell"></div>
    )
}

export default CellElement