import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import * as actions from '../../store/actions/index';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {

  componentDidMount() {
    // this.parseIngredients();
  }

  // Not necessary after Redux
  // parseIngredients = () => {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   // const ingredients = Object.fromEntries(query);
  //   let totalPrice = 0;
  //   for (const param of query) {
  //     if (param[0] === 'price') {
  //       totalPrice = +param[1];
  //     }
  //     else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   console.log(ingredients);
  //   console.log(totalPrice);
  //   this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  // }

  onCancelHandler = () => {
    this.props.clearOrder();
    this.props.history.replace('/');
  }

  onSuccessHandler = () => {
    this.props.history.push(this.props.match.url + "/contact-data");
  }

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients) {
      const purchasing = this.props.purchasing ? null : <Redirect to="/" />
      summary = (
        <div>
          {purchasing}
          <CheckoutSummary
            onCancelHandler={this.onCancelHandler}
            onSuccessHandler={this.onSuccessHandler} />
          <Route path={this.props.match.url + "/contact-data"} component={ContactData} />
        </div>
      );
    }

    return summary;
  }
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