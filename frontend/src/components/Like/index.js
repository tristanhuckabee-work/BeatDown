import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneLike, delOneLike } from '../../store/like';
import './like.css';

// ------------------------------------------------------------------------ //

const Like = ({ song }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector( state => state.session.user );
  const likes = useSelector( state => state.likes );
  const [likeStatus, setLikeStatus] = useState(false)

  let color;
  if (likeStatus) {
    color = {'color':'#f00'}
  } else {
    color = {'color':'#ccc'}
  }
  
  useEffect( () => {
    let likedSongs = [];
    for (let idx = 0; idx < likes.length; idx++ ) {
      let like = likes[idx];
      if ( like.userId === sessionUser.id ) likedSongs.push([like.id, like.songId, like.userId])
    };
    likedSongs.forEach( like => {
      if ( like[1] === song.id) setLikeStatus(true)
    })
  }, [song.id, song.title, sessionUser.id, likeStatus, likes] );

  useEffect(() => {
    return;
  }, [likes, likeStatus])
  
  const handleLike = async (e) => {
    e.stopPropagation();
    
    let payload = {
      userId: sessionUser.id,
      songId: song.id
    }

    if (likeStatus === true) {
      await dispatch(delOneLike(payload))
    } else {
      await dispatch(addOneLike(payload))
    }
    setLikeStatus(!likeStatus);
  }

  return (
    <button
      className='like-btn'
      onClick={handleLike}
    >
      <i
        className={`fas fa-heart fa-2x`}
        style={color}
      />  
    </button>
  )
}

// ------------------------------------------------------------------------ //

export default Like;