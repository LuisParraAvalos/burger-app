import React from 'react';

import Logo from '../../Logo/Logo';
import Menu from '../../Navigation/Menu/Menu';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Toolbar.module.css'

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.Menu}>
        <Menu onClick={props.toogleDrawer} /> 
      </div>
      <div className={classes.Logo}><Logo /></div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuth={props.isAuth} />
      </nav>
    </header>
  );
};

export default Toolbar;