import { createSlice } from '@reduxjs/toolkit';
import { fetchApi } from '../api/api';

const initialState = {
   categoryStatus: 'loading',
   category: {},
}

const categorySlice = createSlice({
   name: 'category',
   initialState,
   reducers: {
      setCategoryStatus: (state, action) => {
         state.categoryStatus = action.payload
      },
      setCategory: (state, action) => {
         state.category = action.payload.category
      },
   }
})

export const getCategory = (currentCategory) => async (dispatch) => { 
   try {
      dispatch(setCategoryStatus('loading'))
      const category = await fetchApi.fetchCategory(currentCategory)
      dispatch(setCategory(category))
      dispatch(setCategoryStatus('idle'))
   } catch (err) {
   } finally {
   }
}

export const { setCategory, setCategoryStatus } = categorySlice.actions

export default categorySlice.reducer