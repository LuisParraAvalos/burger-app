import React, { useEffect, lazy, Suspense } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

const App = (props) => {

  useEffect(() => {
    props.checkAuthState();
    return () => { /* cleanup */ }
  }, []);

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuth) {
    routes = (
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/orders' component={Orders} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={Auth} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
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
