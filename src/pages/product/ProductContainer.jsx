import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addProductInCart } from '../../redux/cartSlice';
import { getProduct, setCurrentPhoto, setSelectedAttributeValue } from '../../redux/productSlice';
import { Product } from './Product';

const withRouter = WrappedComponent => props => {
   let params = useParams()
   return (
      <WrappedComponent
         {...props}
         params={params}
      />
   )
}

class ProductContainer extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   componentDidMount() {
      this.props.getProduct(this.props.params.id)
      window.scrollTo(0, 0)
   }

   render() {
      return (
         <Product getProduct={this.props.getProduct}
            setCurrentPhoto={this.props.setCurrentPhoto}
            setSelectedAttributeValue={this.props.setSelectedAttributeValue}
            product={this.props.product}
            currentPhoto={this.props.currentPhoto}
            currentCurrency={this.props.currentCurrency}
            productsInCartIds={this.props.productsInCartIds}
            addProductInCart={this.props.addProductInCart}
            status={this.props.productStatus}
         />
      )
   }
}

const mapStateToProps = (state) => {
   return {
      currentCurrency: state.app.currentCurrency,
      productsInCartIds: state.cart.products.map(product => product.id),
      productStatus: state.product.productStatus,
      product: state.product.product,
      currentPhoto: state.product.currentPhoto,
   }
}

const withR = withRouter(ProductContainer)

export default connect(mapStateToProps, {
   getProduct,
   setSelectedAttributeValue,
   setCurrentPhoto,
   addProductInCart,
})(withR)