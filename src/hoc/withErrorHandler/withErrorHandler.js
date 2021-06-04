
import React, { Component, useEffect, useLayoutEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return (class extends Component {
        state = { error: null };

        dismissModal = () => this.setState({ error: null });

        UNSAFE_componentWillMount() {
            // console.log("Setup!");
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            }, error => {
                this.setState({ error: error });
                return Promise.reject(error);
            });

            this.resInterceptor = axios.interceptors.response.use(res => { return res; }, error => {
                this.setState({ error: error });
                return Promise.reject(error);
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            // console.log("Error HOC: " + this.state.error);
            return (
                <Auxiliary>
                    <Modal show={this.state.error} clicked={this.dismissModal} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    });
};

export default withErrorHandler;