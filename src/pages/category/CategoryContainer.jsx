import React from 'react';
import { connect } from 'react-redux';
import { Category } from './Category';
import { putProductInCart } from '../../redux/cartSlice';
import { getCategory } from '../../redux/categorySlice';
import { changeCurrentCategory } from '../../redux/appSlice';
import { withRouter } from '../../util/with-router';

export class CategoryContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   componentDidMount() {
      this.props.getCategory(this.props.params.id)
      this.props.changeCurrentCategory(this.props.params.id)
      window.scrollTo(0, 0)
   }
   componentDidUpdate(prevProps) {
      if (this.props.currentCategoryName !== prevProps.currentCategoryName) {
         this.props.getCategory(this.props.params.id)
         window.scrollTo(0, 0)
      }
   }

   render() {
      return (
         <Category getCategory={this.props.getCategory}
            putProductInCart={this.props.putProductInCart}
            productsInCartIds={this.props.productsInCartIds}
            currentCategory={this.props.currentCategory}
            currentCategoryName={this.props.currentCategoryName}
            currentCurrency={this.props.currentCurrency}
            status={this.props.categoryStatus}
         />
      )
   }
}

const mapStateToProps = (state) => {
   return {
      currentCategoryName: state.app.currentCategoryName,
      currentCurrency: state.app.currentCurrency,
      categoryStatus: state.category.categoryStatus,
      currentCategory: state.category.category,
      productsInCartIds: state.cart.products.map(product => product.id),
   }
}

const wrappedCategoryWithRouter = withRouter(CategoryContainer)

export default connect(mapStateToProps, {
   getCategory,
   putProductInCart,
   changeCurrentCategory,
})(wrappedCategoryWithRouter)
