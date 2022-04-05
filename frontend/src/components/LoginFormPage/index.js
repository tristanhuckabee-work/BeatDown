import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import './LoginForm.css';

// ------------------------------------------------------------------------- //

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector( state => state.session.user );
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) history.push('/');

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch( async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} id='login'>
      { errors.length > 0 && (
        <ul id='login-errors'>
          { errors.map((err, idx) => <li key={idx}>{err}</li>)}
        </ul>
      )}
      <label>
        <input required placeholder='eMail' type='text'
          value={credential} onChange={ e => setCredential(e.target.value) } />
      </label>
      <label>
        <input required placeholder='Password' type='password'
          value={password} onChange={ e => setPassword(e.target.value) } />
      </label>
      <button type="submit" id='login-subm'>LOG-IN</button>
    </form>
  )
}

// ------------------------------------------------------------------------- //

export default LoginFormPage;