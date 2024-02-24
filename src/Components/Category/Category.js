import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar'

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryType, setCategoryType] = useState('');
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('x-auth-token');
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

    axios.post('https://le-nkap-v1.onrender.com/categories', newCategory)
      .then((res) => {
        setCategories([...categories, newCategory]);
        setSuccessMessage('Category successfully added');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        setCategoryName('');
        setCategoryType('');
      })
      .catch(err => console.log(err));
  }; 

  return (
    <div>
      <Navbar/>
      <div className="w-full min-h-screen bg-purple-200 p-5 flex items-center">
        <div className="bg-white min-w-full shadow-lg rounded-xl p-8 m-4 md:max-w-sm md:mx-auto flex flex-col">
          <h2 className="block w-full font-bold text-xl text-grey-darkest text-center mx-auto uppercase">Category Form</h2>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4 mt-4">
              <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest">Category Name</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="p-2 rounded-xl w-full border border-purple-300"
                required
              />
            </div>
            <div className="flex flex-col mb-4 mt-4">
              <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest">Category Type</label>
              <select
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
                className="p-2 rounded-xl w-full border border-purple-300"
                required
              >
                <option value="">Select category type</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="mb-4 mt-4 flex">
              {successMessage && (
              <div className="mb-4 text-green-600">{successMessage}</div>
            )}
              <button className='mx-auto mt-4 rounded-xl w-3/4 px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mb-3'
                      type="submit"
              >
                Add Category
              </button>
            </div>
            
          </form>

          <div className="my-8">
            <div mb-4 mt-4 flex>
              <h2 className="text-lg mx-auto font-bold mb-4">Categories</h2>
            </div>
            <table className="table-fixed border-collapse border w-full mb-4 mt-4">
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
  );
};

export default CategoryForm;
