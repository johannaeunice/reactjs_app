import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [loading, setLoading] = useState(false); // State for loading spinner

  useEffect(() => {
    const token = sessionStorage.getItem('x-auth-token');
    setAuthToken(token);
    setLoading(true); // Set loading to true when API request starts
    axios.get('https://le-nkap-v1.onrender.com/categories', {
      headers: {
        'x-auth-token': token
      }
    })
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error('Error fetching categories: ', error);
    })
    .finally(() => {
      setLoading(false); // Set loading to false when API request finishes
    });
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!categoryName || !categoryType) {
      alert('Please fill in all fields');
      return;
    }
    if (categoryName.length < 5) {
      alert('Category name must be at least 5 characters long.');
      return;
    }

    const newCategory = {
      name: categoryName,
      type: categoryType,
    };

    setLoading(true); // Set loading to true when API request starts
    axios.post('https://le-nkap-v1.onrender.com/categories', newCategory, {
      headers: {
        'x-auth-token': authToken
      }
    })
      .then((res) => {
        setCategories([...categories, newCategory]);
        setSuccessMessage('Category successfully added');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        setCategoryName('');
        setCategoryType('');
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false); // Set loading to false when API request finishes
      });
  }; 
  const shouldDisplayMessage = window.innerWidth <= 768;

  return (
    <div className="bg-purple-200 flex flex-col min-h-screen">
      <Navbar />
      {shouldDisplayMessage && <p className='font-semibold text-sm text-red-500'>For better experience (if on phone) use in landscape mode.</p>}
      <div className="flex-1 bg-purple-200 p-5 flex items-center justify-center">
        <div className="bg-white w-full md:max-w-md shadow-lg rounded-xl p-8 flex flex-col">
          <h2 className="font-bold text-xl text-center uppercase mb-6">Category Form</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="categoryName" className="font-semibold text-lg">Category Name</label>
              <input
                id="categoryName"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="p-2 rounded-xl border border-purple-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="categoryType" className="font-semibold text-lg">Category Type</label>
              <select
                id="categoryType"
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                className="p-2 rounded-xl border border-purple-300"
                required
              >
                <option value="">Select category type</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="flex justify-center">
              {successMessage && <div className="text-green-600">{successMessage}</div>}
            </div>
            <div className="flex justify-center">
              {/* Conditional rendering of loading spinner */}
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin size="lg" className="text-purple-600 mr-2" />
              ) : (
                <button
                  className="mt-4 rounded-xl px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                  type="submit"
                >
                  Add Category
                </button>
              )}
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Categories</h2>
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2 text-center"> Name</th>
                    <th className="border px-4 py-2 text-center"> Type</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 text-center">{category.name}</td>
                      <td className="border px-4 py-2 text-center">{category.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
