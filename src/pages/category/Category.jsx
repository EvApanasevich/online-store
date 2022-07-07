import React from 'react';
import { ProductCard } from '../../components/product-card/ProductCard';
import './Category.scss';

export class Category extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   
   render() {
      const { currentCategory, currentCategoryName, productsInCartIds } = this.props
      
      if (this.props.status === 'loading') {
         return <div className={"loader__container"}>LOADING...</div>
      }

      return (
         <div className={"category"}>
            <div className={"category__container"}>
               <h1 className={"category__name"}>{currentCategoryName}</h1>
               <div className={"category__cards"}>
                  {/* Products cards are rendered */}
                  {currentCategory.products.map(product =>
                     <ProductCard key={product.id}
                        product={product}
                        currentCurrency={this.props.currentCurrency}
                        putProductInCart={this.props.putProductInCart}
                        inCart={productsInCartIds.some(id => id === product.id)}
                     />
                  )}
               </div>
            </div>
         </div>
      )
   }
}