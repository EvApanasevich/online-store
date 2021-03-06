import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import logo from '../assets/images/logo.svg';
import cart from '../assets/images/cart.svg';
import { CartItem } from '../components/cart-item/CartItem';
import { Button } from '../components/UI/button/Button';
import { BurgerNav } from '../components/UI/burger-nav/BurgerNav';
import util from '../util/common-methods';

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
   changeMyCurrencyPopUp() {
      this.props.changeCurrencyPopUpStatus()
      if (this.props.activeMyBagPopUp) {
         this.props.changeMyBagPopUpStatus()
      }
   }
   changeMyBagPopUp() {
      this.props.changeMyBagPopUpStatus()
      if (this.props.activeCurrencyPopUp) {
         this.props.changeCurrencyPopUpStatus()
      }
   }
   changeCategory(name) {
      this.props.changeCurrentCategory(name)
      if (this.props.activeCurrencyPopUp && this.props.activeMyBagPopUp) {
         this.props.changeCurrencyPopUpStatus()
         this.props.changeMyBagPopUpStatus()
      } else if (this.props.activeMyBagPopUp) {
         this.props.changeMyBagPopUpStatus()
      } else if (this.props.activeCurrencyPopUp) {
         this.props.changeCurrencyPopUpStatus()
      }
   }

   render() {
      const { categoriesNames, currencies, currentCurrency, currentCategoryName,
         activeCurrencyPopUp, activeMyBagPopUp, productsInCart, setSelectedAttributeValueFromCart,
         setCountProduct, changeCurrencyPopUpStatus, changeMyBagPopUpStatus } = this.props

      return (
         <div className={"header"}>
            <div className={"header__container"}>
               {/* Burger menu is rendered on mobile devices */}
               <BurgerNav categoriesNames={categoriesNames}
                  changeCategory={this.changeCategory.bind(this)}
                  currentCategoryName={currentCategoryName}
               />
               <nav className={"menu"}>
                  <ul className={"menu__list"}>
                     {/* The names of product categories are rendered */}
                     {categoriesNames.map((categoryName) =>
                        <li key={categoryName.name} className={currentCategoryName === categoryName.name ? "menu__item active" : "menu__item"}>
                           <NavLink to={`/category/${categoryName.name}`}
                              onClick={() => this.changeCategory(categoryName.name)}
                              className={"menu__link"}>
                              {categoryName.name}
                           </NavLink>
                        </li>
                     )}
                  </ul>
               </nav>
               <div className={"header__logo"}>
                  <NavLink to='/'>
                     <img src={logo} alt='logo'></img>
                  </NavLink>
               </div>
               {/* The block action in the header */}
               <div className={"action"}>
                  <div className={"action__currency"}>
                     {/* Current currency is rendered */}
                     <div onClick={() => this.changeMyCurrencyPopUp()}
                        className={activeCurrencyPopUp ?
                           "action__currency-logo active" : "action__currency-logo"}>{currentCurrency}
                     </div>
                     {/* Pop up menu of currencies*/}
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
                  {/* Cart logo */}
                  <div className={"action__cart"}>
                     <div onClick={() => this.changeMyBagPopUp()} className={"action__cart-logo"}>
                        <img src={cart} alt='cart' />
                     </div>
                     {/* Count products in the cart */}
                     {(productsInCart.length > 0) &&
                        <div onClick={() => this.changeMyBagPopUp()}
                           className={"action__things-counter"}>{productsInCart.length}
                        </div>}
                     {/* Pop up cart in the header */}
                     <div className={activeMyBagPopUp ? "my-bag_active" : "my-bag"}>
                        <div className={"my-bag__container"}>
                           <div className={"my-bag__title"}>
                              <span>My Bag</span>
                              , {productsInCart.length} items
                           </div>
                           <div className={"my-bag__list-cart-item"}>
                              {/* Products is rendered in the pop up cart */}
                              {productsInCart.length === 0 ?
                                 <div className={"my-bag__no-products"}>
                                    There are no products in the cart. Please add a product. Happy shopping!
                                 </div> :
                                 productsInCart.map((product) =>
                                    <CartItem key={product.idForCart}
                                       product={product}
                                       currentCurrency={currentCurrency}
                                       setSelectedAttributeValueFromCart={setSelectedAttributeValueFromCart}
                                       setCountProduct={setCountProduct}
                                       cartPopUp={true}
                                       inCart={true}
                                    />
                                 )
                              }
                           </div>
                           <div className={"my-bag__total"}>
                              <span>Total</span>
                              <span>{util.getTotal(productsInCart, currentCurrency)}</span>
                           </div>
                           {/* Buttons in pop up cart*/}
                           <div className={"my-bag__buttons buttons"}>
                              <NavLink onClick={() => {
                                 changeMyBagPopUpStatus()
                                 if (activeCurrencyPopUp) {
                                    changeCurrencyPopUpStatus()
                                 }
                              }} to='/cart'>
                                 <Button onClickHandler={() => { }} children={'view bag'} modStyle={'view-bag'} />
                              </NavLink>
                              <NavLink onClick={() => {
                                 changeMyBagPopUpStatus()
                                 if (activeCurrencyPopUp) {
                                    changeCurrencyPopUpStatus()
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
            {/* Blackout area when the pop up cart falls out */}
            <div onClick={() => {
               changeMyBagPopUpStatus()
               if (activeCurrencyPopUp) {
                  changeCurrencyPopUpStatus()
               }
            }}
               className={activeMyBagPopUp ? "disabled active" : "disabled"}>
            </div>
         </div>
      )
   }
}