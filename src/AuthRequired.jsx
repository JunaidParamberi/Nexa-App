import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const AuthRequired = ({ children }) => {
    
    const currentUser = useContext(AuthContext);

    if (!currentUser) {
        // Redirect to the login page if user is not authenticated
        return <Navigate to="/login" />;
    }

    // Render children if user is authenticated
    return <>{children}</>;
};

export default AuthRequired;
