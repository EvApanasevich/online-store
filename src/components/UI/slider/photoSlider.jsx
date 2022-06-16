import React from 'react';
import './photoSlider.scss';

export class PhotoSlider extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         position: 0,
         offset: -192,
      }
   }
   next() {
      if (this.state.position > this.state.offset * (this.props.product.gallery.length - 1)) {
         this.setState({ position: this.state.position + this.state.offset })
      } else {
         this.setState({ position: 0 })
      }
   }
   prev() {
      if (this.state.position < 0) {
         this.setState({ position: this.state.position - this.state.offset })
      } else {
         this.setState({ position: this.state.offset * (this.props.product.gallery.length - 1) })
      }
   }

   render() {
      const { product, enlargePhoto } = this.props

      return (
         <div className={"photo-slider"}>
            <div style={{ transform: `translateX(${this.state.position}px)` }} className={"photos-line"}>
               {product.gallery.map(photo =>
                  <img onClick={() => enlargePhoto(photo)} key={product.gallery.indexOf(photo)} src={photo} alt="product" />
               )}
            </div>
            {product.gallery.length > 1 &&
               <>
                  <div onClick={() => this.prev()} className={"prev-arrow"}></div>
                  <div onClick={() => this.next()} className={"next-arrow"}></div>
               </>
            }
         </div>
      )
   }
}