import React, { Component } from 'react';
import './SelectField.scss';

class SelectField extends Component {
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
    const { errors, block } = this.props;
    return (
      <div className={`group-select-field ${block ? '' : 'row align-items-center'}`}>
        <label
          className={`select-field-label ${block ? 'lbl-block' : 'mb-0 col-xm-12 col-md-5 col-lg-4'}`}
          htmlFor={this.props.name}
          onClick={() => this.inputEl.current.focus()}
        >
          {this.props.label || ''}
          { this.props.required && (
            <span className="select-field-required">*</span>
          )}
        </label>
        {
          this.props.isManual || this.props.isManual === undefined ? (
	          <select
		          name={this.props.name}
		          className={`form-control custom-select ${block ? 'lbl-block' : 'col-xm-12 col-md-7 col-lg-8'}`}
		          ref={this.inputEl}
		          onKeyUp={(evt) => this.onChange(evt)}
		          onBlur={(evt) => this.onChange(evt)}
		          onChange={(evt) => this.onChange(evt)}
              value={`${(this.props.data !== undefined && this.props.data !== 'default') ? this.props.data : 'default'}`}
            >
              <option value='default'>Click to select</option>
		          {this.props.options.map((item, index) => (
			          <option key={index} value={item.code}>{item.name}</option>
		          ))}
	          </select> 
          ) : (
	          <input
		          className={`input-field ${block ? 'lbl-block' : 'col-xm-12 col-md-7 col-lg-8'}`}
		          style={{backgroundColor: '#e4e7ea'}} readOnly={true}
              value={this.props.value !== undefined ? this.props.value : ''}
	          />
          )
        }
        <div className="error" >{errors}</div>
      </div>
    );
  }
}

export default SelectField;
