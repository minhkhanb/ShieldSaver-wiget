import React from 'react';
import './Button.scss';

const Button = (props) => (
  <button
    disabled={props.disabled}
    type={props.type}
    className={
      `button
      ${props.disabled ? 'disabled' : ''}
      ${props.primary ? 'button-primary' : 'button-default'} ${props.block ? 'button-block' : ''}`
    }
    text={props.text || 'Button'}
    onClick={() => props.onClick()}>
    {props.text || 'Button'}
  </button>
);

export default Button;
