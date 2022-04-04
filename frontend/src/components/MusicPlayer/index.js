import React, { useState, useEffect } from 'react'

import './musicPlayer.css';

// ------------------------------------------------------------------------- //

const MusicPlayer = () => {
  const song = '../../songs/GasGasGas.mp3';
  const [scrub, setScrub] = useState('0')

  return (
    <div className='audioControl'>
      <audio src={song} preload='metadata' type='audio/mpeg'></audio>
      <div className='scrubControl'>
        <div className='songTimer'>0:00</div>
        <div>
          <input
            className='progress'
            type='range'
            min='0' max='2 * 60'
            value={scrub}>
          </input>
        </div>
        <div className='songTimer'>2:00</div>
      </div>

      <div className='trackControl'>
        <button>
          <i className='fas fa-angles-left fa-2x'></i>
        </button>
        <button>
          <i className='fas fa-circle-play fa-2x'></i>
        </button>
        <button>
          <i className='fas fa-angles-right fa-2x'></i>
        </button>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------------- //

export default MusicPlayer;