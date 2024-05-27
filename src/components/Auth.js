import axios from 'axios';


const setAuthToken = (token) => {
    if (token) {
        // If a token exists, set the Authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // If no token exists, remove the Authorization header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;
