import React from "react";

import './NumberDisplay.scss'

interface displayProps {
    value: number
}


const NumberDisplay: React.FC<displayProps> = ({ value }) => {
    return (
        <div className="NumberDisplay">{value.toString().padStart(3, "0")}</div>
    )
}

export default NumberDisplay