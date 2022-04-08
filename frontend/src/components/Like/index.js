import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addOneLike, delOneLike } from '../../store/like';


import './like.css';

// ------------------------------------------------------------------------ //

const Like = ({ song, likes, user }) => {
  const dispatch = useDispatch();
  const [likeStatus, setLikeStatus] = useState('unliked')
  const [likeId, setLikeId] = useState();
  
  useEffect( () => {
    for (let idx = 0; idx < likes.length; idx++ ) {
      let like = likes[idx];
      if ( like.songId === song.id && like.userId === user) {
        setLikeStatus('liked');
        setLikeId(like.id)
        console.log(`${song.title}: `, likeStatus);
      }
    };
  }, [song.id, likes] );
  
  const handleLike = async (e) => {
    e.preventDefault()

    if (likeStatus === 'liked') {
      console.log('UNLIKED');
      setLikeStatus('unliked');
      //dispatch delete
      // let res = await dispatch( delOneLike(payload) )
    } else if (likeStatus === 'unliked') {
      console.log('LIKED');
      setLikeStatus('liked');
      //dispatch post
    }
  }

  return (
    <button
      className='like-btn'
      onClick={handleLike}
    >
      <i className={`fas fa-heart fa-2x ${likeStatus}`} />  
    </button>
  )
}

// ------------------------------------------------------------------------ //

export default Like;