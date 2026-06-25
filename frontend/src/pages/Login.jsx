import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { API_URL, SERVER_URL } from "../config/api";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/auth/login`,
                { email, password }
            );
            if(response.data.success) {
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                if(response.data.user.role === "admin") {
                    navigate('/admin-dashboard')
                } else {
                    navigate("/employee-dashboard")
                }
            }

            console.log(response);

        } catch (error) {
            if(error.response && !error.response.data.success){
                setError(error.response.data.error);
            }else{
                setError("Server error");
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6">

            <h2 className="font-sevillana text-3xl text-white">
                Employee Management System Working
            </h2>

            <div className="border shadow p-6 w-80 bg-white">

                <h2 className="text-2xl font-bold mb-4">
                    Login
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            className="w-full px-3 py-2 border"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            className="w-full px-3 py-2 border"
                            placeholder="*****"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 mb-4">
                        {error}
                    </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Login;