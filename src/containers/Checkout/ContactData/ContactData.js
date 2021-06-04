import React from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';

import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actionCreator from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateState, validate } from '../../../shared/utility';

class ContactData extends React.Component {

  state = {
    form: {
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
    },
    formValid: false
  };

  handleSubmit = (event) => {
    // console.log("Ordering!");
    event.preventDefault();
    // this.setState({ loading: true });
    const formData = {};
    Object.keys(this.state.form).forEach(key => {
      const element = this.state.form[key];
      formData[key] = element.value;
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId
    }
    this.props.submitCurrentOrder(order, this.props.token);
  }

  onInputChangeHandler = (event, name) => {
    // console.log("input changed!", event.target.value, name);

    // const updatedForm = { ...prevState.form };

    // const updatedElement = { ...updatedForm[name] };

    /*       if (updatedElement.validation) {
            updatedElement.valid = this.validate(updatedElement);
            updatedElement.touched = true;
          } */
    const updatedForm = updateState(this.state.form, {
      [name]: updateState(this.state.form[name], {
        value: event.target.value,
        valid: validate(event.target.value, this.state.form[name]),
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

    this.setState({ form: updatedForm, formValid: formValid });
  }

  render() {
    const inputNames = Object.keys(this.state.form);
    const inputElements = inputNames.map(key =>
      <Input key={key}
        elementType={this.state.form[key].elementType}
        elementConfig={this.state.form[key].elementConfig}
        value={this.state.form[key].value}
        valid={this.state.form[key].valid}
        shouldValidate={this.state.form[key].validation}
        touched={this.state.form[key].touched}
        onChange={(event) => this.onInputChangeHandler(event, key)} />)
    return (
      this.props.loading ? <Spinner /> :
        <div className={classes.ContactData}>
          <h4>Enter your Contact Data</h4>
          <h5>Price: ${this.props.totalPrice.toFixed(2)}</h5>
          <form onSubmit={this.handleSubmit}>
            {inputElements}
            <Button disabled={!this.state.formValid} btnType="Success" type="submit">ORDER</Button>
          </form>
        </div>
    );
  }
}

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