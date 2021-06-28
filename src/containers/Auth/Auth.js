import React, { useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";
import { Redirect } from "react-router";
import { updateState, validate } from '../../shared/utility';

const Auth = (props) => {
    const {setRedirectPath} = props;

    const [form, setForm] = useState({
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
    });
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        if (!props.buildingBurger && props.redirectPath !== '/') {
            setRedirectPath('/');
        }
    }, [props.buildingBurger, props.redirectPath, setRedirectPath]);


    const handleSubmit = (event) => {
        // console.log("Loog In!");
        event.preventDefault();
        props.auth(form.email.value, form.password.value, isSignUp);
    }

    const onInputChangeHandler = (event, name) => {
        // console.log("input changed!", event.target.value, name);

        // const updatedElement = { ...updatedForm[name] };
        const updatedElement = updateState(form[name], {
            value: event.target.value,
            valid: validate(event.target.value, form[name]),
            touched: true
        });

        // updatedForm[name] = updatedElement;
        // const updatedForm = { ...prevState.form };
        const updatedForm = updateState(form, {
            [name]: updatedElement
        });
        // console.log(`${name} is valid: ${updatedElement.valid.valid}`);

        setForm(updatedForm);
    }

    const switchMode = () => {
        setIsSignUp(!isSignUp);
    }

    if (props.isAuth) {
        return <Redirect to={props.redirectPath} />
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

    let formHeader = 'Log in';
    let methodQuestion = 'Don\'t have an account yet?';
    let submitText = 'Log in';

    if (isSignUp) {
        formHeader = 'Sign up';
        methodQuestion = 'Already have an account?';
        submitText = 'Sign up';
    }
    let switchDescriptor =
        <small onClick={switchMode}>
            {methodQuestion} <ins style={{ color: "#40A4C8" }}>{submitText}</ins>
        </small>;

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p className={classes.Error}>
            {props.error.response.data.error.message}</p>;
    }

    return (
        props.authenticating ? <Spinner /> :
            <div className={classes.Auth}>
                <h1>{formHeader}</h1>
                {errorMessage}
                <form onSubmit={handleSubmit}>
                    {inputElements}
                    {switchDescriptor}
                    <br />
                    <Button btnType="Success" type="submit">{submitText}</Button>
                </form>
            </div>
    );
};

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