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
        <li>
          <NavLink to='/login'>LOG-IN</NavLink>
        </li>
        <li>
          <NavLink to='/signup'>REGISTER</NavLink>
        </li>
      </>
    );
  }


  return (
    <ul>
      <li>
        <NavLink exact to='/'>HOME</NavLink>
      </li>
        {isLoaded && sessionLinks}
    </ul>
  );
}

// ------------------------------------------------------------------------- //

export default Navigation;