import React from 'react';
import { connect } from 'react-redux';
import { Header } from './Header';
import {
   changeCurrentCategory,
   changeCurrentCurrency,
   changeCurrencyPopUpStatus,
   changeMyBagPopUpStatus,
} from '../redux/appSlice';
import { setSelectedAttributeValueFromCart, setCountProduct } from '../redux/cartSlice';

export class HeaderContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   render() {
      return (
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
      )
   }
}

const mapStateToProps = (state) => {

   return {
      categoriesNames: state.app.categoriesNames,
      currencies: state.app.currencies,
      currentCategoryName: state.app.currentCategoryName,
      currentCurrency: state.app.currentCurrency,
      activeCurrencyPopUp: state.app.activeCurrencyPopUp,
      activeMyBagPopUp: state.app.activeMyBagPopUp,
      productsInCartIds: state.cart.products.map(product => product.id),
      productsInCart: state.cart.products,
   }
}

export default connect(mapStateToProps, {
   changeCurrentCategory,
   changeCurrentCurrency,
   changeCurrencyPopUpStatus,
   changeMyBagPopUpStatus,
   setSelectedAttributeValueFromCart,
   setCountProduct,
})(HeaderContainer)