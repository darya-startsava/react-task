import React from 'react';
import './Input.css';

export default class Input extends React.Component {
  render() {
    const { name, type, label, placeholder, message, onChange } = this.props;
    return (
      <>
        <label>
          {label}
          <input className="input" name={name} type={type} placeholder={placeholder} onChange={onChange} />
        </label>
        <div className="error_message">{message}</div>
      </>
    );
  }
}
