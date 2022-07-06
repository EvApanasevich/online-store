import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerNav.scss';

export class BurgerNav extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         burgerIsOpen: false
      }
   }
   toggleBurger() {
      this.setState({ burgerIsOpen: !this.state.burgerIsOpen })
   }

   render() {
      const { categoriesNames, changeCategory, currentCategoryName } = this.props
      return (
         <div className={"burger-nav"}>
            <ul className={this.state.burgerIsOpen ? "burger-nav-items show" : "burger-nav-items"}>
               {categoriesNames.map(categorieName =>
                  <li key={categorieName.name} className={categorieName.name === currentCategoryName ? "nav-item active" : "nav-item"}>
                     <NavLink className={"link"} key={categorieName.name} to='/' onClick={() => {
                        changeCategory(categorieName.name)
                        this.toggleBurger()
                     }}>
                        {categorieName.name}
                     </NavLink>
                  </li>
               )}
            </ul>
            <div onClick={() => this.toggleBurger()} className={this.state.burgerIsOpen ? "burger-btn active-btn" : "burger-btn"}>
               <span></span>
            </div>
         </div>
      )
   }
}