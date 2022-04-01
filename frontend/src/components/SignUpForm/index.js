import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import './signupForm.css';

// ------------------------------------------------------------------------- //

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form onSubmit={handleSubmit} id='signup'>
      { errors.length > 0 && (
        <ul id='login-errors'>
          { errors.map((err, idx) => <li key={idx}>{err}</li>)}
        </ul>
      )}
      <label>
        <input required placeholder='eMail' type='text' 
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label >
        <input required placeholder='Username' type='text'
          value={username} onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label >
        <input required placeholder='Password' type='password'
          value={password}  onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label >
        <input required placeholder='Confirm Password' type='password'
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </label>
      <button type='submit' id='signup-subm'>REGISTER</button>
    </form>
  );
}

// ------------------------------------------------------------------------- //

export default SignupFormPage;