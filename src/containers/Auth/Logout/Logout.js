import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as actions from '../../../store/actions/index';

class Logout extends React.Component {

    componentDidMount() {
        this.props.clearOrder();
        this.props.onLogout();
    }

    render() {
        return <Redirect to="/" />
    }
}

const mapDispatchersToProps = dispatch => {
    return {
        clearOrder: () => dispatch(actions.clearOrder()),
        onLogout: () => dispatch(actions.logout())
    };
}

export default connect(null, mapDispatchersToProps)(Logout);