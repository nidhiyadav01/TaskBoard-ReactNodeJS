import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useHistory } from 'react-router-dom';
import { signup } from './api/signup';
import './App.css'

function Signup() {
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      // Redirect to tasks page after successful signup
      history('/tasks');
    } catch (error) {
      console.error('Signup failed', error);
      // Handle signup error
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <h1 className="signup-heading">Signup Page</h1>
    <form onSubmit={handleSignup} className="signup-form">
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="signup-input"
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="signup-input"
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="signup-input"
      />

      <button type="submit" className="signup-button">
        Sign Up
      </button>
    </form>
    </div>
  );
}

export default Signup;