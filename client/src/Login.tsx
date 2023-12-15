
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { NavLink } from 'react-router-dom'
import { login } from './api/login';
import "./App.css";
import "./Navbar.css";
import axios from 'axios';


function App() {
    const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState(''); // Add login email state
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
 
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const message = urlParams.get('message');
  
  if (message) {
    
    alert(message);
  }
  
  const handleLogin = async (e: React.FormEvent) => {
   
      
      e.preventDefault();
    try {
      const response = await login(loginEmail, loginPassword); // Call the login function with email and password
      const token = response;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/tasks');
    } catch (error) {
      console.error('Login failed', error);
      
      setLoginError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <nav className="navbar" >
      <div className="container">
        
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/login"><b>Task Manager</b></NavLink>
             </li>
        
             
             <li>
              <NavLink to="/">Sign Up</NavLink>
            </li>
           </ul>
         </div>
       </div>
     </nav>
    
      
    

    <div>
        <h1 className="login-heading">Login Page</h1>
        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="loginEmail">Email</label>
          <input
            type="email"
            id="loginEmail"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="login-input"
          />

          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            id="loginPassword"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="login-input"
          />

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;


