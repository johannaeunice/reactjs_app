import './Contact.css'
import {Link} from 'react-router-dom'
import React from 'react'
import contact_icon from '../icons/contact_support.png'
import home_icon from '../icons/home.png'
import feedback_icon from '../icons/feedback.png'

function Contact() {
    return (
        <div className="container">

            <div className="top">
                <Link to='/'>
                    <button type="button" title="Home">
                        <img src={home_icon} alt="" />
                        Home
                    </button>
                </Link>
                {/* add toggle for light and dark modes */}
            </div>
            <div className="contact">
                <div className="main">

                    <h1 title='Contact Us'>
                        <img src={contact_icon} alt="" />
                        Contact Us
                    </h1>
                    <address>
                        Created by J.E Prog. <br></br>
                        Get in touch at: <br></br>
                        belemejohannaeunice@gmail.com <br></br>
                        +237 681385261 <br></br>
                        +237 687474617 <br></br>
                        P.O Box 5234, Yaoundé <br></br>
                        Cameroon
                    </address>
                </div>
            </div>
            <div className="bottom">
                <a href="#">
                    <button type="button" title="Feedback">
                        <img src={feedback_icon} alt="" />
                        Feedback
                    </button>
                </a>
            </div>
        </div>

    )
}

export default Contact;