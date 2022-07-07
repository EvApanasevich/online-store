import React from 'react';
import './CartItem.scss'
import { TextAttributeBtn } from '../UI/attribute-text-btn/TextAttributeBtn';
import { SwatchAttributeBtn } from '../UI/attribute-swatch-btn/SwatchAttributeBtn';
import { PhotoSlider } from '../UI/slider/photoSlider';
import util from '../../util/common-methods';

export class CartItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   
   render() {
      const { product, setSelectedAttributeValueFromCart, setCountProduct,
         cartPopUp, enlargePhoto, currentCurrency } = this.props

      return (
         <div className={cartPopUp ? "bag-item in-popup" : "bag-item"}>
            <div className={"bag-item__line"}></div>
            <div className={"bag-item__info"}>
               <div className={cartPopUp ? "bag-item__brand in-popup" : "bag-item__brand"}>
                  {product.brand}
               </div>
               <div className={cartPopUp ? "bag-item__name in-popup" : "bag-item__name"}>
                  {product.name}
               </div>
               <div className={cartPopUp ? "bag-item__price in-popup" : "bag-item__price"}>
                  {util.getPrice(product, currentCurrency)}
               </div>
               <div className={"bag-item__attributes"}>
                  {product.attributes.map(attribute =>
                     <div key={attribute.id} className={cartPopUp ? "bag-item__attribute in-popup" : "bag-item__attribute"}>
                        <span className={cartPopUp ? "bag-item__attribute-name in-popup" : "bag-item__attribute-name"}>
                           {attribute.name}:
                        </span>
                        <div className={util.getAttributeStyle(attribute.type, 'bag-item')}>
                           {/* Attributes are rendered */}
                           {attribute.items.map(item =>
                              attribute.type === 'text' ?
                                 // Components responsible for rendering attributes
                                 <TextAttributeBtn
                                    onClickHandler={() => {
                                       setSelectedAttributeValueFromCart({
                                          productId: product.id,
                                          attributeId: attribute.id, attributeValue: item.id
                                       })
                                    }}
                                    key={item.id}
                                    children={item.value}
                                    selected={util.isSelected(attribute.id, item.id, product)}
                                    disable={!product.inStock}
                                    cartPopUp={cartPopUp}
                                 />
                                 :
                                 <SwatchAttributeBtn
                                    onClickHandler={() => {
                                       setSelectedAttributeValueFromCart({
                                          productId: product.id,
                                          attributeId: attribute.id, attributeValue: item.id
                                       })
                                    }}
                                    key={item.id}
                                    bgcolor={item.value}
                                    selected={util.isSelected(attribute.id, item.id, product)}
                                    disable={!product.inStock}
                                    cartPopUp={cartPopUp}
                                 />
                           )}
                        </div>
                     </div>
                  )}
               </div>
            </div>
            <div className={cartPopUp ? "bag-item__photo-block in-popup" : "bag-item__photo-block"}>
               {/* Increase and decrease in the quantity of goods of the same type */}
               <div className={"bag-item__count count"}>
                  <div onClick={() => setCountProduct({ productId: product.id, step: 'inc' })}
                     className={cartPopUp ? "count__increment in-popup" : "count__increment"}>
                  </div>
                  <div className={cartPopUp ? "count__number in-popup" : "count__number"}>{product.count}</div>
                  <div onClick={() => setCountProduct({ productId: product.id, step: 'dec' })}
                     className={cartPopUp ? "count__decrement in-popup" : "count__decrement"}>
                  </div>
               </div>
               {/* if the pop-up is open, then the first photo is rendered, 
               but if the cart page is open, then the slider is rendered */}
               <div className={cartPopUp ? "bag-item__photo in-popup" : "bag-item__photo"}>
                  {cartPopUp ? <img src={product.gallery[0]} alt='product' /> :
                     <PhotoSlider product={product} enlargePhoto={enlargePhoto} />
                  }
               </div>
            </div>
         </div>
      )
   }
}