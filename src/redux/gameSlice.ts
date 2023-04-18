import { createSlice } from "@reduxjs/toolkit";


export const gameSlice = createSlice({
    name: 'game',
    initialState:{
        rowNum: 9,
        colNum: 9,
        bombs: 10
    },
    reducers:{
        
        setRowNum(state, action){
            state.rowNum = action.payload
        },
        setColNum(state, action){
            state.colNum = action.payload
        },
        setBombsNum(state, action){
            state.bombs = action.payload
        }
    }
})

export const { setColNum, setRowNum, setBombsNum} = gameSlice.actions