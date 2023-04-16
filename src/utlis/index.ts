import { cellValue, cellStatus } from "../types"

export const generateCells = (rows:number, cols:number) => {
    const cells = []
    for(let i=0; i < rows; i++){
        const row = []
        for (let j = 0; j < cols; j++){
            row.push({
                value: cellValue.none,
                status: cellStatus.available
            })
        }
        cells.push(row)
    }
    return cells
}