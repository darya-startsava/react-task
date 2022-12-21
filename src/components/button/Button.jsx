import React from 'react';
import './Button.css';

export default class Button extends React.Component {
  render() {
    const { children, appearance, onClick } = this.props;
    return (
      <button className={`button ${appearance}`} onClick={onClick}>
        {children}
      </button>
    );
  }
}
