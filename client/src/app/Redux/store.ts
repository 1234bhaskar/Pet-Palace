"use client"
import { configureStore } from '@reduxjs/toolkit'
import CartSlice  from './Slices/Cart/Cart'
import {persistReducer} from "redux-persist"
import {combineReducers} from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
      getItem(_key: string): Promise<string | null> {
        return Promise.resolve(null);
      },
      setItem(_key: string, value: string): Promise<void> {
        return Promise.resolve();
      },
      removeItem(_key: string): Promise<void> {
        return Promise.resolve();
      },
    };
  };

const storages = typeof window !== 'undefined'
  ? createWebStorage('local')
  : createNoopStorage();

const persistConfug={
    key:"Cart",
    version:1,
    storage:storages
}

const reducer=combineReducers({
    Cart:CartSlice
})

const persistedReducer=persistReducer(persistConfug,reducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})



export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch