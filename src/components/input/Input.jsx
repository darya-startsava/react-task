import React from 'react';
import './Input.css';

export default function Input(props) {
  const { name, type, label, placeholder, message, onChange, value } = props;
  return (
    <>
      <label>
        {label}
        <input
          className="input"
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
      </label>
      <div className="error_message">{message}</div>
    </>
  );
}
