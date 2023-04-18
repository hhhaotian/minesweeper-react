import React, { useState } from "react";
import { useDispatch } from "react-redux";

import './Settings.scss'
import { setColNum, setRowNum, setBombsNum, setGame } from "../../redux/gameSlice";


const Settings: React.FC = () => {

    const [rows, setRows] = useState(9)
    const [cols, setCols] = useState(9)
    const [bombs, setBombs] = useState(10)

    const dispatch = useDispatch()

    const clickHandler = () => {
        dispatch(setRowNum(Number(rows)))
        dispatch(setColNum(Number(cols)))
        dispatch(setBombsNum(Number(bombs)))
        localStorage.setItem('bombs', JSON.stringify(bombs))
        localStorage.removeItem('historyGame')
    }

    return (
        <div className="Settings">
            <h3>Game Settings</h3>
            <div className="Inputs">
                <label>Rows: </label>
                <input type="number" value={rows} onChange={(e) => setRows(e.target.value)} />
            </div>
            <div className="Inputs">
                <label>Columns: </label>
                <input type="number" value={cols} onChange={(e) => setCols(e.target.value)} />
            </div>
            <div className="Inputs">
                <label>Mines: </label>
                <input type="number" value={bombs} onChange={(e) => setBombs(e.target.value)} />
            </div>
            <button onClick={clickHandler}>New Game</button>
        </div>
    )
}

export default Settings