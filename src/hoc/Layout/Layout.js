import React from 'react';

import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.css'
import { connect } from 'react-redux';

class Layout extends React.Component {

  state = {
    sideDrawerOpen: false
  }

  closeDrawerHandler = () => {
    this.setState({sideDrawerOpen: false});
  }
 
  toogleDrawer = () => {
    this.setState((prevState) => ({sideDrawerOpen: !prevState.sideDrawerOpen}));
  }

  render = () => (
    <Auxiliary>
      <Toolbar isAuth={this.props.isAuth} toogleDrawer={this.toogleDrawer}/>
      <SideDrawer isAuth={this.props.isAuth} open={this.state.sideDrawerOpen} closed={this.closeDrawerHandler} />
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Auxiliary>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token != null
  };
};

export default connect(mapStateToProps)(Layout);