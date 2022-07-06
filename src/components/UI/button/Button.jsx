import React from 'react';
import './Button.scss';

export class Button extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   render() {
      const { onClickHandler, modStyle, children} = this.props

      return (
         <div onClick={() => onClickHandler()} className={`button ${modStyle}`}>{children}</div>
      )
   }
}