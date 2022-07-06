import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import HeaderContainer from './header/HeaderContainer';
import CartContainer from './pages/cart/CartContainer';
import CategoryContainer from './pages/category/CategoryContainer';
import ProductContainer from './pages/product/ProductContainer';
import { initializingApp } from './redux/appSlice';

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
            <HeaderContainer />
            <Routes>
               <Route path='/' element={<CategoryContainer />} />
               <Route path={`product/:id`} element={<ProductContainer />} />
               <Route path='cart' element={<CartContainer />} />
               <Route path='*' element={<Navigate to='/' />} />
            </Routes>
         </div >
      )
   }
}

const mapStateToProps = (state) => {
   return {
      isInitialized: state.app.isInitialized
   }
}

export default connect(mapStateToProps, {
   initializingApp
})(App)