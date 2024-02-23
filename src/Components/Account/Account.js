import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountPage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('https://le-nkap-v1.onrender.com/users');
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-md mx-auto mt-8 bg-purple-200 p-5">
            <div className="bg-white w-1/2 shadow-md rounded-xl px-8 pt-6 pb-8 m-5">
                <h2 className="text-2xl font-bold mb-4">Account Information</h2>
                <div className="mb-4">
                    <p className="text-gray-700 text-sm font-bold mb-2">Name: {userData.name}</p>
                    <p className="text-gray-700 text-sm font-bold mb-2">Email: {userData.email}</p>
                    <p className="text-gray-700 text-sm font-bold mb-2">Phone: {userData.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;
