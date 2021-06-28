import React, { useEffect, useState } from 'react';
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


export const BurgerBuilder  = (props) => {
  const {setupIngredients} = props;
  const [checkingOut, setCheckingOut] = useState(false);

  const checkOutHandler = () => {
    if (props.isAuth) {
      setCheckingOut(true);
    }
    else {
      props.purchaseInit();
      props.setRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  useEffect(() => {
    if (!props.buildingBurger && props.redirectPath === '/') {
      setupIngredients();
    }
  }, [props.buildingBurger, props.redirectPath, setupIngredients]);

  const checkOutCanceledHandler = () => {
    setCheckingOut(false);
  }

  const checkout = () => {
    props.purchaseInit();
    props.history.push('/checkout');
  }

  
  const ingredientsDisabled = { ...props.ingrs };

  for (const ingredient in ingredientsDisabled) {
    ingredientsDisabled[ingredient] = ingredientsDisabled[ingredient] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

  if (props.ingrs) {
    burger = (
      <Auxiliary>
        <Burger ingredients={props.ingrs} />
        <BuildControls
          isAuth={props.isAuth}
          checkingOut={checkOutHandler}
          price={props.total.toFixed(2)}
          disabled={ingredientsDisabled}
          addIngredient={event => props.addIngredient(event.currentTarget.value)}
          removeIngredient={event => props.removeIngredient(event.currentTarget.value)} />
      </Auxiliary>
    );

    orderSummary = <OrderSummary
      ingredients={props.ingrs}
      checkoutCancelled={checkOutCanceledHandler}
      checkout={checkout}
      price={props.total.toFixed(2)} />
  }

  return (
    <Auxiliary>
      <Modal show={checkingOut} clicked={checkOutCanceledHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxiliary>
  );
};

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