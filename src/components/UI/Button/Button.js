import React from 'react';
import classes from './Button.module.css'

const Button = (props) => (
    <button 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}  
        type={props.type ? props.type : "button"}
        disabled={props.disabled}>{props.children}</button>
);

export default Button;