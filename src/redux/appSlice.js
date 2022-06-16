import { createSlice } from '@reduxjs/toolkit'
import { fetchApi } from '../api/api'

const initialState = {
   isInitialized: false,
   categoriesNames: [],
   currencies: [],
   currentCategoryName: '',
   currentCurrency: '',
   activeCurrencyPopUp: false,
   activeMyBagPopUp: false,
}

const appSlice = createSlice({
   name: 'app',
   initialState,
   reducers: {
      appInitializing: (state, action) => {
         state.isInitialized = action.payload
      },
      setCurrencies: (state, action) => {
         state.currencies = action.payload.currencies
         state.currentCurrency = action.payload.currencies[0].symbol
      },
      setCategoriesNames: (state, action) => {
         state.categoriesNames = action.payload.categories
         state.currentCategoryName = action.payload.categories[0].name
      },
      changeCurrentCurrency: (state, action) => {
         state.currentCurrency = action.payload
      },
      changeCurrentCategory: (state, action) => {
         state.currentCategoryName = action.payload
      },
      changeCurrencyPopUpStatus: (state, action) => {
         state.activeCurrencyPopUp = !state.activeCurrencyPopUp
      },
      changeMyBagPopUpStatus: (state, action) => {
         state.activeMyBagPopUp = !state.activeMyBagPopUp
      }
   }
})

export const initializingApp = () => async (dispatch) => {
   try {
      const categoriesNames = await fetchApi.fetchCategoriesNames()
      const currencies = await fetchApi.fetchCurrencies()
      dispatch(setCategoriesNames(categoriesNames))
      dispatch(setCurrencies(currencies))
      dispatch(appInitializing(true))
   } catch (err) {
   } finally {
   }
}

export const {
   appInitializing,
   setCurrencies,
   setCategoriesNames,
   changeCurrentCurrency,
   changeCurrentCategory,
   changeCurrencyPopUpStatus,
   changeMyBagPopUpStatus,
} = appSlice.actions

export default appSlice.reducer