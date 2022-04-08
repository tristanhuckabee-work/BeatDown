import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneLike, delOneLike } from '../../store/like';


import './like.css';

// ------------------------------------------------------------------------ //

const Like = ({ song }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector( state => state.session.user );
  const likes = useSelector( state => state.likes );
  const [likeStatus, setLikeStatus] = useState('liked')
  const [likeId, setLikeId] = useState();
  
  useEffect( () => {
    for (let idx = 0; idx < likes.length; idx++ ) {
      let like = likes[idx];
      if ( like.songId === song.id && like.userId === sessionUser.id) {
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