import axios from 'axios';
import Cookies from 'js-cookie';

export const getUserDetails = () => async (dispatch) => {
    try {
        // Token ko cookie se retrieve karo
        // const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
        const token = Cookies.get('token');
        dispatch({ type: 'USER_DETAILS_REQUEST' });

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.get('http://192.168.1.7:8080/api/get-user-details', config);

        dispatch({
            type: 'USER_DETAILS_SUCCESS',
            payload: data
        });
    } catch (error) {
        dispatch({
            type: 'USER_DETAILS_FAIL',
            payload: error.message
        });
    }
};
