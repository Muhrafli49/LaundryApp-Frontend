import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, roles, ...rest }) => {
    const token = localStorage.getItem('token');
    const user = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decode token to get user data

    if (!user) {
        // Jika tidak ada user, arahkan ke halaman login
        return <Navigate to="/" />;
    }

    if (roles && roles.indexOf(user.role) === -1) {
        // Jika peran user tidak sesuai dengan yang diizinkan, arahkan ke halaman yang sesuai
        return <Navigate to={user.role === 'admin' ? '/dashboard/admin' : '/dashboard'} />;
    }

    // Jika user valid dan peran sesuai, render komponen yang diminta
    return <Component {...rest} />;
};

export default ProtectedRoute;
