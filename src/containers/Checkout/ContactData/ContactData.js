import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreator from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateState, validate } from '../../../shared/utility';

const ContactData = (props) => {

  const [form, setForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        label: "Name",
        name: 'name',
        type: 'text',
        placeholder: 'Your name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: { valid: false, message: '' },
      touched: false
    },
    email: {
      elementType: 'input',
      elementConfig: {
        label: "Email",
        name: 'email',
        type: 'email',
        placeholder: 'Email'
      },
      value: '',
      validation: {
        required: true,
        isEmail: true
      },
      valid: { valid: false, message: '' },
      touched: false
    },
    street: {
      elementType: 'input',
      elementConfig: {
        label: "Street",
        name: 'street',
        type: 'text',
        placeholder: 'Street'
      },
      value: '',
      validation: {
        required: true
      },
      valid: { valid: false, message: '' },
      touched: false
    },
    postalCode: {
      elementType: 'input',
      elementConfig: {
        label: "Postal code",
        name: 'postalCode',
        type: 'text',
        placeholder: 'Postal code'
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5
      },
      valid: { valid: false, message: '' },
      touched: false
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        name: 'deliveryMethod',
        options: [
          { key: 'Fastest', value: 'fastest' },
          { key: 'Cheap', value: 'cheap' }
        ]
      },
      value: 'fastest',
      valid: { valid: true },
    }
  });

  const [formValid, setFormValid] = useState(false);

  const handleSubmit = (event) => {
    // console.log("Ordering!");
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    Object.keys(form).forEach(key => {
      const element = form[key];
      formData[key] = element.value;
    });
    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId
    }
    props.submitCurrentOrder(order, props.token);
  }

  const onInputChangeHandler = (event, name) => {

    const updatedForm = updateState(form, {
      [name]: updateState(form[name], {
        value: event.target.value,
        valid: validate(event.target.value, form[name]),
        touched: true
      })
    });
    // updatedForm[name] = updatedElement;
    // console.log(`${name} is valid: ${updatedElement.valid.valid}`);
    let formValid = true;
    Object.keys(updatedForm).forEach(key => {
      const element = updatedForm[key];
      formValid = element.valid.valid && formValid;
      // console.log(`key: ${key} valid: ${element.valid.valid} FormValid:${formValid}`);
    });

    setForm(updatedForm);
    setFormValid(formValid);
  }

  const inputNames = Object.keys(form);
  const inputElements = inputNames.map(key =>
    <Input key={key}
      elementType={form[key].elementType}
      elementConfig={form[key].elementConfig}
      value={form[key].value}
      valid={form[key].valid}
      shouldValidate={form[key].validation}
      touched={form[key].touched}
      onChange={(event) => onInputChangeHandler(event, key)} />);

  return (
    props.loading ? <Spinner /> :
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        <h5>Price: ${props.totalPrice.toFixed(2)}</h5>
        <form onSubmit={handleSubmit}>
          {inputElements}
          <Button disabled={!formValid} btnType="Success" type="submit">ORDER</Button>
        </form>
      </div>
  );

};

const mapStateToProps = state => {
  return {
    ingredients: state.ings.ingredients,
    totalPrice: state.ings.totalPrice,
    loading: state.orders.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchersToProps = dispatch => {
  return {
    submitCurrentOrder: (order, token) => dispatch(actionCreator.postOrder(order, token))
  }
};


export default connect(mapStateToProps, mapDispatchersToProps)(withErrorHandler(ContactData, axios));