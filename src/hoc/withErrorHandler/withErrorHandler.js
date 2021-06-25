
import React, { useEffect, useState } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return ((props) => {
        const [error, setError] = useState(null);

        const dismissModal = () => setError(null);

        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
            return req;
        }, err => {
            setError(err);
            return Promise.reject(err);
        });

        const resInterceptor = axios.interceptors.response.use(res => { return res; }, err => {
            setError(err);
            return Promise.reject(err);
        });

        useEffect(() => {
            //Only clear interceptor on Cleanup options
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        
        // console.log("Error HOC: " + state.error);
        return (
            <Auxiliary>
                <Modal show={error} clicked={dismissModal} >
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Auxiliary>
        );
    });
};

export default withErrorHandler;