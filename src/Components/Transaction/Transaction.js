import React, { useState } from 'react';

function TransactionForm() {
  // State variables to manage transactions, selected transaction for update, form data, sorting, and filtering
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    amount: '',
    category: '',
  });
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterType, setFilterType] = useState('');

  // Function to add a new transaction
  const addTransaction = () => {
    if (!formData.name || !formData.type || !formData.amount || !formData.category) {
      alert('Please fill out all fields.');
      return;
    }
    const newTransaction = { ...formData };
    setTransactions([...transactions, newTransaction]);
    console.log("New Transaction Added:", newTransaction);
    resetForm();
  };

  // Function to update an existing transaction
  const updateTransaction = () => {
    if (!selectedTransaction) return;
    const updatedTransactions = transactions.map((transaction) =>
      transaction === selectedTransaction ? formData : transaction
    );
    setTransactions(updatedTransactions);
    console.log("Transaction Updated:", formData);
    resetForm();
  };

  // Function to delete a transaction
  const deleteTransaction = (transaction) => {
    const updatedTransactions = transactions.filter((t) => t !== transaction);
    setTransactions(updatedTransactions);
    console.log("Transaction Deleted:", transaction);
  };

  // Function to handle selecting a transaction for update
  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setFormData({ ...transaction });
  };

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to reset the form
  const resetForm = () => {
    setSelectedTransaction(null);
    setFormData({ name: '', type: '', amount: '', category: '' });
  };

  // Function to cancel the update operation and revert changes
  const cancelUpdate = () => {
    if (selectedTransaction) {
      setTransactions([...transactions, selectedTransaction]);
      resetForm();
    }
  };

  // Function to toggle the sort order of transactions
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Function to filter transactions by type
  const handleFilterType = (e) => {
    const { value } = e.target;
    setFilterType(value);
  };

  // Calculate the total amount of all transactions
  const totalAmount = transactions.reduce((total, transaction) => {
    return total + parseFloat(transaction.amount);
  }, 0);

  // Apply sorting and filtering to transactions
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
    <div className='bg-purple-300'>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="name"
          className='border-2 border-purple-900'
          value={formData.name}
          placeholder="Transaction Name"
          onChange={handleChange}
          required
          minLength={4}
        />
        <select
          name="type"
          className='border-2 border-purple-900'
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">Select Type</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          type="number"
          name="amount"
          className='border-2 border-purple-900'
          value={formData.amount}
          placeholder="Amount"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          className='border-2 border-purple-900'
          value={formData.category}
          placeholder="Category"
          onChange={handleChange}
          required
        />
        <button className='border' onClick={selectedTransaction ? updateTransaction : addTransaction}>
          {selectedTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
        {selectedTransaction && (
          <button className='border' type="button" onClick={cancelUpdate}>Cancel</button>
        )}
      </form>

      <div>
        <label>Filter by Type:</label>
        <select className='border' onChange={handleFilterType}>
          <option value="">All</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <table className='border'>
        <thead>
          <tr>
            <th onClick={toggleSortOrder}>Name {sortOrder === 'asc' ? '▲' : '▼'}</th>
            <th className='border'>Type</th>
            <th className='border'>Amount</th>
            <th className='border'>Category</th>
            <th className='border'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction, index) => (
            <tr key={index}>
              <td className='border'>{transaction.name}</td>
              <td className='border'>{transaction.type}</td>
              <td className='border'>${transaction.amount}</td>
              <td className='border'>{transaction.category}</td>
              <td className='border'>
                <button className='border' onClick={() => handleUpdate(transaction)}>Update</button>
                <button className='border' onClick={() => deleteTransaction(transaction)}>Delete</button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="2" className='border'><strong>Total Amount:</strong></td>
            <td colSpan="3"><strong>${totalAmount}</strong></td>
          </tr>
        </tbody>
      </table>
      
    </div>
  );
}

export default TransactionForm;
