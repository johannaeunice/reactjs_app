// import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import {Link } from 'react-router-dom'
import React, { useEffect, useState} from 'react'
import './Dashboard.css'
import axios from 'axios'

const Dashboard = () => {
  // const [expense, setExpense] = useState()

  // useEffect(() =>{

  //   axios.get('/https://le-nkap-v1.onrender.com/transactions').then((data) =>{
  //     console.log(data);
  //     setExpense(data)
  //   })
  // },[])
  return (
    <>
      <HelmetProvider>
        <html lang="en" />
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"></link>
          <title>Dashboard</title>
        </head>

      </HelmetProvider>

      <div className='stcky-top'>
        <nav className="navbar bg-body-tertiary" data-bs-theme="dark">
          <form className="container-fluid">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">Le Nkap</span>
              <input type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1" />
              <button className="btn btn-outline-success" type="submit"><i className="bi bi-search"></i></button>
            </div>
          </form>
        </nav>
      </div>

      {/* Sidebar */}
      <div className="row">
        <div className="col-md-2 bg-light d-none d-md-block sidebar">
          <div className="left-sidebar">
            <ul className="nav flex-column sidebar-nav">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  {/* // eslint-disable-next-line react/no-unknown-property */}
                  <svg className="bi bi-chevron-right" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clipRule="evenodd" /></svg>
                  Account
                </a>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/transactions">
                  <svg className="bi bi-chevron-right" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clipRule="evenodd" /></svg>
                 Transactions
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/category">
                  <svg className="bi bi-chevron-right" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z" clipRule="evenodd" /></svg>
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main */}
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <h3>Expenses</h3>
        <hr />
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>2 packs of sugar</td>
                <td>$50</td>
                <td>Groceries</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>2 packs of biscuit</td>
                <td>$60</td>
                <td>Groceries</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Electricity bill</td>
                <td>$100</td>
                <td>Utilities</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>1 spotify subscription</td>
                <td>$30</td>
                <td>Entertainment</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>2 boomplay subscriptions</td>
                <td>$30</td>
                <td>Entertainment</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Paper clips and books</td>
                <td>$50</td>
                <td>Stationaries</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Groceries</h3>
                <p className="card-text">Total: $110</p>
                <Link className='btn btn-primary' to='/expense' >See More</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Entertainment</h3>
                <p className="card-text">Total: $60</p>
                <Link className='btn btn-primary' to='/expense' >See More</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Utilities</h3>
                <p className="card-text">Total: $100</p>
                <Link className='btn btn-primary' to='/expense' >See More</Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Stationaries</h3>
                <p className="card-text">Total: $50</p>
                <Link className='btn btn-primary' to='/expense' >See More</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>

  )
}

export default Dashboard;