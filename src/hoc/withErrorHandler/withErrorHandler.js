
import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
import httpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return ((props) => {
        
        const [error, dismissModal] = httpErrorHandler(axios); 
        
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