import React from "react";
import './InputDate.css';

export default class InputDate extends React.Component {

  render() {
    const { label, placeholder } = this.props;
    return (
      <label>{label}<input className="input_date" type="date" placeholder={placeholder} /></label>
    );
  }
}