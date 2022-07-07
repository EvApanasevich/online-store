import React from 'react';
import './Product.scss';
import { TextAttributeBtn } from '../../components/UI/attribute-text-btn/TextAttributeBtn';
import { Button } from '../../components/UI/button/Button';
import { SwatchAttributeBtn } from '../../components/UI/attribute-swatch-btn/SwatchAttributeBtn';
import util from '../../util/common-methods';

export class Product extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   isInCart() {
      return this.props.productsInCartIds.some(id => id === this.props.product.id)
   }
   getDescription() {
      return <div dangerouslySetInnerHTML={{ __html: `${this.props.product.description}` }} />
   }

   render() {
      const { status, product, currentPhoto, productsInCartIds, addProductInCart,
         currentCurrency, setSelectedAttributeValue, } = this.props

      if (status === 'loading') {
         return <div className={"loader__container"}>LOADING...</div>
      }

      return (
         <div className={"product"}>
            <div className={"product__container"}>
               <div className={"product__photoBlock"}>
                  <div className={"product__photo-line"}>
                  {/* Rendering all photos in a reduced form */}
                     {product.gallery.map(photo =>
                        <div key={photo} onClick={() => this.props.setCurrentPhoto(photo)}
                           className={!product.inStock ? "product__photo out-of-stock" : "product__photo"}>
                           <img src={photo} alt='product' />
                        </div>
                     )}
                  </div>
               </div>
               <div className={!product.inStock ? "product__bigPhoto out-of-stock" : "product__bigPhoto"}>
                  <img src={currentPhoto} alt='product' />
               </div>
               <div className={"product__info"}>
                  <div className={"product__brand"}>{product.brand}</div>
                  <div className={"product__name"}>{product.name}</div>
                  <div className={"product__attributes"}>
                     {/* Attributes rendering */}
                     {product.attributes.map(attribute =>
                        <div key={attribute.id} className={"product__attribute"}>
                           <span className={"product__subtitle"}>{attribute.name}:</span>
                           {/* Set attribute styles for the product page */}
                           <div className={util.getAttributeStyle(attribute.type, 'product')}>
                              {attribute.items.map(item =>
                                 attribute.type === 'text' ?
                                    <TextAttributeBtn
                                       onClickHandler={() => {
                                          setSelectedAttributeValue({ attributeId: attribute.id, attributeValue: item.id })
                                       }}
                                       key={item.id}
                                       children={item.value}
                                       selected={util.isSelected(attribute.id, item.id, product)}
                                       disable={!product.inStock}
                                       inCart={this.isInCart()}
                                    />
                                    :
                                    <SwatchAttributeBtn
                                       onClickHandler={() => {
                                          setSelectedAttributeValue({ attributeId: attribute.id, attributeValue: item.id })
                                       }}
                                       key={item.id}
                                       bgcolor={item.value}
                                       selected={util.isSelected(attribute.id, item.id, product)}
                                       disable={!product.inStock}
                                       inCart={this.isInCart()}
                                    />
                              )}
                           </div>
                        </div>
                     )}
                  </div>
                  <div className={"product__price"}>
                     <span className={"product__subtitle"}>price:</span>
                     <div className={"product__amount"}>{util.getPrice(product, currentCurrency)}</div>
                  </div>
                  {/* If the product is not in the cart, show the button otherwise the text "Product in cart" */}
                  {product.inStock && !productsInCartIds.some(id => id === product.id) ?
                     <Button onClickHandler={() => addProductInCart(product)} children={'add to cart'} modStyle={'add-to-cart'} /> :
                     productsInCartIds.some(id => id === product.id) &&
                     <div className={"product__info_in-cart"}>Product in cart</div>}
                  <div className={"product__description"}>{this.getDescription()}</div>
               </div>
            </div>
         </div >
      )
   }
}