import React from 'react';
import './Modal.scss';

export class Modal extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }
   render() {
      const {children, visibleModal, setVisibleModal} = this.props
      
      return (
         <div className={visibleModal ? "modal active" : "modal"} onClick={() => setVisibleModal()}>
            <div className={"modalContent"} >
               {children}
            </div>
         </div>
      )
   }
}

export default Modal