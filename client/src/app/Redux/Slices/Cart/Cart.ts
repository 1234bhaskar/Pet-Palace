import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CartState{
    id:string,
    name: string;
    description?: string;
    price: number;
    images?:string,
    stock?:Boolean,
    quantity:number 
}

const initialState:CartState[]=[]

export const CartSlice=createSlice({
    name:'Cart',
    initialState,
    reducers:{
        AddProduct:(state,action)=>{
            const existingProduct = state.find(item => item.id === action.payload.id);
            if (existingProduct) {
                existingProduct.quantity += 1;
            }
            else{
                const CartTemp:CartState={
                    id:action.payload.id,
                    images:action.payload.images[0],
                    name:action.payload.name,
                    stock:action.payload.stock,
                    price:action.payload.price,
                    description:action.payload.description,
                    quantity:1
                }
                state.push(CartTemp)
            }
        },
        RemoveProduct:(state,action)=>{
            const index = state.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                if (state[index].quantity > 1) {
                    state[index].quantity -= 1; 
                } 
                else {
                    state.splice(index, 1); 
                }
            }
        },
        RemoveAllProduct:(state)=>{
            state=[]
            return state
        }
    }
})

export const {AddProduct,RemoveProduct,RemoveAllProduct}=CartSlice.actions

export default CartSlice.reducer

