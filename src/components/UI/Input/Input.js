import React from 'react';

import classes from './input.module.css';

const Input = (props) => {
    let inputElement = null;
    let messageError = null;
    const inputClasses = [classes.InputElement];

    if (props.valid && !props.valid.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        messageError = <p className={classes.ValidationError}>{props.valid.message}</p>;
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig} 
                value={props.value}
                onChange={props.onChange} />;
            break;
        case 'textarea':
            inputElement = <textarea className={inputClasses.join(' ')}  
                {...props.elementConfig} 
                value={props.value} 
                onChange={props.onChange} />;
            break;
        case 'select':
            const elementConfig = {...props.elementConfig};
            let options = elementConfig.options;
            delete elementConfig.options; 
            inputElement = <select className={inputClasses.join(' ')} 
                {...elementConfig}
                value={props.value} 
                onChange={props.onChange} >
                {options.map(option =>
                    <option key={option.key} value={option.value}>{option.key}</option>)}
            </select>;
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} />;
            break;
    }
    return (
        <div>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {messageError}
        </div>
    );
}

export default Input;