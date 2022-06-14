import { useEffect } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setEditSong } from '../../store/search';
// import Popup from 'reactjs-popup'
import DeleteModal from '../DeleteSongPage/deleteModal';
import EditUser from '../EditUserModal';
import Like from '../Like';
import './songPage.css';
// ------------------------------------------------------------------------- //
const SongPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const sessionUser = useSelector(state => state.session.user);
  const song = location.state;
  const likes = useSelector(state => state.likes);
  const LikeCount = likes.filter(like => like.songId === song.id ? true : false).length;
  const artist = song.User;
  const artistPic = artist.profilePic || 'https://res.cloudinary.com/dzsgront4/image/upload/v1649372610/images_ffms2y.png'


  const handleEdit = async (song) => await dispatch(setEditSong(song));
  const handleArtistClick = (e, user) => {
    e.stopPropagation();

    history.push({
      pathname: `/u/${artist.username}`,
      state: artist
    })
  }
  const userPriv = (song) => {
    if (sessionUser) {
      return (
        <div className='userIcons'>
          {sessionUser.id === song.User.id && (
            <>
              <DeleteModal song={song} />
              <NavLink to={`/search/songs/${song.id}/edit`}>
                <i
                  className='fas fa-pen-to-square fa-2x'
                  onClick={() => handleEdit(song)}
                ></i>
              </NavLink>
            </>
          )
          }
          <Like song={song} likes={likes} user={sessionUser.id} />
        </div>
      )
    }
  }

  return (
    <div className='song-page-container'>
      <div className='song-info'
        style={{ backgroundImage: `url(${song.waveFile})` }}
      >
        <div className='song-info-bar'>
          <h2>{song.title}</h2>
          <div className='song-info-like'>
            <p>{LikeCount}</p>
            <Like song={song} likes={likes} user={sessionUser.id} />
          </div>
        </div>
      </div>
      <div className='comments'></div>
      <div className='artist-info'>
        <div className='artist-info-pic'
          style={{ backgroundImage: `url(${artistPic})` }}
          onClick={handleArtistClick}
        ></div>
        <h2 onClick={handleArtistClick}>{artist.username}</h2>
        <div className='song-page-user-priv'></div>
      </div>
    </div>
  )
};
// ------------------------------------------------------------------------- //
export default SongPage;