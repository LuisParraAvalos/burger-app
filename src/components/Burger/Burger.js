import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient, { INGREDIENTS } from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {

  let transformedIngredients = Object.keys(props.ingredients)
    .flatMap(
      ingKey => [...Array(props.ingredients[ingKey])].map(
        (_, index) => <BurgerIngredient key={ingKey + index} type={ingKey} />
      )
    );
  
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add more ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={INGREDIENTS.BreadTop} />
      {transformedIngredients}
      <BurgerIngredient type={INGREDIENTS.BreadBottom} />
    </div>
  );
};

export default Burger;