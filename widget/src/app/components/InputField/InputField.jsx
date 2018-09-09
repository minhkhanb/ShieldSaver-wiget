import React, { Component } from 'react';
import './InputField.scss';

class InputField extends Component {
  constructor(props) {
    super(props);
    this.inputEl = React.createRef();
  }

  onChange(event) {
    if (this.props.onChange && this.props.onChange.constructor === Function) {
      this.props.onChange(event, event.target.value);
    }
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="group-input-field">
        <label className="input-field-label" htmlFor={this.props.name} onClick={() => this.inputEl.current.focus()}>
          {this.props.label || ''}
          { this.props.required && (
            <span className="input-field-required">*</span>
          )}
        </label>
        <input
          className={
            `input-field
            ${this.props.uppercase ? 'uppercase' : ''}
            ${this.props.name === 'zip_code'? 'zip_code' : ''}
            ${this.props.name === 'phone'? 'phone' : ''}`
          }
          ref={this.inputEl}
          type={this.props.type}
          name={this.props.name}
          maxLength={this.props.maxLength}
          placeholder={this.props.placeholder || ''}
          onKeyUp={(evt) => this.onChange(evt)}
          onBlur={(evt) => this.onChange(evt)}
          onChange={evt => this.onChange(evt)}
          value={this.props.data !== undefined ? this.props.data : ''}
        />
        <div className="error" >{errors}</div>
      </div>
    );
  }
}

export default InputField;
