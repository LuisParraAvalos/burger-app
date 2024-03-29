import React from 'react';

import classes from './SideDrawer.module.css'

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

const SideDrawer = (props) => {
  let sideDrawerClass = [classes.SideDrawer, classes.Close];
  if (props.open) {
    sideDrawerClass = [classes.SideDrawer, classes.Open];
  }
  return (
    <Auxiliary>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={sideDrawerClass.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}><Logo /></div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Auxiliary>
  );
};

export default SideDrawer;