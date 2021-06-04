import React from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import { Redirect } from "react-router";
import {updateState, validate} from '../../shared/utility';

class Auth extends React.Component {

    state = {
        form: {
            email: {
                elementType: 'input',
                elementConfig: {
                    label: "Email",
                    name: 'email',
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: { valid: false, message: '' },
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    label: "Passwword",
                    name: 'password',
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: { valid: false, message: '' },
                touched: false
            }
        },
        loading: false,
        // formValid: false
        isSignUp: false
    };

    componentDidMount(){
        if (!this.props.buildingBurger && this.props.redirectPath !== '/') {
            this.props.setRedirectPath('/');
        }
    }

    handleSubmit = (event) => {
        // console.log("Loog In!");
        event.preventDefault();

        this.props.auth(this.state.form.email.value, 
            this.state.form.password.value,
            this.state.isSignUp);
    }

    onInputChangeHandler = (event, name) => {
        // console.log("input changed!", event.target.value, name);

        // const updatedElement = { ...updatedForm[name] };
        const updatedElement = updateState(this.state.form[name], {
            value: event.target.value,
            valid:  validate(event.target.value, this.state.form[name]),
            touched: true
        });
        
        // updatedForm[name] = updatedElement;
        // const updatedForm = { ...prevState.form };
        const updatedForm = updateState( this.state.form, {
            [name]: updatedElement
        } );
        // console.log(`${name} is valid: ${updatedElement.valid.valid}`);
        /* let formValid = true;
        Object.keys(updatedForm).forEach(key => {
            const element = updatedForm[key];
            formValid = element.valid.valid && formValid;
            // console.log(`key: ${key} valid: ${element.valid.valid} FormValid:${formValid}`);
        }); */
        this.setState({ form: updatedForm });
    }
    
    switchMode = () => {
        this.setState((prevState) => {
            return {isSignUp: !prevState.isSignUp};
        });
    }

    render() {
        if (this.props.isAuth) {
            return <Redirect to={this.props.redirectPath} />
        }

        const inputNames = Object.keys(this.state.form);
        const inputElements = inputNames.map(key =>
            <Input key={key}
                elementType={this.state.form[key].elementType}
                elementConfig={this.state.form[key].elementConfig}
                value={this.state.form[key].value}
                valid={this.state.form[key].valid}
                shouldValidate={this.state.form[key].validation}
                touched={this.state.form[key].touched}
                onChange={(event) => this.onInputChangeHandler(event, key)} />);

        let formHeader = 'Log in';
        let methodQuestion = 'Don\'t have an account yet?';
        let submitText = 'Log in';
        
        if (this.state.isSignUp) {
            formHeader = 'Sign up';
            methodQuestion = 'Already have an account?';
            submitText = 'Sign up';
        }
        let switchDescriptor = 
            <small onClick={this.switchMode}>
                {methodQuestion} <ins style={{color: "#40A4C8"}}>{submitText}</ins>
            </small>;
        
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p className={classes.Error}>
                {this.props.error.response.data.error.message}</p>;
        }

        return (
            this.props.authenticating ? <Spinner /> :
            <div className={classes.Auth}>
                <h1>{formHeader}</h1>
                {errorMessage}
                <form onSubmit={this.handleSubmit}>
                    {inputElements}
                    {switchDescriptor}
                    <br />
                    <Button btnType="Success" type="submit">{submitText}</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authenticating: state.auth.authenticating,
        error: state.auth.error,
        isAuth: state.auth.token != null,
        redirectPath: state.ings.authRedirectPath,
        buildingBurger: state.ings.building
    };
};

const mapDispatchersToProps = dispatch => {
    return {
        auth: (username, pass, isSignUp) => dispatch(actions.auth(username, pass, isSignUp)),
        setRedirectPath: (path) => dispatch(actions.setRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchersToProps)(withErrorHandler(Auth, axios));