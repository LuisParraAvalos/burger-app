import React from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import BuildControls from '../../components/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/index';


export class BurgerBuilder extends React.Component {
  state = {
    checkingOut: false
  };

  checkOutHandler = () => {
    if (this.props.isAuth) {
      this.setState((prevState, _) => ({ checkingOut: true }));
    }
    else {
      this.props.purchaseInit();
      this.props.setRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  }

  componentDidMount() {
    // console.log("componentDidMount");
    if (!this.props.buildingBurger && this.props.redirectPath === '/') {
      this.props.setupIngredients();
    }
  }

  checkOutCCanceledHandler = () => {
    this.setState(() => ({ checkingOut: false }));
  }

  checkout = () => {
    this.props.purchaseInit();
    this.props.history.push('/checkout');
  }

  render = () => {
    const ingredientsDisabled = { ...this.props.ingrs };

    for (const ingredient in ingredientsDisabled) {
      ingredientsDisabled[ingredient] = ingredientsDisabled[ingredient] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.props.ingrs) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ingrs} />
          <BuildControls
            isAuth={this.props.isAuth}
            checkingOut={this.checkOutHandler}
            price={this.props.total.toFixed(2)}
            disabled={ingredientsDisabled}
            addIngredient={event => this.props.addIngredient(event.currentTarget.value)}
            removeIngredient={event => this.props.removeIngredient(event.currentTarget.value)} />
        </Auxiliary>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ingrs}
        checkoutCancelled={this.checkOutCCanceledHandler}
        checkout={this.checkout}
        price={this.props.total.toFixed(2)} />
    }
    // Removed since we pass axios to redux async actions
    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Auxiliary>
        <Modal show={this.state.checkingOut} clicked={this.checkOutCCanceledHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingrs: state.ings.ingredients,
    total: state.ings.totalPrice,
    error: state.ings.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.ings.building,
    justSold: state.ings.justSold,
    redirectPath: state.ings.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setupIngredients: () => {
      dispatch(actionCreator.setupIngredients());
    },
    addIngredients: (ingredients, total) => {
      dispatch(actionCreator.addIngredients(ingredients, total));
    },
    removeIngredients: (ingredients, total) => {
      dispatch(actionCreator.removeIngredients(ingredients, total));
    },
    addIngredient: (ingredient) => {
      dispatch(actionCreator.addIngredient(ingredient));
    },
    removeIngredient: (ingredient) => {
      dispatch(actionCreator.removeIngredient(ingredient));
    },
    purchaseInit: () => dispatch(actionCreator.purchaseInit()),
    setRedirectPath: (path) => dispatch(actionCreator.setRedirectPath(path))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));