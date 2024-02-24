import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Home = () => {
  return (
    <div className="min-h-screen relative bg-purple-200">
      <div className="absolute inset-0 z-10">
        <Navbar />
        </div>
      <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: "url('https://github.com/johannaeunice/reactjs_app/blob/master/src/Components/Home/couple_money.jpg?raw=true')",
        filter: "blur(5px) brightness(0.7)" // Adjust brightness value for visibility
      }}></div>
      
      <div className="absolute inset-0 flex items-center justify-center text-white text-center z-10">
        
        <div className="max-w-lg mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-left">Welcome to Le Nkap</h1>
          <p className="text-lg mb-2 text-left">Track your expenses with ease.</p>
          <p className="text-lg mb-2 text-left">Manage your finances like never before.</p>
          <p className="text-lg mb-2 text-left">Achieve financial freedom with Le Nkap !</p>
          <p className="text-lg mb-2 text-left">Get started with us, by creating an account.</p>
          <Link to="/signup" className=" bg-white hover:bg-purple-600 hover:border-transparent hover:scale-110 duration-300 text-purple-600 border border-purple-200 hover:text-white font-bold py-2 px-4 rounded block">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
