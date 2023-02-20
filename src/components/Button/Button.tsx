import React from "react";
import './button.scss';

export interface ButtonProps {
  label: string;
}

const Button = (props: ButtonProps) => {
  return <button className='msh-button'>{props.label}</button>;
};

export default Button;