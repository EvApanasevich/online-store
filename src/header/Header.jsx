import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../assets/images/logo.svg';
import cart from '../assets/images/cart.svg';
import { CartItem } from '../components/cart-item/CartItem';
import { Button } from '../components/UI/button/Button';
import { BurgerNav } from '../components/UI/burger-nav/BurgerNav';

export class Header extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   changeCurrency(symbol) {
      this.props.changeCurrentCurrency(symbol)
      this.props.changeCurrencyPopUpStatus()
   }
   changeCategory(name) {
      this.props.changeCurrentCategory(name)
      if (this.props.activeCurrencyPopUp && this.props.activeMyBagPopUp) {
         this.changeCurrencyPopUp()
         this.changeMyBagPopUp()
      } else if (this.props.activeMyBagPopUp) {
         this.changeMyBagPopUp()
      } else if (this.props.activeCurrencyPopUp) {
         this.changeCurrencyPopUp()
      }
   }
   changeCurrencyPopUp() {
      this.props.changeCurrencyPopUpStatus()
   }
   changeMyBagPopUp() {
      this.props.changeMyBagPopUpStatus()
   }
   getTotal() {
      const total = this.props.productsInCart.reduce((sum, product) => {
         const price = product.prices.find(price =>
            price.currency.symbol === this.props.currentCurrency
         )
         return sum + price.amount * product.count
      }, 0)
      return `${this.props.currentCurrency}${total.toFixed(2)}`
   }

   render() {
      const { categoriesNames, currencies, currentCurrency, currentCategoryName,
         activeCurrencyPopUp, activeMyBagPopUp, productsInCart, setSelectedAttributeValueFromCart,
         setCountProduct } = this.props

      return (
         <div className={"header"}>
            <div className={"header__container"}>
               <BurgerNav categoriesNames={categoriesNames}
                  changeCategory={this.changeCategory.bind(this)}
                  currentCategoryName={currentCategoryName}
               />
               <nav className={"menu"}>
                  <ul className={"menu__list"}>
                     {categoriesNames.map((categoryName) =>
                        <li key={categoryName.name} className={currentCategoryName === categoryName.name ? "menu__item active" : "menu__item"}>
                           <Link to='/' onClick={() => this.changeCategory(categoryName.name)} className={"menu__link"}>
                              {categoryName.name}
                           </Link>
                        </li>
                     )}
                  </ul>
               </nav>
               <div className={"header__logo"}>
                  <NavLink to='/'>
                     <img src={logo} alt="logo"></img>
                  </NavLink>
               </div>
               <div className={"action"}>
                  <div className={"action__currency"}>
                     <div onClick={() => this.changeCurrencyPopUp()}
                        className={activeCurrencyPopUp ?
                           "action__currency-logo active" : "action__currency-logo"}>{currentCurrency}
                     </div>
                     <div className={activeCurrencyPopUp ? "currencies active" : "currencies"}>
                        <div className={"currencies__list"}>
                           {currencies.map((currency) =>
                              <div onClick={() => this.changeCurrency(currency.symbol)}
                                 key={currency.label}
                                 className={"currencies__item"}>
                                 {`${currency.symbol} ${currency.label}`}
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className={"action__cart"}>
                     <div onClick={() => this.changeMyBagPopUp()} className={"action__cart-logo"}>
                        <img src={cart} alt="cart" />
                     </div>
                     {(productsInCart.length > 0) &&
                        <div onClick={() => this.changeMyBagPopUp()}
                           className={"action__things-counter"}>{productsInCart.length}
                        </div>}
                     <div className={activeMyBagPopUp ? "my-bag_active" : "my-bag"}>
                        <div className={"my-bag__container"}>
                           <div className={"my-bag__title"}>
                              <span>My Bag</span>
                              , {productsInCart.length} items
                           </div>
                           <div className={"my-bag__list-cart-item"}>
                              {productsInCart.length === 0 ?
                                 <div className="my-bag__no-products">
                                    There are no products in the cart. Please add a product. Happy shopping!
                                 </div> :
                                 productsInCart.map((product) =>
                                    <CartItem key={product.id}
                                       product={product}
                                       currentCurrency={currentCurrency}
                                       setSelectedAttributeValueFromCart={setSelectedAttributeValueFromCart}
                                       setCountProduct={setCountProduct}
                                       cartPopUp={true}
                                    />
                                 )
                              }
                           </div>
                           <div className={"my-bag__total"}>
                              <span>Total</span>
                              <span>{this.getTotal()}</span>
                           </div>
                           <div className={"my-bag__buttons buttons"}>
                              <NavLink onClick={() => {
                                 this.changeMyBagPopUp()
                                 if (activeCurrencyPopUp) {
                                    this.changeCurrencyPopUp()
                                 }
                              }} to='/cart'>
                                 <Button onClickHandler={() => { }} children={'view bag'} modStyle={'view-bag'} />
                              </NavLink>
                              <NavLink onClick={() => {
                                 this.changeMyBagPopUp()
                                 if (activeCurrencyPopUp) {
                                    this.changeCurrencyPopUp()
                                 }
                              }} to='/cart'>
                                 <Button onClickHandler={() => { }} children={'check out'} modStyle={'check-out'} />
                              </NavLink>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div onClick={() => {
               this.changeMyBagPopUp()
               if (activeCurrencyPopUp) {
                  this.changeCurrencyPopUp()
               }
            }}
               className={activeMyBagPopUp ? "disabled active" : "disabled"}>
            </div>
         </div>
      )
   }
}