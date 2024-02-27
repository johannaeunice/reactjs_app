import { Routes, Route } from 'react-router-dom'
// import './App.css';
import Home from './Components/Home/Home'
import ContactPage from './Components/Contact/Contact'
import Dashboard from './Components/Dashboard/Dashboard'
import SignUpForm from './Components/loginsignup/Signup'
import LoginForm from './Components/loginsignup/Login'
import CategoryForm from './Components/Category/Category'
import TransactionForm from './Components/Transaction/Transaction'
import ExpensePage from './Components/Transaction/Expense'
import IncomePage from './Components/Transaction/Income'
// import Navbar from '/.Components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="expenses" element={<ExpensePage/>} />
        <Route path="income" element={<IncomePage/>} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="signup" element={<SignUpForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="categories" element={<CategoryForm />} />
        <Route path="transactions" element={<TransactionForm />} />

      </Routes>
    </div>
  );
}

export default App;
