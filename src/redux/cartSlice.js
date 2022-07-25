import { createSlice } from '@reduxjs/toolkit';
import { v1 } from 'uuid';

const initialState = {
   cartStatus: 'loading',
   products: [],
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      putProductInCart: (state, action) => {
         let matched = false
         const inCart = state.products.some(product =>
            product.id === action.payload.id
         )

         if (!inCart) {
            state.products.push({
               ...action.payload,
               idForCart: v1(),
               selectedAttributes: action.payload.attributes.map(attribute => {
                  return { attributeId: attribute.id, attributeValue: attribute.items[0].id }
               }),
               count: 1
            })
         } else {
            state.products.forEach(product => {
               let attributeMatch = false
               if (product.id === action.payload.id) {
                  attributeMatch = product.selectedAttributes.every(selectedAttribute =>
                     action.payload.attributes.some(newProductAttribute =>
                        newProductAttribute.items[0].displayValue === selectedAttribute.attributeValue)
                  )
                  if (attributeMatch) {
                     product.count += 1
                     matched = true
                  }
               }
            })
            if (!matched) {
               state.products.push({
                  ...action.payload,
                  idForCart: v1(),
                  selectedAttributes: action.payload.attributes.map(attribute => {
                     return { attributeId: attribute.id, attributeValue: attribute.items[0].id }
                  }),
                  count: 1
               })
            }
         }
      },
      addProductInCart: (state, action) => {
         let matched = false
         const inCart = state.products.some(product => product.id === action.payload.id)

         if (!inCart) {
            state.products.push({
               ...action.payload,
               idForCart: v1(),
            })
         } else {
            state.products.forEach(product => {
               let attributeMatch = false
               if (product.id === action.payload.id) {
                  attributeMatch = product.selectedAttributes.every(selectedAttribute =>
                     action.payload.selectedAttributes.some(newProductAttribute =>
                        newProductAttribute.attributeId === selectedAttribute.attributeId &&
                        newProductAttribute.attributeValue === selectedAttribute.attributeValue)
                  )
                  if (attributeMatch) {
                     product.count += 1
                     matched = true
                  }
               }
            })
            if (!matched) {
               state.products.push({
                  ...action.payload,
                  idForCart: v1(),
               })
            }
         }
      },
      removeAllProducts: (state, action) => {
         state.products = []
      },
      setSelectedAttributeValueFromCart: (state, action) => {
         state.products.forEach(product => {
            if (product.idForCart === action.payload.idForCart) {
               product.selectedAttributes.forEach(attribute => {
                  if (attribute.attributeId === action.payload.attributeId) {
                     attribute.attributeValue = action.payload.attributeValue
                  }
               })
            }
         })
         let matched = false
         state.products.forEach(product => {
            if (!matched) {
               state.products.forEach(itemProduct => {
                  if (product.idForCart !== itemProduct.idForCart) {
                     if (JSON.stringify(product.selectedAttributes) === JSON.stringify(itemProduct.selectedAttributes)) {
                        matched = true
                        product.count = product.count + itemProduct.count
                        state.products = state.products.filter(filterableProduct =>
                           filterableProduct.idForCart !== itemProduct.idForCart)
                     }
                  }
               })
            }
         })
      },
      setCountProduct: (state, action) => {
         state.products.forEach(product => {
            if (product.idForCart === action.payload.idForCart) {
               if (action.payload.step === 'inc') {
                  product.count++
               }
               if (action.payload.step === 'dec') {
                  if (product.count > 1) {
                     product.count--
                  } else {
                     state.products = state.products.filter(product =>
                        product.idForCart !== action.payload.idForCart
                     )
                  }
               }
            }
         })
      }
   }
})

export const { putProductInCart, addProductInCart, setSelectedAttributeValueFromCart,
   setCountProduct, removeAllProducts } = cartSlice.actions

export default cartSlice.reducer