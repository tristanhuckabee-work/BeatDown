import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormPage/loginFormModal';
import SignupFormModal from '../SignUpForm/signupFormModal';
import DemoUser from '../DemoUser';

import './navigation.css'

// ------------------------------------------------------------------------- //

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector( state => state.session.user );
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className='userActions'>
        <ProfileButton user={sessionUser} />
        <NavLink to='/search/songs/new' className='upload'>UPLOAD</NavLink>
      </div>
    );
  } else {
    sessionLinks = (
      <div className='login-signup'>
        <DemoUser />
        <LoginFormModal />
        <SignupFormModal />
      </div>
    );
  }


  return (
    <header>
      <div>
        {/* <NavLink exact to='/'>
          <img src='../../images/logo.svg' alt='BeatDown logo' />
        </NavLink> */}
        <NavLink exact to='/'>HOME</NavLink>
      </div>
      <div className='nav-right'>
        <div className='userInfo'>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </header>
  );
}

// ------------------------------------------------------------------------- //

export default Navigation;