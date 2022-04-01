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
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          { errors.map((err, idx) => <li key={idx}>{err}</li>)}
        </ul>
        <label for='email'>
          USERNAME or eMAIL
          <input required type='text'
            value={credential} onChange={ e => setCredential(e.target.value) } />
        </label>
        <label for='password'>
          PASSWORD
          <input type='password' required
            value={password} onChange={ e => setPassword(e.target.value) } />
        </label>
        <button type="submit">LOGIN</button>
      </form>
    </div>
  )
}

export default LoginFormPage;