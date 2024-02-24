// import './Home.css';
// import axios from 'axios'
// import React, {useEffect} from 'react'
import { HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import couple_money from './black_couple.jpg'
import Navbar from '../Navbar/Navbar'

const HomePage = () => {

    

    return (
       <div className="bg-purple-200">
        <Navbar/>
            <div className="py-8 px-8 max-w-fit max-h-fit mx-0 bg-purple-200 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                {/*  */}
                <img className="block mx-auto h-50 w-50 rounded-full sm:mx-0 sm:shrink-0" src={couple_money} alt="Couple holding money" />
                <HelmetProvider>
                <html lang='en' />
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                    <link href="./output.css" rel="stylesheet" />
                    <title>Home Page</title>
                </head>
            </HelmetProvider>
            
               <div className="text-center space-y-2 sm:text-left">
               <h1>Le Nkap</h1>
                    <article className="space-y-0.5 text-wrap ">                               
                        <h5 className="text-lg text-black font-semibold">
                        Get a whole new experience with our expense tracker
                        </h5>
                    <h3>Welcome Pal !</h3>
                    
                    <h5>Are you new here ?</h5>
                    <h5>If yes, click on the button below to get a full experience of our website!</h5>
                    
                        <p className="text-slate-500 font-medium">
                            Product Engineer
                        </p>
                    </article>
                    <Link to='signup'>
                    <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Create Account</button>
                    </Link>
                </div>
                
            </div>
           </div>
           

    )
}

export default HomePage;