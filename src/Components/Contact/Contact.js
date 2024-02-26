import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://formspree.io/f/xleqnbgo', formData);
      if (response.status === 200) {
        setSuccessMessage('Message successfully sent');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        setFormData({
          email: '',
          message: ''
        });
      }
    } catch (error) {
      setErrorMessage('Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-200">
        <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-blur bg-fixed" style={{ backgroundImage: `url('https://github.com/johannaeunice/reactjs_app/blob/master/src/Components/Contact/contact.png?raw=true')` }}>
      <div className="bg-white p-8 rounded-lg max-w-md w-full" style={{ margin: '0 60px' }}>
        <h2 className="text-2xl font-bold mb-4 uppercase text-left">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-lg" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold">Message:</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="w-full p-4 border border-gray-300 rounded-lg h-48 resize-none" required></textarea>
          </div>
          <div>
            <button type="submit" className="w-full px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:bg-purple-700">
              {loading ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : 'Send'}
            </button>
          </div>
        </form>
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
    </div>
  );
};

export default ContactPage;
