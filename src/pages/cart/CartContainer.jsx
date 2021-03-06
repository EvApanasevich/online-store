import React from 'react';
import { connect } from 'react-redux';
import { Cart } from './Cart';
import {
   setSelectedAttributeValueFromCart,
   setCountProduct,
   removeAllProducts,
} from '../../redux/cartSlice';

class CartContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   render() {
      return (
         <Cart productsInCart={this.props.productsInCart}
            currentCurrency={this.props.currentCurrency}
            setSelectedAttributeValueFromCart={this.props.setSelectedAttributeValueFromCart}
            setCountProduct={this.props.setCountProduct}
            removeAllProducts={this.props.removeAllProducts}
         />
      )
   }
}

const mapStateToProps = (state) => {
   return {
      currentCurrency: state.app.currentCurrency,
      productsInCart: state.cart.products,
   }
}

export default connect(mapStateToProps, {
   setSelectedAttributeValueFromCart,
   setCountProduct, removeAllProducts,
})(CartContainer)