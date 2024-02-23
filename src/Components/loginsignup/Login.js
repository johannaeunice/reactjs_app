import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import couple from "./login.png"


const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        axios.post('https://le-nkap-v1.onrender.com/auth', formData)
        .then((res) => {
            console.log(`value of the token\n`,res)
            console.log(`value of the token\n`,res.data)
          sessionStorage.setItem('x-auth-token', res.data)
            navigate('/dashboard')
        })
        .catch(err => {console.log(err)
          throw new Error('Network response was not ok');

        })

      } catch (error) {
        console.log('Error:', error);
      }

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      setFormData({
        email: '',
        password: ''
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  return (
    <div className="flex bg-purple-200 min-h-screen  items-center justify-center py-6 sm:py-12">
      {/* login container */}
      <div className="bg-white mx-auto overflow-hidden rounded-md shadow-lg max-w-3xl p-5">
        {/* form */}
        <div className="grid grid-cols-2 ">
          <div className="relative col-span-1 hidden md:block">
            <div className="absolute inset-0 bg-purple-200">
              <img className="h-full w-full object-cover" src={couple} alt='couple' />
            </div></div>
          <div className="col-span-2 md:col-span-1 p-8">
            <div className="flex flex-col justify-center h-full">
              <h2 className="mb-2 text-xl font-bold uppercase tracking-tight text-gray-600">Login</h2>
              <p className="">
                If you are already a member, easily login by filling this form.
              </p>
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="space-y-2">
                  <div>
                    <label className="mt-4 block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="p-2 mt-1 rounded-xl border border-purple-300 w-full"
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
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="p-2 rounded-xl border w-full border border-purple-300"
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
                <p className='mt-3'>
                  No Account yet? <Link className="text-purple-600" to="/signup">Click Here!</Link>
                </p>
                <div className="flex flex-column items-center justify-between">

                  <button
                    className="w-full px-4 py-1 text-sm text-purple-600 font-semibold rounded-xl border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-110 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                    type="submit"
                  >
                    Sign In
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

export default LoginForm;
