import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Chart from 'react-apexcharts';
import Navbar from "../Navbar/Navbar"

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const authToken = sessionStorage.getItem('x-auth-token');
    axios.get('https://le-nkap-v1.onrender.com/transactions', { 
      headers: {
        'x-auth-token' : authToken 
      } 
    })
    .then(response => {
      setTransactions(response.data);
    })
    .catch(error => {
      console.error('Error fetching transactions: ', error);
    });
  }, []);

  useEffect(() => {
    const authToken = sessionStorage.getItem('x-auth-token');
    axios.get('https://le-nkap-v1.onrender.com/categories', { 
      headers: {
        'x-auth-token' : authToken 
      } 
    })
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error('Error fetching categories: ', error);
    });
  }, []);

  const calculateTotalAmount = (type) => {
    const filteredTransactions = transactions.filter(transaction => transaction.type === type);
    return filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  const incomeTotal = calculateTotalAmount('income');
  const expenseTotal = calculateTotalAmount('expense');
  const balance = incomeTotal - expenseTotal;

  const generateGraphData = () => {
    const incomeTransactions = transactions.filter(transaction => transaction.type === 'income');
    const labels = incomeTransactions.map(transaction => transaction.name);

    return {
      series: [{
        name: 'Income',
        data: incomeTransactions.map(transaction => transaction.amount)
      }, {
        name: 'Expense',
        data: transactions.filter(transaction => transaction.type === 'expense').map(transaction => transaction.amount)
      }, {
        name: 'Balance',
        data: new Array(labels.length).fill(balance)
      }],
      options: {
        chart: {
          height: 350,
          type: 'area',
          stacked: true,
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          categories: labels
        },
        tooltip: {
          x: {
            format: 'MMM dd yyyy'
          }
        }
      }
    };
  };

  const graphData = generateGraphData();

  return (
    <div>
      <Navbar/>
      <div className="w-full min-h-screen bg-purple-200 p-5 flex items-center">
        <div className="bg-white w-full shadow-lg rounded-xl p-8 m-4 md:max-w-sm md:mx-auto flex flex-col">
          <h2 className="block w-full font-bold text-xl text-grey-darkest text-center mx-auto uppercase">Dashboard</h2>
      {/* First Section */}
      <div className="my-8">
        {/* Transaction Table */}
        <table className="table-fixed border-collapse border w-full mb-4 mt-4">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">{transaction.name}</td>
                <td className="border px-4 py-2">${transaction.amount}</td>
                <td className="border px-4 py-2">{transaction.type}</td>
                <td className="border px-4 py-2">{transaction.category.name}</td>
              </tr>
            ))}
            <tr key="total">
              <td className="border px-4 py-2" colSpan="1"><strong>Total Amount:</strong> </td>
              <td className="border px-4 py-2" colSpan="3"><strong>${incomeTotal + expenseTotal}</strong></td>
              
            </tr>
            <tr key="balance">
            <td className="border px-4 py-2" colSpan="1"><strong>Balance:</strong> </td>
              <td className="border px-4 py-2" colSpan="3"><strong>${balance}</strong></td>
            </tr>
          </tbody>
        </table>
        {/* Button to Add New Transaction */}
        <div className="flex justify-center mb-4 mt-4">
          <Link to="/transactions" className='mx-auto rounded-xl w-3/4 px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mb-3'>
            Add New Transaction +
          </Link>
        </div>
        {/* Pie Chart */}
        <div className="flex justify-center mt-4">
          <div className="mr-8">
            <Chart
              options={{
                labels: ['Income', 'Expense'],
                colors: ['#008FFB', '#FF4560'],
              }}
              series={[incomeTotal, expenseTotal]}
              type="pie"
              width="380"
            />
          </div>
          <div>
            <p className="text-xs">Total Income: ${incomeTotal}</p>
            <p className="text-xs">Total Expense: ${expenseTotal}</p>
            <p className="text-xs">Total Transactions: {transactions.length}</p>
          </div>
        </div>
      </div>
      
      {/* Second Section */}
      <div className="my-8">
        {/* Area Graph */}
        <Chart
          options={graphData.options}
          series={graphData.series}
          type="area"
          height={350}
        />
      </div>
      
      {/* Third Section */}
      <div className="my-8">
        {/* Category Cards */}
        <div className="flex flex-wrap">
          {categories.map(category => (
            <div key={category.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
              <div className="bg-white rounded-lg shadow-md p-4">
                <p className="font-semibold">{category.name}</p>
                <p className="text-sm text-gray-500">{category.type}</p>
              </div>
            </div>
          ))}
          {/* "Add New Category" Card */}
          <Link to="/category" className="border border-dashed  border-indigo-600 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center ">
              <p className="font-semibold">Add New Category</p>
              <span className="text-xl ml-2">+</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Dashboard;
