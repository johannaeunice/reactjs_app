import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransactionTable({ transactions, setFormData, fetchTransactions }) {
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('');
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = sessionStorage.getItem('x-auth-token');
      const response = await axios.get('https://le-nkap-v1.onrender.com/categories', {
        headers: {
          'x-auth-token': token
        }
      });
      const categories = response.data;
      const categoriesObj = {};
      categories.forEach(category => {
        categoriesObj[category._id] = category.name;
      });
      setCategoriesMap(categoriesObj);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterType = (e) => {
    const { value } = e.target;
    setFilterType(value);
  };

  const handleUpdate = async (transaction) => {
    try {
      const token = sessionStorage.getItem('x-auth-token');
      const updatedTransaction = {
        name: transaction.name,
        amount: transaction.amount,
        type: transaction.type,
        categoryId: transaction.categoryId // Include categoryId
      };
      await axios.put(`https://le-nkap-v1.onrender.com/transactions/${transaction._id}`, updatedTransaction, {
        headers: {
          'x-auth-token': token
        }
      });
      fetchTransactions();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const deleteTransaction = async (transactionId) => {
    try {
      const token = sessionStorage.getItem('x-auth-token');
      await axios.delete(`https://le-nkap-v1.onrender.com/transactions/${transactionId}`, {
        headers: {
          'x-auth-token': token
        }
      });
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  let sortedTransactions = [...transactions];
  if (sortOrder === 'asc') {
    sortedTransactions.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    sortedTransactions.sort((a, b) => b.name.localeCompare(a.name));
  }
  if (filterType) {
    sortedTransactions = sortedTransactions.filter(transaction => transaction.type === filterType);
  }

  return (
    <div>
      <div className="flex flex-col mb-4 mt-4">
        <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest">
          Filter by Type:
        </label>
        <select className='p-2 rounded-xl w-full border border-purple-300'
          onChange={handleFilterType}>
          <option value="">All</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="my-8">
        <table className="table-fixed border-collapse border w-full mb-4 mt-4">
          <thead>
            <tr>
              <th onClick={toggleSortOrder}>Name {sortOrder === 'asc' ? '▲' : '▼'}</th>
              <th className='border px-4 py-2'>Type</th>
              <th className='border px-4 py-2'>Amount</th>
              <th className='border px-4 py-2'>Category</th>
              <th className='border px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction, index) => (
              <tr key={index}>
                <td className='border px-4 py-2'>{transaction.name}</td>
                <td className='border px-4 py-2'>{transaction.type}</td>
                <td className='border px-4 py-2'>${transaction.amount}</td>
                <td className='border px-4 py-2'>{categoriesMap[transaction.categoryId]}</td>
                <td className='border px-4 py-2'>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleUpdate(transaction)}>
                    Update
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => deleteTransaction(transaction._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;
