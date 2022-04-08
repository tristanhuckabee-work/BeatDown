import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './like.css';

// ------------------------------------------------------------------------ //

const Like = ({ song, likes }) => {
  const [likeStatus, setLikeStatus] = useState('unliked')
  likes.forEach( like => {
    if ( like.id === song.id ) setLikeStatus('liked')
  })

  return (
    <>
      <button className='like-btn'>
        <i className={`fas fa-heart fa-2x ${likeStatus}`} />  
      </button>
    </>
  )
}

// ------------------------------------------------------------------------ //

export default Like;