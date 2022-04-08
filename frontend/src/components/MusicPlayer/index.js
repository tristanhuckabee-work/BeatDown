import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';
import './musicPlayer.css';

// ------------------------------------------------------------------------- //

const hasSong = (song) => {
  if ( typeof song === 'object' ) {
    return (
      <div id='player-info'>
        <p>{song.title}</p>
      </div>
    )
  } else {
    return ( <p>NO TRACK SELECTED</p> );
  }
}

const MusicPlayer = ({ song }) => {
  let playerInfo = hasSong(song);

  return (
    <div className='testAudio'>
      <AudioPlayer
        autoPlay
        customAdditionalControls={[ playerInfo ]}
        showFilledVolume={true}
        layout='stacked-reverse'
        src={song.musicFile}
      />
    </div>
  )
}

// ------------------------------------------------------------------------- //

export default MusicPlayer;