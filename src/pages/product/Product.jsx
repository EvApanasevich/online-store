import React from 'react';
import './Product.scss';
import { useParams } from 'react-router-dom';
import { TextAttributeBtn } from '../../components/UI/attribute-text-btn/TextAttributeBtn';
import { Button } from '../../components/UI/button/Button';
import { SwatchAttributeBtn } from '../../components/UI/attribute-swatch-btn/SwatchAttributeBtn';

const withRouter = WrappedComponent => props => {
   let params = useParams();
   return (
      <WrappedComponent
         {...props}
         params={params}
      />
   );
};

class Product extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   getPrice(product) {
      const price = product.prices.find(price => price.currency.symbol === this.props.currentCurrency)
      return `${price.currency.symbol}${price.amount}`
   }
   getAttributeStyle(type) {
      if (type === "text") {
         return "product__attribute_text"
      } else if (type === "swatch") {
         return "product__attribute_swatch"
      }
   }
   isSelected(attributeId, attributeItemId) {
      return this.props.product.selectedAttributes.some(selectedAttribute => selectedAttribute.attributeId === attributeId &&
         selectedAttribute.attributeValue === attributeItemId)
   }
   isInCart() {
      return this.props.productsInCartIds.some(id => id === this.props.product.id)
   }
   getDescription() {
      return <div dangerouslySetInnerHTML={{ __html: `${this.props.product.description}` }} />
   }
   componentDidMount() {
      this.props.getProduct(this.props.params.id)
      window.scrollTo(0, 0)
   }

   render() {
      const { status, product, currentPhoto, productsInCartIds, addProductInCart } = this.props
      console.log(product);

      if (status === 'loading') {
         return <div className={"loader__container"}>LOADING...</div>
      }

      return (
         <div className={"product"}>
            <div className={"product__container"}>
               <div className={"product__photoBlock"}>
                  <div className={"product__photo-line"}>
                     {product.gallery.map(photo =>
                        <div key={photo} onClick={() => this.props.setCurrentPhoto(photo)}
                           className={!product.inStock ? "product__photo out-of-stock" : "product__photo"}>
                           <img src={photo} alt="product" />
                        </div>
                     )}
                  </div>
               </div>
               <div className={!product.inStock ? "product__bigPhoto out-of-stock" : "product__bigPhoto"}>
                  <img src={currentPhoto} alt="product" />
               </div>
               <div className={"product__info"}>
                  <div className={"product__brand"}>{product.brand}</div>
                  <div className={"product__name"}>{product.name}</div>
                  <div className={"product__attributes"}>
                     {product.attributes.map(attribute =>
                        <div key={attribute.id} className={"product__attribute"}>
                           <span className={"product__subtitle"}>{attribute.name}:</span>
                           <div className={this.getAttributeStyle(attribute.type)}>
                              {attribute.items.map(item =>
                                 attribute.type === 'text' ?
                                    <TextAttributeBtn
                                       onClickHandler={() => {
                                          this.props.setSelectedAttributeValue({ attributeId: attribute.id, attributeValue: item.id })
                                       }}
                                       key={item.id}
                                       children={item.value}
                                       selected={this.isSelected(attribute.id, item.id)}
                                       disable={!product.inStock}
                                       inCart={this.isInCart()}
                                    />
                                    :
                                    <SwatchAttributeBtn
                                       onClickHandler={() => {
                                          this.props.setSelectedAttributeValue({ attributeId: attribute.id, attributeValue: item.id })
                                       }}
                                       key={item.id}
                                       bgcolor={item.value}
                                       selected={this.isSelected(attribute.id, item.id)}
                                       disable={!product.inStock}
                                       inCart={this.isInCart()}
                                    />
                              )}
                           </div>
                        </div>
                     )}
                  </div>
                  <div className="product__price">
                     <span className={"product__subtitle"}>price:</span>
                     <div className={"product__amount"}>{this.getPrice(product)}</div>
                  </div>
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

export default withRouter(Product)