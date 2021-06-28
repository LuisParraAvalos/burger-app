import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../../store/actions/index';

const Logout = (props) => {

    useEffect(() => {
        props.clearOrder();
        props.onLogout();        
    }, []);

    return <Redirect to="/" />
};

const mapDispatchersToProps = dispatch => {
    return {
        clearOrder: () => dispatch(actions.clearOrder()),
        onLogout: () => dispatch(actions.logout())
    };
}

export default connect(null, mapDispatchersToProps)(Logout);