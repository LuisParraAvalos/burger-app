import { useEffect, useState } from 'react';

const HttpErrorHandler = httpClient => {

    const httpClientRequest = httpClient.interceptors.request; 
    const httpClientResponse = httpClient.interceptors.response; 

    const [error, setError] = useState(null);

    const dismissModal = () => setError(null);

    const reqInterceptor = httpClientRequest.use(req => {
        setError(null);
        return req;
    }, err => {
        setError(err);
        return Promise.reject(err);
    });

    const resInterceptor = httpClientResponse.use(res => { return res; }, err => {
        setError(err);
        return Promise.reject(err);
    });

    useEffect(() => {
        //Only clear interceptor on Cleanup options
        return () => {
            httpClientRequest.eject(reqInterceptor);
            httpClientResponse.eject(resInterceptor);
        };
    }, [httpClientRequest, httpClientResponse, reqInterceptor, resInterceptor]);

    return [error, dismissModal];
};

export default HttpErrorHandler;