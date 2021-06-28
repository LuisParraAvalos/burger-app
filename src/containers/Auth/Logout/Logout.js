import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../../store/actions/index';

const Logout = (props) => {

    const {clearOrder, onLogout} = props;

    useEffect(() => {
        clearOrder();
        onLogout();        
    }, [clearOrder, onLogout]);

    return <Redirect to="/" />
};

const mapDispatchersToProps = dispatch => {
    return {
        clearOrder: () => dispatch(actions.clearOrder()),
        onLogout: () => dispatch(actions.logout())
    };
}

export default connect(null, mapDispatchersToProps)(Logout);