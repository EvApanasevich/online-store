import { createSlice } from '@reduxjs/toolkit';
import { fetchApi } from '../api/api';

const initialState = {
   productStatus: 'loading',
   product: {},
   currentPhoto: '',
}

const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers: {
      setProductStatus: (state, action) => {
         state.productStatus = action.payload
      },
      setProduct: (state, action) => {
         state.product = {
            ...action.payload,
            selectedAttributes: action.payload.attributes.map(attribute => {
               return { attributeId: attribute.id, attributeValue: attribute.items[0].id }
            }),
            count: 1
         }
      },
      setSelectedAttributeValue: (state, action) => {
         state.product = {
            ...state.product,
            selectedAttributes: state.product.selectedAttributes.map(attribute => {
               if (attribute.attributeId === action.payload.attributeId) {
                  return { ...attribute, attributeValue: action.payload.attributeValue }
               }
               return attribute
            })
         }
      },
      setCurrentPhoto: (state, action) => {
         state.currentPhoto = action.payload
      }
   }
})

export const getProduct = (productId) => async (dispatch) => {
   try {
      dispatch(setProductStatus('loading'))
      const result = await fetchApi.fetchProduct(productId)
      dispatch(setProduct(result.product))
      dispatch(setCurrentPhoto(result.product.gallery[0]))
      dispatch(setProductStatus('idle'))
   } catch (err) {
   } finally {
   }
}

export const { setProduct, setCurrentPhoto, setProductStatus, setSelectedAttributeValue } = productSlice.actions

export default productSlice.reducer