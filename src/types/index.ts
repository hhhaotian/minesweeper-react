export interface Cell{
    value: cellValue,
    status: cellStatus
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