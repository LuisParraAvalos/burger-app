import React, { useState } from 'react';

import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css'
import { connect } from 'react-redux';

const Layout = (props) => {

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const closeDrawerHandler = () => {
    setSideDrawerOpen(false);
  }
 
  const toogleDrawer = () => {
    // this.setState((prevState) => ({sideDrawerOpen: !prevState.sideDrawerOpen}));
    setSideDrawerOpen(!sideDrawerOpen);
  }

  return (
    <Auxiliary>
      <Toolbar isAuth={props.isAuth} toogleDrawer={toogleDrawer}/>
      <SideDrawer isAuth={props.isAuth} open={sideDrawerOpen} closed={closeDrawerHandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Auxiliary>
  );
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  };
};

export default connect(mapStateToProps)(Layout);