import React from 'react';
import './Button.css';

export default function Button(props) {
    const { children, appearance, onClick } = props;
    return (
      <button className={`button ${appearance}`} onClick={onClick}>
        {children}
      </button>
    );
}
