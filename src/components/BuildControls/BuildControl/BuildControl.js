import React from 'react';

import classes from './BuildControl.module.css';
import minus from '../../../assets/images/minus.svg'
import plus from '../../../assets/images/plus.svg'

const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <button className={classes.Less}
        onClick={props.remove}
        value={props.type}
        disabled={props.disabled}>
        <img src={minus} alt="Less" />
      </button>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.More}
        onClick={props.add}
        value={props.type}>
        <img src={plus} alt="More" />
      </button>
    </div>
  );
};

export default BuildControl;