import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar';

function ExpensePage() {
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        categoryId: '',
        type: 'expense', // Type is predefined as "expense"
    });
    const [sortOrder, setSortOrder] = useState('asc');
    const [categories, setCategories] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const token = sessionStorage.getItem('x-auth-token');

    useEffect(() => {
        fetchCategories();
        fetchTransactions();
    }, []);

    const fetchCategories = async () => {
        try {

            const response = await axios.get('https://le-nkap-v1.onrender.com/categories', {
                headers: {
                    'x-auth-token': token
                }
            });
            setCategories(response.data.filter(category => category.type === 'expense'));
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchTransactions = async () => {
        try {

            const response = await axios.get('https://le-nkap-v1.onrender.com/transactions?type=expense', {
                headers: {
                    'x-auth-token': token
                }
            });
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching expense transactions:', error);
        }
    };

    const addExpense = async () => {
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
            setSuccessMessage('Expense added successfully');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error adding expense:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const updateExpense = async () => {
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
            setSuccessMessage('Expense updated successfully');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error updating expense:', error);
        } finally {
            setSubmitting(false);
            setSelectedTransaction(null);
        }
    };

    const deleteExpense = async (deletedTransaction) => {
        try {
            setSubmitting(true);
            await axios.delete(`https://le-nkap-v1.onrender.com/transactions/${deletedTransaction._id}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            fetchTransactions();
            setSuccessMessage('Expense deleted');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Error deleting expense:', error);
            setSuccessMessage('Error deleting expense');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } finally {
            setSubmitting(false);

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = (transaction) => {
        setSelectedTransaction(transaction);
        setFormData({
            ...transaction,
            categoryId: transaction.category._id,
            categoryName: transaction.category.name
        });
    };

    const handleCancelUpdate = () => {
        setSelectedTransaction(null);
        resetForm();
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
    let sortedTransactions = [...transactions];
    if (sortOrder === 'asc') {
        sortedTransactions.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        sortedTransactions.sort((a, b) => b.name.localeCompare(a.name));
    }
    const resetForm = () => {
        setFormData({ name: '', amount: '', categoryId: '', type: 'expense' });
    };
    let sortedExpenseTransactions = sortedTransactions.filter(transaction => transaction.type === 'expense');
    const shouldDisplayMessage = window.innerWidth <= 768;

    return (
        <div className="bg-purple-200">
            <Navbar />
            {shouldDisplayMessage && <p className='font-semibold text-sm text-red-500'>For better experience (if on phone) use in landscape mode.</p>}
            <div className="w-full min-h-screen bg-purple-200 p-5 flex items-center">
                <div className="bg-white w-full shadow-lg rounded-xl p-8 m-4 md:max-w-sm md:mx-auto flex flex-col">
                    <div className="mt-1 flex mb-1 justify-between">
                        <div className="justify-items-start">
                            <Link to="/transactions" className="  text-left rounded-xl px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Transactions</Link>
                        </div>
                        <div className="justify-items-end ">
                            <Link to="/income" className=" text-right rounded-xl px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                                Income <FontAwesomeIcon icon={faArrowRight} className="mx-auto" /></Link>
                        </div>
                    </div>
                    <h2 className="block w-full font-bold text-xl text-grey-darkest text-center mx-auto uppercase">Expense Form</h2>
                    <form className="bg-white shadow-md font-bold rounded-xl px-8 pt-6 pb-8 mt-3 inline-block"
                        onSubmit={(e) => e.preventDefault()}>
                        <div className="flex flex-col mb-4 mt-4">
                            <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest" htmlFor="name">
                                Name of expense:
                            </label>
                            <input
                                type="text"
                                name="name"
                                className='p-2 rounded-xl w-full border border-purple-300'
                                value={formData.name}
                                placeholder="Expense Name"
                                onChange={handleChange}
                                required
                                minLength={4}
                            />
                        </div>
                        <div className="flex flex-col mb-4 mt-4">
                            <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest" htmlFor="amount">
                                Amount of expense:
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
                            <label className="mb-2 capitalize font-semibold text-lg text-grey-darkest" htmlFor="category">
                                Category of expense:
                            </label>
                            <select
                                name="categoryId"
                                className='p-2 rounded-xl w-full border border-purple-300 mt-2'
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
                        <div className="mb-4 mt-4 flex ">
                            {!selectedTransaction && (
                                <button className='mx-auto rounded-xl w-3/4 px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mb-3'
                                    type="submit"
                                    onClick={addExpense}>
                                    Add Expense
                                    {submitting && <FontAwesomeIcon icon={faSpinner} spin size="lg" className=" mr-2 ml-2" />}
                                </button>
                            )}
                            {selectedTransaction && (
                               <div className="flex justify-center mx-auto">
                               <button style={{ marginRight: '60px' }} className='rounded-xl px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mb-3'
                                   type="submit"
                                   onClick={updateExpense}>
                                   Update Expense
                                   {submitting && <FontAwesomeIcon icon={faSpinner} spin size="lg" className="mr-2 ml-2" />}
                               </button>                  
                               <button style={{ marginLeft: '60px' }} className='rounded-xl px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mb-3'
                                   type="button"
                                   onClick={handleCancelUpdate}>
                                   Cancel
                               </button>    
                           </div>        
                            )}
                        </div>
                    </form>
                    {successMessage && (
                        <div style={{ color: selectedTransaction ? 'orange' : 'green' }} className='font-bold text-center'>{successMessage}</div>
                    )}
                    <div className="my-8">
                        <table className="table-fixed border-collapse border w-full mb-4 mt-4">
                            <caption className="caption-top mb-2">
                                Table: Registered Expense Transactions.
                            </caption>
                            <thead>
                                <tr>
                                    <th onClick={toggleSortOrder}>Name {sortOrder === 'asc' ? '▲' : '▼'}</th>
                                    <th className='border px-4 py-2'>Amount</th>
                                    <th className='border px-4 py-2'>Category</th>
                                    <th className='border px-4 py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedExpenseTransactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td className='border px-4 py-2'>{transaction.name}</td>
                                        <td className='border px-4 py-2'>{transaction.amount} FCFA</td>
                                        <td className='border px-4 py-2'>{transaction.category.name}</td>
                                        <td className='border px-4 py-2'>
                                            <div className="mb-1 mt-1 flex">

                                                {/* Update Button */}
                                                <button style={{ backgroundColor: 'white', color: '#F59E0B', borderColor: '#F59E0B', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}
                                                    className='mx-auto rounded-xl w-3/4 px-4 py-1 text-sm font-semibold border duration-300 focus:outline-none 
focus:border-transparent focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 mb-3'
                                                    onClick={() => handleUpdate(transaction)}
                                                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#F59E0B'; e.target.style.color = 'white'; }}
                                                    onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#F59E0B'; }}>
                                                    Update
                                                </button>
                                                {/* Delete Button */}
                                                <button style={{ backgroundColor: 'white', color: '#EF4444', borderColor: '#EF4444', transition: 'background-color 0.3s, color 0.3s, border-color 0.3s' }}
                                                    className='mx-auto rounded-xl w-3/4 px-4 py-1 text-sm font-semibold border duration-300 focus:outline-none 
focus:border-transparent focus:ring-2 focus:ring-red-600 focus:ring-offset-2 mb-3'
                                                    onClick={() => deleteExpense(transaction)}
                                                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#EF4444'; e.target.style.color = 'white'; }}
                                                    onMouseLeave={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#EF4444'; }}>
                                                    Delete
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="1" className='border px-4 py-2'><strong>Total Amount:</strong></td>
                                    <td colSpan="3" className="border px-4 py-2"><strong>{sortedExpenseTransactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0)} FCFA</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpensePage;
