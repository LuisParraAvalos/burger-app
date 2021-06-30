import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const [checkingOut, setCheckingOut] = useState(false);

  const dispatch = useDispatch();
  
  const onSetupIngredients = useCallback( () => dispatch(actionCreator.setupIngredients()),  [dispatch] );
  // const addIngredients = (ingredients, total) => dispatch(actionCreator.addIngredients(ingredients, total));
  // const removeIngredients = (ingredients, total) => dispatch(actionCreator.removeIngredients(ingredients, total));
  const addIngredient = (ingredient) => dispatch(actionCreator.addIngredient(ingredient));
  const removeIngredient = (ingredient) => dispatch(actionCreator.removeIngredient(ingredient));
  const purchaseInit = () => dispatch(actionCreator.purchaseInit());
  const setRedirectPath = (path) => dispatch(actionCreator.setRedirectPath(path));

  const ingrs = useSelector(state => state.ings.ingredients);
  const total = useSelector(state => state.ings.totalPrice);
  const error = useSelector(state => state.ings.error);
  const isAuth = useSelector(state => state.auth.token !== null);
  const buildingBurger = useSelector(state => state.ings.building);
  const redirectPath = useSelector(state => state.ings.authRedirectPath);

  const checkOutHandler = () => {
    if (isAuth) {
      setCheckingOut(true);
    }
    else {
      purchaseInit();
      setRedirectPath('/checkout');
      props.history.push('/auth');
    }
  }

  useEffect(() => {
    if (!buildingBurger && redirectPath === '/') {
      onSetupIngredients();
    }
  }, [buildingBurger, onSetupIngredients, redirectPath]);

  const checkOutCanceledHandler = () => {
    setCheckingOut(false);
  }

  const checkout = () => {
    purchaseInit();
    props.history.push('/checkout');
  }
  
  const ingredientsDisabled = { ...ingrs };

  for (const ingredient in ingredientsDisabled) {
    ingredientsDisabled[ingredient] = ingredientsDisabled[ingredient] <= 0;
  }

  let orderSummary = null;
  let burger = error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

  if (ingrs) {
    burger = (
      <Auxiliary>
        <Burger ingredients={ingrs} />
        <BuildControls
          isAuth={isAuth}
          checkingOut={checkOutHandler}
          price={total.toFixed(2)}
          disabled={ingredientsDisabled}
          addIngredient={event => addIngredient(event.currentTarget.value)}
          removeIngredient={event => removeIngredient(event.currentTarget.value)} />
      </Auxiliary>
    );

    orderSummary = <OrderSummary
      ingredients={ingrs}
      checkoutCancelled={checkOutCanceledHandler}
      checkout={checkout}
      price={total.toFixed(2)} />
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

export default withErrorHandler(BurgerBuilder, axios);