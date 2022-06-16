import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import categoryReducer from './categorySlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';

const store = configureStore({
   reducer: {
      app: appReducer,
      category: categoryReducer,
      product: productReducer,
      cart: cartReducer,
   }
})

export default store