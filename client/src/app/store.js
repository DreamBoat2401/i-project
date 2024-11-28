import { configureStore } from '@reduxjs/toolkit'
import foodReducer from "../features/food/foodSlice"

export const store = configureStore({
  reducer: {
    foods: foodReducer
  },
})