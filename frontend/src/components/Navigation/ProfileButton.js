 import React, { useState, useEffect } from 'react';
 import { useDispatch } from 'react-redux';
 import * as sessionActions from '../../store/session';
 
 // ------------------------------------------------------------------------ //

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect( () => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu} id='user-btn'>
        <i class='fas fa-user-circle fa-2x' />  
      </button>
      {showMenu && (
        <ul className='profile-dropdown'>
          <li className='user'>{user.username}</li>
          <li>{user.email}</li>
          <hr />
          <li className='signOut'>
            <i class='fas fa-right-from-bracket fa-2x' onClick={logout} />
          </li>
        </ul>
      )}
    </>
  )
}

 // ------------------------------------------------------------------------ //

 export default ProfileButton;