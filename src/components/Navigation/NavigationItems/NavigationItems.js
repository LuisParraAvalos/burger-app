import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem exact link='/'>Burger Builder</NavigationItem>
        {props.isAuth ? <NavigationItem exact link='/orders'>Orders</NavigationItem> : null }
        {props.isAuth ? <NavigationItem exact link='/logout'>Log out</NavigationItem> :
        <NavigationItem exact link='/auth'>Log In</NavigationItem>}
    </ul>
);

export default NavigationItems;