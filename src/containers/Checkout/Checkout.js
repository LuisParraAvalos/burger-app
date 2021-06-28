import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import * as actions from '../../store/actions/index';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {

  const onCancelHandler = () => {
    props.clearOrder();
    props.history.replace('/');
  }

  const onSuccessHandler = () => {
    props.history.push(props.match.url + "/contact-data");
  }

  let summary = <Redirect to="/" />;
  if (props.ingredients) {
    const purchasing = props.purchasing ? null : <Redirect to="/" />
    summary = (
      <div>
        {purchasing}
        <CheckoutSummary
          onCancelHandler={onCancelHandler}
          onSuccessHandler={onSuccessHandler} />
        <Route path={props.match.url + "/contact-data"} component={ContactData} />
      </div>
    );
  }

  return summary;
}

const mapStateToProps = state => {
  return {
    ingredients: state.ings.ingredients,
    purchasing: state.orders.purchasing
  };
};

const mapDispatcherToProps = dispatch => {
  return {
    clearOrder: () => dispatch(actions.clearOrder())
  };
};


export default connect(mapStateToProps, mapDispatcherToProps)(Checkout);