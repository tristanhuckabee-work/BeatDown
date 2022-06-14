 import React, { useState, useEffect } from 'react';
 import { useHistory } from 'react-router-dom'
 import { useDispatch, useSelector } from 'react-redux';
 import * as sessionActions from '../../store/session';
 
 // ------------------------------------------------------------------------ //

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  // const user = useSelector(state => state.session.user);
  
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
    history.push('/');
  };
  const goToPage = e => {
    e.stopPropagation();

    history.push({
      pathname: `/u/${user.username}`,
      state: user
    })
    setShowMenu(false);
  }

  return (
    <>
      <button onClick={openMenu} id='user-btn'>
        <i className='fas fa-user-circle fa-2x' />  
      </button>
      {showMenu && (
        <ul className='profile-dropdown'>
          <li className='user' onClick={goToPage}>{user.username}</li>
          <li>{user.email}</li>
          <hr />
          <li className='signOut' onClick={logout}>
            <i className='fas fa-right-from-bracket fa-2x' />
          </li>
        </ul>
      )}
    </>
  )
}

 // ------------------------------------------------------------------------ //

 export default ProfileButton;