import React, { useState, useEffect, useRef } from 'react'
import { signup } from '../../store/session';

import './musicPlayer.css';

// ------------------------------------------------------------------------- //

const MusicPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackLength, setTrackLength] = useState(0);
  const [currTime, setCurrTime] = useState(0);

  const musicPlayer = useRef();
  const progress = useRef();
  const knobbyPos = useRef();
  const currTrack = song.musicFile;

  useEffect( () => {
    const secs = Math.floor(musicPlayer.current.duration)
    setTrackLength(secs);

    progress.current.max = secs;
  }, [musicPlayer?.current?.loadedmetadata, musicPlayer?.current?.readyState]);

  const togglePlayPause = () => {
    const prevVal = isPlaying
    setIsPlaying(!prevVal);
    if (!prevVal) {
      musicPlayer.current.play();
      knobbyPos.current = requestAnimationFrame(playing);
    } else {
      musicPlayer.current.pause();
      cancelAnimationFrame(knobbyPos.current);
    }
  };

  const playing = () => {
    progress.current.value = musicPlayer.current.currentTime;
    changeCurrTime();
    knobbyPos.current = requestAnimationFrame(playing);
  }

  const changeScrub = () => {
    musicPlayer.current.currentTime = progress.current.value;
    changeCurrTime();
  }

  const calcTime = (secs) => {
    const minutes = Math.floor( secs / 60 );
    const seconds = secs % 60;
    const newMins = minutes < 10 ? `0${minutes}` : minutes;
    const newSecs = seconds < 10 ? `0${seconds}` : seconds;

    return `${newMins}:${newSecs}`;
  }

  const changeCurrTime = () => {
    progress.current.style.setProperty('--seek-before-width', `${progress.current.value / trackLength * 100}%`);
    setCurrTime(progress.current.value);
  }

  const changeThirty = (op) => {
    if (op === 'minus') {
      progress.current.value = Number(progress.current.value - 30);
    } else {
      progress.current.value = Number(progress.current.value + 30);
    }
    changeScrub();
  }

  //--------------------------------------------------------

  return (
    <div className="audioControl">
      <audio src={currTrack} ref={musicPlayer}></audio>
      <div className='scrubControl'>
        <div className="songTimer current-time">
          {
            calcTime(currTime)
          }
        </div>
        <div>
          <input
            type="range"
            className="progress"
            defaultValue="0"
            ref={progress}
            onChange={changeScrub}
          />
        </div>
        <div className="songTimer">
          {
            ( trackLength && !isNaN(trackLength) ) && calcTime(trackLength)
          }
        </div>
      </div>

      <div className='trackControl'>
        <button onClick={e => changeThirty('minus')} >
          <i className='fas fa-backward-fast fa-2x'></i>
        </button>
        <button onClick={togglePlayPause}>
        { isPlaying ? <i className='fas fa-circle-pause fa-3x'></i> : <i className='fas fa-circle-play fa-3x'></i>}
        </button>
        <button onClick={e => changeThirty('plus')} >
          <i className='fas fa-forward-fast fa-2x'></i>
        </button>
      </div>

      <div className='trackInfo'>
        <h4>{song.title}</h4>
        <h5>{song?.User?.username}</h5>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------- //

export default MusicPlayer;