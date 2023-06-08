import React, { useState } from 'react';
import {createUserWithEmailAndPassword } from 'firebase/auth';
import {Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';


const UserSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Redirect user to the user dashboard or desired page
      localStorage.setItem('token',false)
      navigate('/search')
      console.log('User registered:', userCredential.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-center">Signup</h2>
      <form onSubmit={handleSignup}className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="border rounded w-full py-2 px-3 text-gray-700"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="border rounded w-full py-2 px-3 text-gray-700"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Signup</button>
      </form>
      <p>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
  );
};

export default UserSignUp;
