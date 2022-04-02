import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton';

import './navigation.css'

// ------------------------------------------------------------------------- //

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector( state => state.session.user );
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div>
          <NavLink to='/login'>LOG-IN</NavLink>
        </div>
        <div>
          <NavLink to='/signup'>REGISTER</NavLink>
        </div>
      </>
    );
  }


  return (
    <header>
      <div>
        <NavLink exact to='/'>HOME</NavLink>
      </div>
        {isLoaded && sessionLinks}
    </header>
  );
}

// ------------------------------------------------------------------------- //

export default Navigation;