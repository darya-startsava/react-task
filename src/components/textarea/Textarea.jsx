import React from 'react';
import './Textarea.css';

export default class Textarea extends React.Component {
  render() {
    const { name, label, rows, placeholder, message, onChange, isValid, value } = this.props;
    const messageClass = !isValid ? 'error_message' : 'inform_message';
    return (
      <>
        <label>
          {label}
          <textarea
            className="textarea_text"
            name={name}
            rows={rows}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
        </label>
        <div className={messageClass}>{message}</div>
      </>
    );
  }
}
