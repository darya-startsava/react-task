import React from "react";
import './Textarea.css';

export default class Textarea extends React.Component {
  render() {
    const { label, rows, placeholder } = this.props;
    return (
      <label>{label}<textarea className="textarea_text" rows={rows} placeholder={placeholder} /></label>
    );
  }
}