

import { useEffect, useState } from 'react';
// import { API_Auth_Refresh } from '../API/Api';

const TokenRefresh = ({ children }) => {
    const [tokenExpiryTime, setTokenExpiryTime] = useState(null);

    const handleTokenRefresh = async () => {
        try {
            const currentRefreshToken = localStorage.getItem("refreshToken");
            const response = await fetch("");
            if (response.ok) {
                const data = await response.json();
                document.cookie = `token=${data.access_token}; path=/`; // Store access token in cookies
                localStorage.setItem("refreshToken", data.refresh_token);
                const expiryTime = calculateExpiryTime(data.access_token);
                setTokenExpiryTime(expiryTime);
            } else {
                console.error("Failed to refresh token:", response.statusText);

            }
        } catch (error) {
            console.error("Error while refreshing token:", error);

        }
    };

    const calculateExpiryTime = (accessToken) => {
        // Parse the expiry time from the access token
        const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
        const expiryTime = tokenPayload.exp * 1000;
        return expiryTime;
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const expiryTime = calculateExpiryTime(token);
            setTokenExpiryTime(expiryTime);
        }
    }, []);

    useEffect(() => {
        const checkTokenExpiration = () => {
            const currentTime = Date.now();
            if (tokenExpiryTime && tokenExpiryTime < currentTime) {
                handleTokenRefresh();
            }
        };

        const remainingTime = tokenExpiryTime - Date.now();
        if (remainingTime > 0) {
            const timeout = setTimeout(handleTokenRefresh, remainingTime);
            return () => clearTimeout(timeout);
        } else {
            handleTokenRefresh();
        }
    }, [tokenExpiryTime]);

    return children;
};

export default TokenRefresh;
