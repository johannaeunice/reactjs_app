import React, { useState, useEffect } from 'react';
import TransactionForm from './Transaction';
import TransactionTable from './TransactionTable';
import axios from "axios"

function TransactionManager() {
  const [formData, setFormData] = useState({}); // State to hold form data for updates
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const token = sessionStorage.getItem('x-auth-token');
      const response = await axios.get('https://le-nkap-v1.onrender.com/transactions', {
        headers: {
          'x-auth-token': token
        }
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  return (
    <div>
      <TransactionForm formData={formData} setFormData={setFormData} fetchTransactions={fetchTransactions} />
      <TransactionTable transactions={transactions} setFormData={setFormData} fetchTransactions={fetchTransactions} />
    </div>
  );
}

export default TransactionManager;
