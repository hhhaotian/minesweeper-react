import { cellValue, cellStatus, CellType, adjacentCellsReturn } from "../types"

const generateCells = (rows:number, cols:number) => {
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

const randomBombs = (cells: CellType[][], bombs:number, rows: number, cols:number) => {
    let count = 0
    const newCells = [...cells]
    while(count < bombs){
        const row = Math.floor(Math.random() * rows)
        const col = Math.floor(Math.random() * cols)
        const currentCell = newCells[row][col]
        if(currentCell.value !== cellValue.bomb){
            newCells[row][col].value = cellValue.bomb
            count ++
        }
    }
    return newCells
}

const getCellsSize = (cells: CellType[][]) => {
    const rowNum = cells.length
    const colNum = cells[0].length
    return [rowNum, colNum]
}



const getAdjacentCells = (cells: CellType[][], rowIndex: number, colIndex: number) => {
    const [rowNum, colNum] = getCellsSize(cells)
    const topLeft = rowIndex > 0 && colIndex > 0 ? cells[rowIndex-1][colIndex-1] : null
    const top = rowIndex > 0 ? cells[rowIndex-1][colIndex] : null
    const topRight = rowIndex > 0 && colIndex < colNum - 1 ? cells[rowIndex-1][colIndex+1] : null
    const left = colIndex > 0 ? cells[rowIndex][colIndex-1] : null
    const right = colIndex < colNum - 1 ? cells[rowIndex][colIndex+1] : null
    const bottomLeft = rowIndex < rowNum - 1 && colNum > 0 ? cells[rowIndex + 1][colIndex - 1] : null
    const bottom = rowIndex < rowNum - 1 ? cells[rowIndex + 1][colIndex] : null
    const bottomRight = rowIndex < rowNum - 1 && colIndex < colNum - 1  ? cells[rowIndex + 1][colIndex + 1] : null
    return [topLeft,
        top,
        topRight,
        left,
        right,
        bottomLeft,
        bottom,
        bottomRight
    ]
    
}

const calCellValue = (cells: CellType[][]): CellType[][] => {
    const [rowNum, colNum] = getCellsSize(cells)
    for (let i = 0; i < rowNum; i++){
        for (let j=0; j < colNum; j++){
            if(cells[i][j].value === cellValue.bomb){
                continue
            }
            const adjacentCells = getAdjacentCells(cells, i, j)
            let bombs = 0
            bombs = adjacentCells.reduce((prev, cur) => {
                return cur?.value === cellValue.bomb ? prev + 1 : prev
            }, 0)
            cells[i][j].value = bombs
        }
    }
    return cells
}

export const createNewGame = (rows: number, cols:number, bombs:number) => {
    const cells = generateCells(rows, cols)
    const newGame = randomBombs(cells, bombs, rows, cols)
    const newGameWithBombs = calCellValue(newGame)
    return newGameWithBombs
}

export const getAllAvaliableCellsClicked = (cells: CellType[][], rowIndex: number, colIndex: number) => {
    if(cells[rowIndex][colIndex].status === cellStatus.clicked || cells[rowIndex][colIndex].value === cellValue.bomb){
        return cells
    }

    if(cells[rowIndex][colIndex].status === cellStatus.available){
        cells[rowIndex][colIndex].status = cellStatus.clicked
    }
    
    if(cells[rowIndex][colIndex].value === cellValue.none){
        const [topLeft,
            top,
            topRight,
            left,
            right,
            bottomLeft,
            bottom,
            bottomRight] = getAdjacentCells(cells, rowIndex, colIndex)
        if(topLeft){
            if(topLeft.value === cellValue.none){
                getAllAvaliableCellsClicked(cells,rowIndex-1, colIndex-1)
            }else{
                cells[rowIndex-1][colIndex-1].status = cellStatus.clicked
            }   
        }
        if(top){
            if(top.value === cellValue.none){
                getAllAvaliableCellsClicked(cells,rowIndex-1, colIndex)
            }else{
                cells[rowIndex-1][colIndex].status = cellStatus.clicked
            } 
        }
        if(topRight){
            if(topRight.value === cellValue.none){
                getAllAvaliableCellsClicked(cells,rowIndex-1, colIndex+1)
            }else{
                cells[rowIndex-1][colIndex+1].status = cellStatus.clicked
            } 
        }
        if(left){
            if(left.value === cellValue.none){
                getAllAvaliableCellsClicked(cells,rowIndex, colIndex-1)
            }else{
                cells[rowIndex][colIndex-1].status = cellStatus.clicked
            } 
        }
        if(right){
            if(right.value === cellValue.none){
                getAllAvaliableCellsClicked(cells,rowIndex, colIndex+1)
            }else{
                cells[rowIndex][colIndex+1].status = cellStatus.clicked
            } 
        }
        if(bottomLeft){
            if(bottomLeft.value === cellValue.none){
                getAllAvaliableCellsClicked(cells,rowIndex+1, colIndex-1)
            }else{
                cells[rowIndex+1][colIndex-1].status = cellStatus.clicked
            } 
        }
        if(bottom){
            if(bottom.value === cellValue.none){
                getAllAvaliableCellsClicked(cells,rowIndex+1, colIndex)
            }else{
                cells[rowIndex+1][colIndex].status = cellStatus.clicked
            } 
        }
        if(bottomRight){
            if(bottomRight.value === cellValue.none){
                getAllAvaliableCellsClicked(cells,rowIndex+1, colIndex+1)
            }else{
                cells[rowIndex+1][colIndex+1].status = cellStatus.clicked
            } 
        }
        

    }
    return cells
}

export const isWin = (cells: CellType[][], bombs: number) => {
    const [rowNum, colNum] = getCellsSize(cells)
    let countCorrectFlags = 0
    for(let i = 0; i < rowNum; i++){
        for (let j=0; j< colNum; j++){
            if(cells[i][j].value === cellValue.bomb && cells[i][j].status === cellStatus.flagged){
                countCorrectFlags++
            }
        }
    }
    return countCorrectFlags === bombs
}

export const showBombs = (cells: CellType[][]) =>{
    const [rowNum, colNum] = getCellsSize(cells)
    for(let i = 0; i < rowNum; i++){
        for (let j=0; j< colNum; j++){
            if(cells[i][j].value === cellValue.bomb){
                cells[i][j].status = cellStatus.clicked
            }
        }
    }
}