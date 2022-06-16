import React from 'react';
import './TextAttributeBtn.scss';

export class TextAttributeBtn extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   render() {
      const { selected, inCart, children, disable, cartPopUp, onClickHandler } = this.props

      return (
         <button disabled={disable || selected || inCart} onClick={() => onClickHandler()}
            className={selected && !disable && !inCart ?
               cartPopUp ? "text-attribute-btn in-popup selected" : "text-attribute-btn selected" :
               disable || inCart ?
                  cartPopUp ? "text-attribute-btn in-popup out-of-stock" : "text-attribute-btn out-of-stock" :
                  cartPopUp ? "text-attribute-btn in-popup" : "text-attribute-btn"}>
            {children}
         </button>
      )
   }
}