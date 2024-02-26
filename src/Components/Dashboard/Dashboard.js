import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Chart from 'react-apexcharts';
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);
  const [showEncouragement, setShowEncouragement] = useState(false);

  useEffect(() => {
    const authToken = sessionStorage.getItem('x-auth-token');
    setTransactionsLoading(true); // Set loading state to true before API call
    axios.get('https://le-nkap-v1.onrender.com/transactions', {
      headers: {
        'x-auth-token': authToken
      }
    })
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions: ', error);
      })
      .finally(() => {
        setTransactionsLoading(false); // Set loading state to false after API call (whether success or failure)
      });
  }, []);

  useEffect(() => {
    const authToken = sessionStorage.getItem('x-auth-token');
    setCategoriesLoading(true); // Set loading state to true before API call
    axios.get('https://le-nkap-v1.onrender.com/categories', {
      headers: {
        'x-auth-token': authToken
      }
    })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories: ', error);
      })
      .finally(() => {
        setCategoriesLoading(false); // Set loading state to false after API call (whether success or failure)
      });
  }, []);

  const calculateTotalAmount = (type) => {
    const filteredTransactions = transactions.filter(transaction => transaction.type === type);
    return filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  const incomeTotal = calculateTotalAmount('income');
  const expenseTotal = calculateTotalAmount('expense');
  const balance = incomeTotal - expenseTotal;

  const shouldDisplayGraphs = transactions.length > 0;

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

  useEffect(() => {
    if (incomeTotal < expenseTotal) {
      setShowWarning(true);
      setShowEncouragement(false);
    } else if (incomeTotal > expenseTotal) {
      setShowEncouragement(true);
      setShowWarning(false);
    } else {
      setShowWarning(false);
      setShowEncouragement(false);
    }
  }, [incomeTotal, expenseTotal]);

  const shouldDisplayMessage = window.innerWidth <= 768;

  return (
    <div className="bg-purple-200">
      <Navbar />
      {shouldDisplayMessage && <p className='font-semibold text-sm text-red-500'>For better experience (if on phone) use in landscape mode.</p>}
      <div className="w-full min-h-screen bg-purple-200 p-5 flex items-center justify-center">

        <div className="bg-white w-full md:max-w-xl shadow-lg rounded-xl p-8 flex flex-col">
          <h2 className="font-bold text-xl text-center uppercase mb-6">Dashboard</h2>

          {/* First Section: Transaction Table, Add New Transaction Button, Pie Chart */}
          {(!transactionsLoading && transactions.length > 0) && (
            <div className="my-8">
              <table className="table-auto border-collapse border w-full mb-4">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Amount</th>
                    <th className="border px-4 py-2">Type</th>
                    <th className="border px-4 py-2">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Transaction Table Rows */}
                  {transactions.map(transaction => (
                    <tr key={transaction.id}>
                      <td className="border px-4 py-2 text-center">{transaction.name}</td>
                      <td className="border px-4 py-2 text-center">{transaction.amount} FCFA</td>
                      <td className="border px-4 py-2 text-center">{transaction.type}</td>
                      <td className="border px-4 py-2 text-center">{transaction.category.name}</td>
                    </tr>
                  ))}
                  {/* Total Amount and Balance Rows */}
                  <tr>
                    <td className="border px-4 py-2" colSpan="1"><strong>Total Amount:</strong> </td>
                    <td className="border px-4 py-2" colSpan="3"><strong>{incomeTotal + expenseTotal} FCFA</strong></td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2" colSpan="1"><strong>Balance:</strong> </td>
                    <td className="border px-4 py-2" colSpan="3"><strong> {balance} FCFA</strong></td>
                  </tr>
                </tbody>
              </table>
              {/* Warning or Encouragement Messages */}
              <div className="flex justify-center mb-4">
                {showWarning && <p className='text-red-500 font-bold'>You are spending more than you are earning. Watch your expenses!</p>}
                {showEncouragement && <p style={{ color: 'green' }} className='font-bold'>You are managing your finances well. Keep it up!</p>}
              </div>
              {/* Button to Add New Transaction */}
              <div className="flex justify-center mb-4">
                <Link to="/transactions" className='rounded-xl px-4 py-1 text-sm text-purple-600 font-semibold border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'>
                  Add New Transaction +
                </Link>
              </div>
              {/* Pie Chart */}
              <div className="flex justify-center">
                <Chart
                  options={{
                    labels: ['Income', 'Expense'],
                    colors: ['#008FFB', '#FF4560'],
                  }}
                  series={[incomeTotal, expenseTotal]}
                  type="pie"
                  width="380"
                />
                <div className="ml-4 mt-4">
                  <p className="text-xs">Total Income: {incomeTotal} FCFA</p>
                  <p className="text-xs">Total Expense: {expenseTotal} FCFA</p>
                  <p className="text-xs">Total Transactions: {transactions.length}</p>
                </div>
              </div>
            </div>
          )}

          {/* Second Section: Area Graph */}
          {shouldDisplayGraphs && (
            <div className="my-8">
              <Chart
                options={graphData.options}
                series={graphData.series}
                type="area"
                height={350}
              />
            </div>
          )}

          {/* Third Section: Category Cards */}
          <div className="my-8">
            {categoriesLoading ? (
              <div className="flex justify-center">
                <FontAwesomeIcon icon={faSpinner} spin className="text-purple-600 text-4xl" />
              </div>
            ) : (
              <div className="flex flex-wrap">
                {/* Category Cards */}
                {categories.map(category => (
                  <div key={category.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2">
                    <div className="bg-white rounded-xl shadow-md px-2 mt-4 flex mx-auto hover:bg-purple-950">
                      <div className="mx-auto">
                        <p className="font-semibold text-violet-700 ">Name: {category.name}</p>
                        <p className="text-sm text-gray-500">Type: {category.type}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* "Add New Category" Card */}
                <div className="flex justify-center mt-4">
                  <Link to="/categories" className='rounded-xl px-4 py-1 text-sm text-purple-600 font-semibold border border-dotted border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent hover:scale-105 duration-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'>
                    Add New Category +
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
