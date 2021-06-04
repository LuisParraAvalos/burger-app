import React from 'react';
import { connect } from 'react-redux';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

class CheckoutSummary extends React.Component {

  render(){
    return (
      <div className={classes.CheckoutSummary}>
        <h1>We hope it tastes well!</h1>
        <div style={{width: '100%', margin: 'auto'}}>
          <Burger ingredients={this.props.ingredients} />
        </div>
        <Button 
          btnType="Danger" clicked={this.props.onCancelHandler}>CANCEL</Button>
        <Button
          btnType="Success" clicked={this.props.onSuccessHandler}>CONTINUE</Button>
          
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    ingredients: state.ings.ingredients
  };
};


export default connect(mapStateToProps)(CheckoutSummary);