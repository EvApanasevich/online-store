import React from 'react';
import "./Button.scss";

export class Button extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
      }
   }

   render() {
      const { onClickHandler } = this.props
      return (
         <div onClick={() => onClickHandler()} className={`button ${this.props.modStyle}`}>{this.props.children}</div>
      )
   }
}