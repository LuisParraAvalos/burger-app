import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {

  const ingredients = [];
  for (const key in props.ingredients) {
    if (props.ingredients[key] > 0) {
      ingredients.push(<p key={key}>{key} ({props.ingredients[key]})</p>);
    }
  }

  return (
    <div className={classes.Order} >
      <strong>Ingredients:</strong>
      {ingredients}
      <p> Price: <strong> ${props.price.toFixed(2)}</strong ></p >
    </div >
  );
};

export default Order;