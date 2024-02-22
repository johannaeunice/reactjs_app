import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

const SignUpForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        passwordConfirmation: ''
    });

    const [errors, setErrors] = useState({});

    const [post, setPost] = useState({
                name: '',
                email: '',
                phone: '',
                password: '',
                passwordConfirmation: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
    };
const handleInput= (event)=>{
            setPost({...post, [event.target.name] : event.target.value})
        }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
            console.log(formData);
            setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                passwordConfirmation: ''
            });
        } else {
            setErrors(validationErrors);
        }
        axios.post('https://le-nkap-v1.onrender.com/users', post)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    };

    
    const validateForm = (formData) => {
        const errors = {};
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        }
        if (!formData.phone.trim()) {
            errors.phone = 'Phone is required';
        }
        if (!formData.password.trim()) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        }
        if (!formData.passwordConfirmation.trim()) {
            errors.passwordConfirmation = 'Confirm Password is required';
        } else if (formData.password !== formData.passwordConfirmation) {
            errors.passwordConfirmation = 'Passwords do not match';
        }
        return errors;
    };

    

    return (
        <div className="max-w-md mx-auto mt-8 bg-purple-200 p-5">
            <form onSubmit={handleSubmit} className="bg-white w-1/2 shadow-md rounded-xl px-8 pt-6 pb-8 m-5">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name && 'border-red-500'}`}
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onInput={handleInput}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email && 'border-red-500'}`}
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onInput={handleInput}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone && 'border-red-500'}`}
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onInput={handleInput}
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password && 'border-red-500'}`}
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        onInput={handleInput}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirmation">
                        Confirm Password
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.passwordConfirmation && 'border-red-500'}`}
                        id="passwordConfirmation"
                        type="password"
                        placeholder="Confirm your password"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        onChange={handleChange}
                        onInput={handleInput}
                        required
                    />
                    {errors.passwordConfirmation && <p className="text-red-500 text-xs italic">{errors.passwordConfirmation}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <p className='mt-3'>
                        Already Have An Account ? <Link to='/login' className='text-sm text-purple-600 font-semibold hover:text-purple-950'>Click Here!</Link>
                    </p>
                    <button
                        className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mb-3"
                        type="submit" >
                        Sign Up
                    </button>      
                    
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
