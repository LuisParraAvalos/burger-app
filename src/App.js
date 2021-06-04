import React from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncLogout = asyncComponent(() => import('./containers/Auth/Logout/Logout'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

class App extends React.Component {

  componentDidMount() {
    this.props.checkAuthState();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={asyncLogout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchersToProps = dispatch => {
  return {
    checkAuthState: () => dispatch(actions.checkAuthState())
  };
};

export default connect(mapStateToProps, mapDispatchersToProps)(App);
