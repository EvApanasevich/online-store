import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Header } from './header/Header';
import { Cart } from './pages/cart/Cart';
import { Category } from './pages/category/Category';
import Product from './pages/product/Product';
import {
   initializingApp,
   changeCurrentCategory,
   changeCurrentCurrency,
   changeCurrencyPopUpStatus,
   changeMyBagPopUpStatus,
} from './redux/appSlice';
import {
   putProductInCart,
   addProductInCart,
   setSelectedAttributeValueFromCart,
   setCountProduct
} from './redux/cartSlice';
import { getCategory } from './redux/categorySlice';
import { getProduct, setCurrentPhoto, setSelectedAttributeValue } from './redux/productSlice';


class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   componentDidMount() {
      this.props.initializingApp()
   }

   render() {
      if (!this.props.isInitialized) {
         return <div>LOADING...</div>
      }
      return (
         <div>
            <Header categoriesNames={this.props.categoriesNames}
               currencies={this.props.currencies}
               currentCategoryName={this.props.currentCategoryName}
               currentCurrency={this.props.currentCurrency}
               changeCurrentCurrency={this.props.changeCurrentCurrency}
               changeCurrentCategory={this.props.changeCurrentCategory}
               activeCurrencyPopUp={this.props.activeCurrencyPopUp}
               activeMyBagPopUp={this.props.activeMyBagPopUp}
               changeCurrencyPopUpStatus={this.props.changeCurrencyPopUpStatus}
               changeMyBagPopUpStatus={this.props.changeMyBagPopUpStatus}
               productsInCart={this.props.productsInCart}
               setSelectedAttributeValueFromCart={this.props.setSelectedAttributeValueFromCart}
               setCountProduct={this.props.setCountProduct}
            />
            <Routes>
               <Route path="/" element={
                  <Category getCategory={this.props.getCategory}
                     putProductInCart={this.props.putProductInCart}
                     productsInCartIds={this.props.productsInCartIds}
                     currentCategory={this.props.currentCategory}
                     currentCategoryName={this.props.currentCategoryName}
                     currentCurrency={this.props.currentCurrency}
                     status={this.props.categoryStatus}
                  />} />
               <Route path={`product/:id`} element={
                  <Product getProduct={this.props.getProduct}
                     setCurrentPhoto={this.props.setCurrentPhoto}
                     setSelectedAttributeValue={this.props.setSelectedAttributeValue}
                     product={this.props.product}
                     currentPhoto={this.props.currentPhoto}
                     currentCurrency={this.props.currentCurrency}
                     productsInCartIds={this.props.productsInCartIds}
                     addProductInCart={this.props.addProductInCart}
                     status={this.props.productStatus}
                  />}
               >
               </Route>
               <Route path="cart" element={
                  <Cart productsInCart={this.props.productsInCart}
                     currentCurrency={this.props.currentCurrency}
                     setSelectedAttributeValueFromCart={this.props.setSelectedAttributeValueFromCart}
                     setCountProduct={this.props.setCountProduct}
                  />} />
               <Route path="*" element={ <Navigate to='/'/>}
               />
            </Routes>
         </div >
      )
   }
}

const mapStateToProps = (state) => {

   return {
      isInitialized: state.app.isInitialized,
      categoriesNames: state.app.categoriesNames,
      currencies: state.app.currencies,
      currentCategoryName: state.app.currentCategoryName,
      currentCurrency: state.app.currentCurrency,
      activeCurrencyPopUp: state.app.activeCurrencyPopUp,
      activeMyBagPopUp: state.app.activeMyBagPopUp,

      categoryStatus: state.category.categoryStatus,
      currentCategory: state.category.category,
      productsInCartIds: state.cart.products.map(product => product.id),

      productStatus: state.product.productStatus,
      product: state.product.product,
      currentPhoto: state.product.currentPhoto,

      productsInCart: state.cart.products,
   }
}

export default connect(mapStateToProps, {
   getCategory,
   getProduct,
   setSelectedAttributeValue,
   setCurrentPhoto,
   initializingApp,
   changeCurrentCategory,
   changeCurrentCurrency,
   changeCurrencyPopUpStatus,
   changeMyBagPopUpStatus,
   putProductInCart,
   addProductInCart,
   setSelectedAttributeValueFromCart,
   setCountProduct,
})(App)