import React from 'react';
import '../../../module.scss'
import './SwatchAttributeBtn.scss'

export class SwatchAttributeBtn extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   render() {
      const { bgcolor, selected, inCart, cartPopUp, disable } = this.props

      return (
         <button disabled={disable || selected || inCart} onClick={() => this.props.onClickHandler()} style={{ backgroundColor: `${bgcolor}` }}
            className={selected && !disable && !inCart ?
               cartPopUp ? "attribute-swatch-color in-popup selected" : "attribute-swatch-color selected" :
               `${bgcolor}` === '#FFFFFF' ?
                  cartPopUp ? "attribute-swatch-color in-popup white" : "attribute-swatch-color white" :
                  disable || inCart ?
                     cartPopUp ? "attribute-swatch-color in-popup out-of-stock" : "attribute-swatch-color out-of-stock" :
                     cartPopUp ? "attribute-swatch-color in-popup" : "attribute-swatch-color"}>
         </button>
      )
   }
}