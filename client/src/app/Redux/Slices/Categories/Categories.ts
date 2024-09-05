import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface categoriesState{
    name:string
}

const initialState:categoriesState={
    name: ""
}

export const CategoriesSlice=createSlice({
    name:"categories",
    initialState,
    reducers:{
        AddCategories:(state,action:PayloadAction<string>)=>{
            // state=({name: action.payload})  //!ye nhi chlra
            state.name=action.payload
        },
        RemoveCategories:(state,action)=>{
            state.name=""
        }
    }
})

export const {AddCategories,RemoveCategories}=CategoriesSlice.actions

export default CategoriesSlice.reducer