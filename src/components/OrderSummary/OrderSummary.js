import React from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Button from '../UI/Button/Button';
const OrderSummary = (props) => {

  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingKey => (
      <li key={ingKey}>
        <span style={{ textTransform: "capitalize" }}>{ingKey}: </span>
        {props.ingredients[ingKey]}
      </li>
    ));

  return (
    <Auxiliary>
      <h3>Your Order</h3>
      <p>A burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total price: ${props.price}</strong></p>
      <p>Continue checkout?</p>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={props.checkout}>CONTINUE</Button>
    </Auxiliary>
  );
};

export default OrderSummary;