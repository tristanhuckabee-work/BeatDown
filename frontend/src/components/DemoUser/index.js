import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

import './demoUser.css';

// ------------------------------------------------------------------------- //

const DemoUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector( state => state.session.user );
  const [credential, setCredential] = useState('yungdemo@user.io');
  const [password, setPassword] = useState('password');
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
    <button className='demo-button' onClick={handleSubmit}> DEMO USER </button>
  )
}

// ------------------------------------------------------------------------- //

export default DemoUser;