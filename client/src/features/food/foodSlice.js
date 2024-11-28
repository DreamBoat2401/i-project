import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    foods: [],
    loading: false,
    error: ""
  }

  export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
      fetchPending(state) {
        state.loading = true
        state.foods = []
        state.error =""
      },
      fetchSuccess(state, action) {
        state.loading = false
        state.foods = action.payload
        state.error =""
      },
      fetchReject(state, action) {
        state.loading = false
        state.foods = []
        state.error = action.payload
    },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { fetchPending, fetchSuccess, fetchReject } = foodSlice.actions

  export const fetchAsync = () => async (dispatch) => {
    try {
        dispatch(fetchPending())

        const { data } = await axios.get('http://localhost:3000/foods', {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })
        console.log(data.foods);
        
        
        dispatch(fetchSuccess(data.foods))
    } catch (error) {
        dispatch(fetchReject(error.message))
    }
  }
  
  export default foodSlice.reducer