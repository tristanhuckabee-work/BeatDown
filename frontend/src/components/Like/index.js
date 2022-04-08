import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { addOneLike, delOneLike } from '../../store/like';


import './like.css';

// ------------------------------------------------------------------------ //

const Like = ({ song }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector( state => state.session.user );
  const likes = useSelector( state => state.likes );
  const [likeStatus, setLikeStatus] = useState('unliked')
  const [style, setStyle] = useState(likeStatus === 'liked' ? {'color':'#f00'} : {'color':'#ccc'})
  const [likeId, setLikeId] = useState();
  
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
    console.log(song.title, likeStatus)

    // if (likeStatus === 'liked') {
    //   console.log('UNLIKED');
    //   setLikeStatus('unliked');
    //   //dispatch delete
    //   // let res = await dispatch( delOneLike(payload) )
    // } else if (likeStatus === 'unliked') {
    //   console.log('LIKED');
    //   setLikeStatus('liked');
    //   //dispatch post
    // }
  }

  return (
    <button
      className='like-btn'
      onClick={handleLike}
    >
      <i
        className={`fas fa-heart fa-2x ${likeStatus}`}
        style={style}
      />  
    </button>
  )
}

// ------------------------------------------------------------------------ //

export default Like;