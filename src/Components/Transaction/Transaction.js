import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faArrowLeft, faArrowRight,faEdit,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';

function TransactionForm() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    amount: '',
    categoryId: '',
  });
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('');
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('x-auth-token'));
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading state to true initially

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('https://le-nkap-v1.onrender.com/transactions', {
        headers: {
          'x-auth-token': token
        }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false); // Set loading to false once transactions are fetched
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://le-nkap-v1.onrender.com/categories', {
        headers: {
          'x-auth-token': token
        }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false); // Set loading to false once categories are fetched
    }
  };

  const addTransaction = async () => {
    if (!formData.name || !formData.type || !formData.amount || !formData.categoryId) {
      alert('Please fill out all fields.');
      return;
    }
    try {
      setSubmitting(true);
      await axios.post('https://le-nkap-v1.onrender.com/transactions', formData, {
        headers: {
          'x-auth-token': token
        }
      });
      fetchTransactions();
      resetForm();
      setSuccessMessage('Transaction added successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const updateTransaction = async () => {
    if (!selectedTransaction) return;
    const { _id, name, type, amount, categoryId } = formData;
    try {
      setSubmitting(true);
      await axios.put(`https://le-nkap-v1.onrender.com/transactions/${_id}`, {
        name,
        type,
        amount,
        categoryId
      }, {
        headers: {
          'x-auth-token': token
        }
      });
      fetchTransactions();
      resetForm();
      setSuccessMessage('Transaction updated successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating transaction:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteTransaction = async (transaction) => {
    try {
      setSubmitting(true);
      await axios.delete(`https://le-nkap-v1.onrender.com/transactions/${transaction._id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      fetchTransactions();
      setSuccessMessage('Transaction deleted');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      setSuccessMessage('Error deleting transaction');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setFormData({
      ...transaction,
      categoryId: transaction.category._id,
      categoryName: transaction.category.name
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setSelectedTransaction(null);
    setFormData({ name: '', type: '', amount: '', categoryId: '' });
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterType = (e) => {
    const { value } = e.target;
    setFilterType(value);
  };

  const calculateTotalAmount = (transactions) => {
    return transactions.reduce((total, transaction) => {
      return total + parseFloat(transaction.amount);
    }, 0);
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

  const totalAmount = calculateTotalAmount(sortedTransactions);
  const shouldDisplayMessage = window.innerWidth <= 768;
  const iconMap = {
    'Update': faEdit,
    'Delete': faTrash,
    'Add Transaction': faPlus,
  };

  return (
    <div className="bg-purple-200">
      <Navbar />
      {shouldDisplayMessage && <p className='font-semibold text-sm text-red-500'>For better experience (if on phone) use in landscape mode.</p>}
      <div className="w-full min-h-screen bg-purple-200 p-5 flex items-center">
        <div className="bg-white w-full shadow-lg rounded-xl p-8 m-4 md:max-w-sm md:mx-auto flex flex-col">
        <div className="mt-1 flex mb-1 justify-between">
                        <div className="justify-items-start">
                            <Link to="/income" className="  text-left rounded-xl px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Income</Link>
                        </div>
                        <div className="justify-items-end ">
                            <Link to="/expenses" className=" text-right rounded-xl px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                                Expenses <FontAwesomeIcon icon={faArrowRight} className="mx-auto" /></Link>
                        </div>
                    </div>
          <h2 className="block w-full font-bold text-xl text-grey-darkest text-center mx-auto uppercase">Transaction Form</h2>

          <form className="bg-white  shadow-md font-bold rounded-xl px-8 pt-6 pb-8 mt-3 inline-block"
            onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col mb-4 mt-4">
              <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest" htmlFor="name">
                Name of transaction:
              </label>
              <input
                type="text"
                name="name"
                className='p-2 rounded-xl w-full border border-purple-300'
                value={formData.name}
                placeholder="Transaction Name"
                onChange={handleChange}
                required
                minLength={4}
              />
            </div>
            <div className="flex flex-col mb-4 mt-4">
              <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest" htmlFor="name">
                Type of transaction:
              </label>
              <select
                name="type"
                className='p-2 rounded-xl w-full border border-purple-300'
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="flex flex-col mb-4 mt-4">
              <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest" htmlFor="name">
                Amount of transaction
              </label>
              <input
                type="number"
                name="amount"
                className='p-2 rounded-xl w-full border border-purple-300'
                value={formData.amount}
                placeholder="Amount"
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col mb-4 mt-4">
              <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest" htmlFor="name">
                Category of transaction
              </label>
              <select
                name="categoryId"
                className='p-2 rounded-xl w-full border border-purple-300'
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>

            {successMessage && (
              <div style={{ color: 'green' }} className='font-bold text-center'>{successMessage}</div>
            )}
            <div className="mb-4 mt-4 flex">
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin size="lg" className="text-purple-600 text-4xl mx-auto" />
              ) : (
                <button className='mx-auto rounded-xl w-3/4 px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mb-3'
                  onClick={selectedTransaction ? updateTransaction : addTransaction}>
                  {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
                </button>
              )}

              {selectedTransaction && (
                <button className='mx-auto rounded-xl w-3/4 px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mb-3'
                  type="button"
                  onClick={resetForm}>Cancel</button>
              )}
            </div>
          </form>

          <div className="flex flex-col mb-4 mt-4">
            <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest">
              Filter by Type:</label>
            <select className='p-2 rounded-xl w-full border border-purple-300'
              onChange={handleFilterType}>
              <option value="">All</option>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="my-8">
            <div className="text-center mx-auto">
            {submitting && (
              <FontAwesomeIcon icon={faSpinner} spin size="lg" className="text-purple-600 text-4xl " />
            )}
            </div>
            
              <table className="table-fixed border-collapse border w-full mb-4 mt-4">
                <caption className="caption-top mb-2">
                  Table: Registered Transactions.
                </caption>
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
                      <td className='border px-4 py-2 text-center'>{transaction.name}</td>
                      <td className='border px-4 py-2 text-center'>{transaction.type}</td>
                      <td className='border px-4 py-2 text-center'>{transaction.amount} FCFA</td>
                      <td className='border px-4 py-2 text-center'>
                        {transaction.category.name}
                      </td>
                      <td className='border px-4 py-2'>
                        <div className="mb-1 mt-1 flex">

                          {/* Update Button */}
                          <button style={{ backgroundColor: 'white', color: '#F59E0B', borderColor: '#F59E0B', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}
                            className='mx-auto rounded-xl w-3/4 px-4 py-1 text-sm font-semibold border duration-300 focus:outline-none 
                   focus:border-transparent focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 mb-3'
                            onClick={() => handleUpdate(transaction)}
                            onMouseEnter={(e) => { e.target.style.backgroundColor = '#F59E0B'; e.target.style.color = 'white'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#F59E0B'; }}>
                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: '6px' }} />Update
                          </button>
                          {/* Delete Button */}
                          <button style={{ backgroundColor: 'white', color: '#EF4444', borderColor: '#EF4444', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}
                            className='mx-auto rounded-xl w-3/4 px-4 py-1 text-sm font-semibold border duration-300 focus:outline-none 
                   focus:border-transparent focus:ring-2 focus:ring-red-600 focus:ring-offset-2 mb-3'
                            onClick={() => deleteTransaction(transaction)}
                            onMouseEnter={(e) => { e.target.style.backgroundColor = '#EF4444'; e.target.style.color = 'white'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#EF4444'; }}>
                            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '6px' }} />Delete
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2" className='border px-4 py-2'><strong>Total Amount:</strong></td>
                    <td colSpan="3" className="border px-4 py-2"><strong>{totalAmount} FCFA</strong></td>
                  </tr>
                </tbody>
              </table>
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default TransactionForm;
