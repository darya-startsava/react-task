import React from 'react';
import './Button.css';

export default class Button extends React.Component {
  render() {
    const { children, appearance } = this.props;
    return <button className={`button ${appearance}`}>{children}</button>;
  }
}
