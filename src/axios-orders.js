import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reactburgergg-default-rtdb.firebaseio.com/'
});

/* axios.interceptors.request.use(req => req, error => error);

axios.interceptors.response.use(res => res, error => error); */

export default instance;