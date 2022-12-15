import React from 'react';
import './Input.css';

export default class Input extends React.Component {
  render() {
    const { type, label, placeholder } = this.props;
    return (
      <label>
        {label}
        <input className="input" type={type} placeholder={placeholder} />
      </label>
    );
  }
}
