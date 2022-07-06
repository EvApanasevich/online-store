import React from 'react';
import { CartItem } from '../../components/cart-item/CartItem';
import { Button } from '../../components/UI/button/Button';
import Modal from '../../components/UI/modal/Modal';
import './Cart.scss';
import util from '../../util/general-functions';

export class Cart extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         tax: 21,
         visibleModal: false,
         viewedPhoto: ''
      }
   }
   componentDidMount() {
      window.scrollTo(0, 0)
   }
   getQuantityProducts() {
      return this.props.productsInCart.reduce((sum, product) => {
         return sum + product.count
      }, 0)
   }
   getTax() {
      const total = this.props.productsInCart.reduce((sum, product) => {
         const price = product.prices.find(price =>
            price.currency.symbol === this.props.currentCurrency
         )
         return sum + price.amount * product.count
      }, 0)
      return (total / 100 * this.state.tax).toFixed(2)
   }
   setVisibleModal() {
      this.setState({ visibleModal: !this.state.visibleModal })
   }
   enlargePhoto(viewedPhoto) {
      this.setVisibleModal()
      this.setState({ viewedPhoto: viewedPhoto})
   }

   render() {
      const { productsInCart, currentCurrency, setSelectedAttributeValueFromCart, setCountProduct } = this.props

      return (
         <div className={"cart"}>
            <div className={"cart__container"}>
               <h1 className={"cart__name"}>Cart</h1>
               <div className={"cart__list-products"}>
                  <div className={"line"}></div>
                  {this.getQuantityProducts() === 0 ?
                     <div className={"cart__no-products"}>There are no products in the cart. Please add a product. Happy shopping!</div> :
                     [...productsInCart].reverse().map((product) =>
                        <div key={product.id}>
                           <CartItem
                              product={product}
                              currentCurrency={currentCurrency}
                              setSelectedAttributeValueFromCart={setSelectedAttributeValueFromCart}
                              setCountProduct={setCountProduct}
                              enlargePhoto={this.enlargePhoto.bind(this)}
                           /><div className={"line"}></div>
                        </div>
                     )
                  }
               </div>
               <div className={"cart__total total"}>
                  <div className={"total__names"}>
                     <div className={"total__tax"}>Tax {this.state.tax}%:</div>
                     <div className={"total__quantity"}>Quantity:</div>
                     <div className={"total__total"}>Total:</div>
                  </div>
                  <div className={"total__values"}>
                     <div className={"value__tax"}>{currentCurrency}{this.getTax()}</div>
                     <div className={"value__quantity"}>{this.getQuantityProducts()}</div>
                     <div className={"value__total"}>{util.getTotal(productsInCart, currentCurrency)}</div>
                  </div>
               </div>
               {this.getQuantityProducts() !== 0 &&
                  <Button onClickHandler={() => { }} children={'order'} modStyle={'order'} />
               }
            </div>
            <Modal children={<img src={this.state.viewedPhoto} alt={'viewed'} />}
               visibleModal={this.state.visibleModal}
               setVisibleModal={this.setVisibleModal.bind(this)} />
         </div>
      )
   }
}