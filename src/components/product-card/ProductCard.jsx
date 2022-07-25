import React from 'react';
import './ProductCard.scss';
import cart from '../../assets/images/cart-white.svg';
import { NavLink } from 'react-router-dom';
import util from '../../util/common-methods';

export class ProductCard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   render() {
      const { product, putProductInCart, inCart, currentCurrency } = this.props

      return (
         <div className={!product.inStock ? "product-card out-of-stock" : "product-card"}>
            <NavLink className={"link"} to={`/product/${product.id}`}>
               <div className={"product-card__photo"}>
                  <img src={product.gallery[0]} alt='product' />
               </div>
            </NavLink>
            <div onClick={() => putProductInCart(product)} className={"product-card__cart"}>
               <img src={cart} alt='cart' />
            </div>
            {inCart && <div className={"product-card__cart_in"}>in cart</div>}
            <div className={"product-card__title"}>{product.brand} {product.name}
            </div>
            <span className={"product-card__price"}>{util.getPrice(product, currentCurrency)}</span>
         </div>
      )
   }
}