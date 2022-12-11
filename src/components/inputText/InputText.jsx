import React from "react";
import './InputText.css';

export default class InputText extends React.Component {

  render() {
    const { label, placeholder } = this.props;
    return (
      <label>{label}<input className="input_text" type="text" placeholder={placeholder} /></label>
    );
  }
}