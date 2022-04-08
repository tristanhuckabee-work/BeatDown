import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneLike, delOneLike } from '../../store/like';


import './like.css';

// ------------------------------------------------------------------------ //

const Like = ({ song }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector( state => state.session.user );
  const likes = useSelector( state => state.likes );
  const [likeStatus, setLikeStatus] = useState('unliked')
  const [likeId, setLikeId] = useState();
  let color;
  if (likeStatus === 'liked') {
    color = {'color':'#f00'}
  } else if (likeStatus === 'unliked') {
    color = {'color':'#ccc'}
  }
  
  useEffect( () => {
    let likedSongs = [];
    for (let idx = 0; idx < likes.length; idx++ ) {
      let like = likes[idx];
      if ( like.userId === sessionUser.id ) likedSongs.push([like.id, like.songId, like.userId])
    };
    likedSongs.forEach( like => {
      if ( like[1] === song.id) setLikeStatus('liked')
    })
    // console.log(song.title, likeStatus);
  }, [song.id, song.title, sessionUser.id, likeStatus, likes] );
  
  const handleLike = async (e) => {
    e.stopPropagation()
    
    let payload = {
      userId: sessionUser.id,
      songId: song.id
    }

    if (likeStatus === 'liked') {
      console.log(song.title, 'UNLIKED');
      setLikeStatus('unliked');

      
      let res = await dispatch( delOneLike(payload) )
    } else if (likeStatus === 'unliked') {
      console.log(song.title, 'LIKED');
      setLikeStatus('liked');
      let res = await dispatch( addOneLike(payload) )
    }
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