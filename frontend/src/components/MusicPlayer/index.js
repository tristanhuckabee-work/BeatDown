import React, { useState, useEffect, useRef } from 'react'

import './musicPlayer.css';

// ------------------------------------------------------------------------- //

const MusicPlayer = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  const [currVol, setCurrVol] = useState(50);

  const musicPlayer = useRef(); //uses to reference audio component
  const progressBar = useRef(); //references progressBar
  const slider = useRef(); //reference animation of slider
  const volRange = useRef(); //reference volume slider

  const depend1 = musicPlayer?.current?.loadedmetadata;
  const depend2 = musicPlayer?.current?.readyState;

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      musicPlayer.current.play();
      slider.current = requestAnimationFrame(isisPlaying);
    } else {
      musicPlayer.current.pause();
      cancelAnimationFrame(slider.current);
    }
  };

  useEffect(() => {
    const seconds = Math.floor(musicPlayer.current.duration);
    setDuration(seconds);

    progressBar.current.max = seconds;
  }, [depend1, depend2]);

  const time = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    const seconds = Math.floor(sec % 60);
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${returnMinutes}:${returnSeconds}`;
  };

  const isisPlaying = () => {
    progressBar.current.value = musicPlayer.current.currTime;
    changemusicPlayerTime();
    slider.current = requestAnimationFrame(isisPlaying);
  };

  const changeRange = () => {
    musicPlayer.current.currTime = progressBar.current.value;
    changemusicPlayerTime();
  };

  const changeVolume = () => {
    musicPlayer.current.currVol = volRange.current.value;
    setCurrVol(volRange.current.value);
  };

  const changemusicPlayerTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrTime(progressBar.current.value);
  };

  return (
    <div className="audioControl">
      <audio ref={musicPlayer} src={song}></audio>
      <div className='scrubControl'>
        <div className="songTimer current-time">
          {time(currTime)}
        </div>
        <div>
          <input
            className="progress"
            type="range"
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
        </div>
        <div className="songTimer duration">
          {duration && !isNaN(duration) && time(duration)}
        </div>
      </div>

      <div className='trackControl'>
        <button>
          <i className='fas fa-backward-fast fa-2x'></i>
        </button>
        <button onClick={togglePlayPause}>
        { isisPlaying ? <i className='fas fa-circle-pause fa-3x'></i> : <i className='fas fa-circle-play fa-3x'></i>}
        </button>
        <button>
          <i className='fas fa-forward-fast fa-2x'></i>
        </button>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------- //

export default MusicPlayer;