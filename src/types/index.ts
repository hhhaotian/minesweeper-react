export interface CellType{
    value: cellValue,
    status: cellStatus,
    red?: boolean
}

export type adjacentCellsReturn = {
    topLeft: CellType | null,
    top: CellType | null,
    topRight: CellType | null,
    left: CellType | null,
    right: CellType | null,
    bottomLeft: CellType | null,
    bottom: CellType | null,
    bottomRight: CellType | null
}

export enum cellValue{
    none,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    bomb
}

export enum cellStatus{
    available,
    clicked,
    flagged
}