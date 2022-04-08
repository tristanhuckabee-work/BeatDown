import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


import './like.css';

// ------------------------------------------------------------------------ //

const Like = ({ song, likes }) => {
  const [likeStatus, setLikeStatus] = useState('unliked')

  useEffect( () => {
    for (let idx = 0; idx < likes?.length; idx++ ) {
      if ( likes[idx].songId === song.id ) {
        setLikeStatus('liked');
      } else {
        setLikeStatus('unliked');
      }
    };
  }, [song.id, likes] );

  return (
    <button className='like-btn'>
      <i className={`fas fa-heart fa-2x ${likeStatus}`} />  
    </button>
  )
}

// ------------------------------------------------------------------------ //

export default Like;