import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSongs } from '../../store/search.js';

const Test = ({songs}) => {
  // const dispatch = useDispatch();
  
  // useEffect( () => {
  //   dispatch( getAllSongs() );
  // }, [dispatch]);

  // const songsObj = useSelector( state => state.search.songs );
  
  return (
    <>
      <div className='songList'>
        <h2>TRACKS</h2>
        {songs.map( song => {
          return (
            <div
              key={song.id}
              className='songItem'
              
              >{song.title}</div>  
          )
        })}
      </div>
    </>
  )
}

export default Test;