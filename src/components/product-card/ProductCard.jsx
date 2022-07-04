import React from 'react';
import './ProductCard.scss';
import cart from '../../assets/images/cart-white.svg';
import { NavLink } from 'react-router-dom';

export class ProductCard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   getPrice(product) {
      const price = product.prices.find(price => price.currency.symbol === this.props.currentCurrency)
      return `${price.currency.symbol}${price.amount}`
   }

   render() {
      const { product, putProductInCart, inCart } = this.props

      return (
         <div className={!product.inStock ? 'product-card out-of-stock' : 'product-card'}>
            <NavLink className={"link"} to={`/product/${product.id}`}>
               <div className={'product-card__photo'}>
                  <img src={product.gallery[0]} alt="product" />
               </div>
            </NavLink>
            <div className={'product-card__title'}>{product.brand} {product.name}
               {!inCart ?
                  <div onClick={() => putProductInCart(product)} className={'product-card__cart'}>
                     <img src={cart} alt="cart" />
                  </div> :
                  <div className={'product-card__cart_in'}>in cart</div>
               }
            </div>
            <span className={'product-card__price'}>{this.getPrice(product)}</span>
         </div>
      )
   }
}