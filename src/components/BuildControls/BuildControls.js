import React from 'react';

import classes from './BuildControls.module.css';
import { INGREDIENTS } from '../Burger/BurgerIngredient/BurgerIngredient';
import BuildControl from './BuildControl/BuildControl';
import { connect } from 'react-redux';

const controls = [
  { label: 'Salad', type: INGREDIENTS.Salad },
  { label: 'Bacon', type: INGREDIENTS.Bacon },
  { label: 'Cheese', type: INGREDIENTS.Cheese },
  { label: 'Meat', type: INGREDIENTS.Meat },
];

const BuildControls = (props) => {
  const sum = Object.values(props.ingredients).reduce((sum, el) => sum + el, 0);
  const purchasable = sum > 0;

  return (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>${props.price}</strong></p>
      {controls.map(control => (
        <BuildControl
          key={control.label}
          label={control.label}
          type={control.type}
          disabled={props.disabled[control.type]}
          add={props.addIngredient}
          remove={props.removeIngredient} />
      ))}
      <button 
        className={classes.OrderButton}
        disabled={!purchasable}
        onClick={props.checkingOut}>{props.isAuth ? 'ORDER NOW' : 'LOG IN TO ORDER'}</button>
    </div>
  );
};

const mapStateToProps = state => {
  return { ingredients: state.ings.ingredients };
};

export default connect(mapStateToProps)(BuildControls);