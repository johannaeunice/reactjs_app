import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import couple from "./signup.png";

const SignUpForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirmation: ''
  });

  const [errors, setErrors] = useState({});
  const [apiErrorMessage, setApiErrorMessage] = useState(null); // State to manage API error message
  const [successMessage, setSuccessMessage] = useState(null); // State to hold success message
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: '' // Clear specific form field error when user starts filling the form again
    });
    setApiErrorMessage(null); // Clear API error message when user starts filling the form again
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true); // Set loading state to true
      setErrors({}); // Clear all form errors when user submits corrected data
      axios.post('https://le-nkap-v1.onrender.com/users', formData)
        .then(res => {
          console.log(res);
          setSuccessMessage('Successful Registration!');
          setTimeout(() => {
            navigate('/login'); // Use navigate to redirect to login page after a delay
          }, 2000);
        })
        .catch(err => {
          console.log('Error:', err);
          if (err.response && err.response.data && err.response.data.message) {
            setApiErrorMessage(`Error: ${err.response.data.message}`);
          } else if (err.response && err.response.data) {
            setApiErrorMessage(`Error: ${err.response.data}`);
          } else {
            setApiErrorMessage('An error occurred while processing your request. Please try again later.');
          }
        })
        .finally(() => {
          setIsLoading(false); // Set loading state to false after request completion
        });
    } else {
      setErrors(validationErrors);
    }
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
    <div className="flex bg-purple-200 min-h-screen items-center justify-center py-6 sm:py-12">
      {/* signup container */}
      <div className="bg-white mx-auto overflow-hidden rounded-md shadow-lg max-w-3xl p-5">
        <div className="grid grid-cols-2 ">
          <div className="relative col-span-1 hidden md:block">
            <div className="absolute inset-0 bg-purple-200">
              <img className="h-full w-full object-cover" src={couple} alt='couple' />
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 p-8">
            <div className="flex flex-col justify-center h-full">
              <h2 className="mb-2 text-xl font-bold uppercase tracking-tight txt-gray-600">
                SIGN UP
              </h2>
              {apiErrorMessage && <p className="text-red-500">{apiErrorMessage}</p>}
              {successMessage && <p className="text-green-600">{successMessage}</p>}
              <p>
                If you're not a member yet, easily sign up by filling this form
              </p>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2 pt-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="p-2 rounded-xl w-full border border-purple-300"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="p-2 rounded-xl w-full border border-purple-300"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="p-2 rounded-xl  w-full border border-purple-300"
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="p-2 rounded-xl  w-full border border-purple-300"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirmation">
                    Confirm Password
                  </label>
                  <input
                    className="p-2 rounded-xl w-full border border-purple-300"
                    id="passwordConfirmation"
                    type="password"
                    placeholder="Confirm your password"
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                    required
                  />
                  {errors.passwordConfirmation && <p className="text-red-500 text-xs italic">{errors.passwordConfirmation}</p>}
                </div>
                <p className='mt-3'>
                  Already Have An Account ? <Link to='/login' className='text-sm text-purple-600 font-semibold hover:text-purple-950'>Click Here!</Link>
                </p>
                <div className="flex items-center justify-between">
                  <button
                    className="w-full px-4 py-1 text-sm text-purple-600 font-semibold rounded-xl border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-110 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mb-3"
                    type="submit" 
                    disabled={isLoading}
                  >
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Sign Up"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
