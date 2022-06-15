import { useEffect, useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEditSong } from '../../store/search';
import { getAllComments, addNewComment } from '../../store/comments';
import DeleteModal from '../DeleteSongPage/deleteModal';
import Like from '../Like';
import './songPage.css';
import CommentDelete from './commentDel';
// ------------------------------------------------------------------------- //
const SongPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const sessionUser = useSelector(state => state.session.user);
  const song = useSelector(state => state.search.currentSong)/*location.state*/;
  const likes = useSelector(state => state.likes);
  const LikeCount = likes.filter(like => like.songId === song.id ? true : false).length;
  const comments = useSelector(state => state.comments);
  const artist = song?.User;
  const artistPic = artist?.profilePic || 'https://res.cloudinary.com/dzsgront4/image/upload/v1649372610/images_ffms2y.png'
  const [content, setContent] = useState();
  const [noContent, setNoContent] = useState(false);

  useEffect(() => {
    dispatch(getAllComments(song.id));
  }, [dispatch])
  useEffect(() => {
    return;
  }, [comments])

  const handleCommentAdd = async (e) => {
    e.preventDefault();

    if (!content) {
      setNoContent(true);
    } else {
      const payload = {
        userId: sessionUser.id,
        songId: song.id,
        content,
        user: sessionUser
      }

      await dispatch( addNewComment(payload) );
      setContent('')
    }
  }

  const handleEdit = async (song) => await dispatch(setEditSong(song));
  const handleArtistClick = (e) => {
    e.stopPropagation();

    history.push({
      pathname: `/u/${artist?.username}`,
      state: artist
    })
  }
  const handleUserClick = (e, user) => {
    e.stopPropagation();
    history.push({
      pathname: `/u/${user.username}`,
      state: user
    })
  }
  const userPriv = (song) => {
    if (sessionUser) {
      return (
        <>
          {sessionUser?.id === song?.User?.id && (
            <div className='song-page-user-priv'>
              <DeleteModal song={song} />
              <NavLink to={`/search/songs/${song?.id}/edit`}>
                <i
                  className='fas fa-pen-to-square fa-2x'
                  onClick={() => handleEdit(song)}
                ></i>
              </NavLink>
            </div>
          )}
        </>
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
      <div className='comments'>
        <form onSubmit={handleCommentAdd} id='addComment'>
          <div className='comment-text'>
            <input required placeholder='What do you think?' type='text'
              value={content} onChange={ e => setContent(e.target.value)} />
            { noContent && (
              <p>A comment must have text</p>
            )}
          </div>
          <button type='submit' id='create-comment'>COMMENT</button>
        </form>
        {(comments.length > 0 && (
          <>
            {comments.map(comment => {
              const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
              const ts = comment?.updatedAt?.split('T')[0].split('-');
              const dt = `${months[Number(ts[1]) - 1]} ${ts[2]}, ${ts[0]}`

              return (
                <div key={`comment-${comment.id}`} className='comment-zone'>
                  <div className='comment-user'>
                    <p className='comment-username'
                      onClick={(e) => handleUserClick(e, comment?.User)}
                    >{comment?.User?.username}</p>
                    { comment?.User?.id === sessionUser?.id && (
                      <span>
                        <CommentDelete id={comment?.id} />
                      </span>
                    )}
                  </div>
                  <div className='comment'>
                    <p>{comment?.content}</p>
                    <p className='comment-date'>{dt}</p>
                  </div>
                </div>
              )
            })}
          </>
        )) || (
            <div className='no-comments'>
              <p>No Comments...</p>
            </div>
          )
        }
      </div>
      <div className='artist-info'>
        <div className='artist-info-pic'
          style={{ backgroundImage: `url(${artistPic})` }}
          onClick={handleArtistClick}
        ></div>
        <h2 onClick={handleArtistClick}>{artist?.username}</h2>
        {userPriv(song)}
      </div>
    </div>
  )
};
// ------------------------------------------------------------------------- //
export default SongPage;