import { useEffect, useState } from 'react'
import React from 'react';
import axios from 'axios'
import ExpenseList from './ExpenseList'
import ExpenseFilter from './ExpenseFilter'
import ExpenseForm from './ExpenseForm'
import './Expense.css'

export default function Expense() {

  

  const [expenses, setExpenses] = useState([
    { id: 1, description: "2 packs of sugar", amount: 50, category: "Groceries" },
    { id: 2, description: "2 packs of biscuit", amount: 60, category: "Groceries" },
    { id: 3, description: "Electricity bill", amount: 100, category: "Utilities" },
    { id: 4, description: "1 spotify subscription", amount: 30, category: "Entertainment" },
    { id: 5, description: "2 boomplay subscription", amount: 30, category: "Entertainment" }
  ]);

  const addItem = (data) => {
    console.log(data);
    setExpenses(() => [...expenses, data])
  }

  const deleteItem = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const filterItem = (cat) => {
    setExpenses(expenses.filter(expense => expense.category === cat))
  }

  return (
    <div className='container'>
      <ExpenseForm addExpense={addItem} />
      <ExpenseFilter filterItem={filterItem} />
      <ExpenseList items={expenses} deleteItem={deleteItem} />
      

    </div>
  )
}



