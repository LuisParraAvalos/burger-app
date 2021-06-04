import React from 'react';

import classes from './Menu.module.css';
import { ReactComponent as NavIcon } from '../../../assets/images/menu.svg';

const Menu = (props) => {
  return (
    <div className={classes.Menu} onClick={props.onClick}>
      <NavIcon fill="white" stroke="white" height="100%" />
    </div>
  );
}

export default Menu;