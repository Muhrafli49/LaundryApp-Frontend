import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setError('');
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setError('');
    }

    const submitLogin = () => {
        setIsLoading(true);
        const data = {
            username: username,
            password: password
        };
        axios.post('http://localhost:5000/login', data)
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                const role = response.data.user.role; // Mendapatkan role dari respons
                setTimeout(() => {
                    if (role === 'admin') {
                        navigate('/dashboard/admin');
                    } else {
                        navigate('/dashboard');
                    }
                }, 1500);
            }
        })
        .catch(error => {
            setError(error.response?.data?.message || 'Terjadi kesalahan');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-amber-500" style={{ backgroundColor: '#ED9455' }}>
            <div className="max-w-xl w-full mx-auto mt-5">
                <div className="rounded-xl shadow-md px-10 py-8 mb-4" style={{ backgroundColor: '#FFFBDA' }}>
                    <h1 className="text-3xl font-bold text-center mb-4">Bingo Laundry</h1>
                    <h4 className="text-lg text-center mb-4 text-gray-600">Selamat Datang !!!</h4>
                    {error && (
                            <div className="text-red-600 text-sm mb-3">{error}</div>
                    )}
                    <form onSubmit={(e) => { e.preventDefault(); submitLogin(); }}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input id="username" name="username" type="text" 
                                className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700"
                                placeholder="Username" value={username} onChange={onChangeUsername}/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input id="password" name="password" type="password" 
                                className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 mb-3"
                                placeholder="Password" value={password} onChange={onChangePassword}/>
                        </div>
                        <div className="flex items-center justify-center">
                            <button type="submit" disabled={isLoading} className={`${isLoading ? 'opacity-50 cursor-not-allowed' : ''} text-white font-bold text-lg py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out transform hover:bg-customBlueHover hover:scale-105`} style={{ backgroundColor: '#ED9455', height: '3rem' }}>
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.008 8.008 0 014 12H0c0 4.418 3.582 8 8 8v-4zm14-8a8.008 8.008 0 01-4 6.928V20c4.418 0 8-3.582 8-8h-4zm-2-5.291A8.008 8.008 0 0120 12h4c0-4.427-3.584-8-8-8v4z"></path>
                                    </svg>
                                ) : (
                                    <span>Login</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
