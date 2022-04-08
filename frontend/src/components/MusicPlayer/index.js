import AudioPlayer from 'react-h5-audio-player';
import Like from '../Like';

import 'react-h5-audio-player/lib/styles.css';
import './musicPlayer.css';

// ------------------------------------------------------------------------- //

const MusicPlayer = ({ song }) => {
  return (
    <div className='testAudio'>
      <AudioPlayer
        autoPlay
        customAdditionalControls={[
          <div id='player-info'>
            <Like song={song} />
            <p>{song.title}</p>
          </div>
        ]}
        showFilledVolume={true}
        layout='stacked-reverse'
        src={song.musicFile}
      />
    </div>
  )
}

// ------------------------------------------------------------------------- //

export default MusicPlayer;