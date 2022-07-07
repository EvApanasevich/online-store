import React from 'react';
import './CartItem.scss'
import { TextAttributeBtn } from '../UI/attribute-text-btn/TextAttributeBtn';
import { SwatchAttributeBtn } from '../UI/attribute-swatch-btn/SwatchAttributeBtn';
import { PhotoSlider } from '../UI/slider/photoSlider';
import util from '../../util/general-functions';

export class CartItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   getAttributeStyle(type) {
      if (type === 'text') {
         return "bag-item__attribute_text"
      } else if (type === 'swatch') {
         return "bag-item__attribute_swatch"
      }
   }
   isSelected(attributeId, attributeItemId) {
      return this.props.product.selectedAttributes.some(selectedAttribute =>
         selectedAttribute.attributeId === attributeId &&
         selectedAttribute.attributeValue === attributeItemId)
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
                        <div className={this.getAttributeStyle(attribute.type)}>
                           {attribute.items.map(item =>
                              attribute.type === 'text' ?
                                 <TextAttributeBtn
                                    onClickHandler={() => {
                                       setSelectedAttributeValueFromCart({
                                          productId: product.id,
                                          attributeId: attribute.id, attributeValue: item.id
                                       })
                                    }}
                                    key={item.id}
                                    children={item.value}
                                    selected={this.isSelected(attribute.id, item.id)}
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
                                    selected={this.isSelected(attribute.id, item.id)}
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
               <div className={"bag-item__count count"}>
                  <div onClick={() => setCountProduct({ productId: product.id, step: 'inc' })}
                     className={cartPopUp ? "count__increment in-popup" : "count__increment"}>
                  </div>
                  <div className={cartPopUp ? "count__number in-popup" : "count__number"}>{product.count}</div>
                  <div onClick={() => setCountProduct({ productId: product.id, step: 'dec' })}
                     className={cartPopUp ? "count__decrement in-popup" : "count__decrement"}>
                  </div>
               </div>
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