import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './like.css';

// ------------------------------------------------------------------------ //

const Like = ({ song }) => {
  const dispatch = useDispatch();
  const [likeStatus, setLikeStatus] = useState('liked')

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