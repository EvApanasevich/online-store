import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   cartStatus: 'loading',
   products: [],
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      putProductInCart: (state, action) => {
         state.products.push({
            ...action.payload,
            selectedAttributes: action.payload.attributes.map(attribute => {
               return { attributeId: attribute.id, attributeValue: attribute.items[0].id }
            }),
            count: 1
         })
      },
      addProductInCart: (state, action) => {
         state.products.push(action.payload)
      },
      setSelectedAttributeValueFromCart: (state, action) => {
         state.products.forEach(product => {
            if (product.id === action.payload.productId) {
               product.selectedAttributes.forEach(attribute => {
                  if (attribute.attributeId === action.payload.attributeId) {
                     attribute.attributeValue = action.payload.attributeValue
                  }
               })
            }
         })
      },
      setCountProduct: (state, action) => {
         state.products.forEach(product => {
            if (product.id === action.payload.productId) {
               if (action.payload.step === 'inc') {
                  product.count++
               }
               if (action.payload.step === 'dec') {
                  if (product.count > 1) {
                     product.count--
                  } else {
                     state.products = state.products.filter(product =>
                        product.id !== action.payload.productId
                     )
                  }
               }
            }
         })
      }
   }
})

export const { putProductInCart, addProductInCart, setSelectedAttributeValueFromCart, setCountProduct } = cartSlice.actions

export default cartSlice.reducer