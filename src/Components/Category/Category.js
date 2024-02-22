import React, { useState } from 'react';
import axios from 'axios';

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [categories, setCategories] = useState([
    { name: 'School', type: 'expense' },
    { name: 'Work', type: 'income' },
    { name: 'Home', type: 'expense' },
    { name: 'Shop', type: 'income'},
  ]);

  const handleSubmit = async (e) => {
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

    // Add new category to the list
    setCategories([...categories, newCategory]);

    // Display new category in the console
    console.log('New Category:', newCategory);

    // Clear form fields
    setCategoryName('');
    setCategoryType('');

    try {
      // Get token from local storage
      const token = localStorage.getItem('x-auth-token');

      // Include token in request headers
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };

      // Make post request with token included in headers
      const response = await axios.post('https://le-nkap-v1.onrender.com/categories', newCategory, config);
      console.log(response.data); // Handle response data if needed
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category Type</label>
          <select
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select category type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Category
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Categories</h2>
        <table className="border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2"> Name</th>
              <th className="border border-gray-400 px-4 py-2"> Type</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{category.name}</td>
                <td className="border border-gray-400 px-4 py-2">{category.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryForm;
