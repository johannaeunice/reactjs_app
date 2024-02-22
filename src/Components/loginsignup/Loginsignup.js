// import React from 'react'
// import axios from 'axios'
import { useState } from 'react'
import SignUpForm from './Signup'
// import { useForm } from 'react-hook-form'
// import {Link} from 'react-router-dom'
// import './Loginsignup.css'
// import account_icon from '../icons/account_circle.png'
// import email_icon from '../icons/alternate_email.png'
// import password_icon from '../icons/lock.png'
// import feedback_icon from '../icons/feedback.png'
// import contact_icon from '../icons/contact_support.png'

function Loginsignup() {

  
  const [user, setUser] = useState([])
  const addUser = (data) => {
      console.log(data);
      setUser(() => [...user, data])
  }

  return (
    <div>
      <SignUpForm RegisterUser={addUser}/>
    </div>
  )
}

export default Loginsignup;