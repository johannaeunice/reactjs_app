import { Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './Components/Home/Home'
import Contact from './Components/Contact/Contact'
import Dashboard from './Components/Dashboard/Dashboard'
import Expense from './Components/AddExpense/Expense'
import SignUpForm from './Components/loginsignup/Signup'
import LoginForm from './Components/loginsignup/Login'
import CategoryForm from './Components/Category/Category'
import TransactionForm from './Components/Transaction/Transaction'
import Account from './Components/Account/Account'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={ <SignUpForm/> } />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/category" element={<CategoryForm/>} />
        <Route path="/transactions" element={<TransactionForm/>} />
        <Route path='/account' element={<Account/>} />
      </Routes>
    </div>
  );
}

export default App;
