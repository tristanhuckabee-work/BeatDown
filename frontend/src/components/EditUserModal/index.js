import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup'
import { updateUser } from '../../store/session';
import './editUserModal.css';
// ------------------------------------------------------------------------- //
const EditUser = ({ user }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [isHovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [instagram, setInstagram] = useState(user.instagram);
  const [twitter, setTwitter] = useState(user.twitter);
  const [facebook, setFacebook] = useState(user.facebook);
  const [biography, setBio] = useState(user.biography)

  const editUser = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('in dispatch', sessionUser);
    sessionUser.profilePic = profilePic;
    sessionUser.instagram  = instagram;
    sessionUser.twitter    = twitter;
    sessionUser.facebook   = facebook;
    sessionUser.biography  = biography;

    // const updatedUser = {
    //   id: user.id,
    //   profilePic,
    //   instagram,
    //   twitter,
    //   facebook,
    //   biography
    // }
    console.log('in dispatch', sessionUser);
    await dispatch( updateUser(sessionUser) );

    setOpen(false);
  }
  const toggleMSG = () => setHovered(!isHovered);
  const toggleOpen= () => setOpen(!open);

  const updatePic = (e) => setProfilePic(e.target.value);
  const updateInsta = (e) => setInstagram(e.target.value);
  const updateTwitter = (e) => setTwitter(e.target.value);
  const updateFaceBook = (e) => setFacebook(e.target.value);

  return (
    <>
      {isHovered && (
        <>Edit This Bish?</>
      )}
      <i className='fas fa-pen-to-square'
        onMouseOver={toggleMSG}
        onMouseLeave={toggleMSG}
        onClick={toggleOpen}
      />
      <Popup open={open} onClose={() => setOpen(false)} modal>
        <form className='edit-user' onSubmit={editUser}>
          {errors.length > 0 && (
            <div className='errors'>
              {errors.map((error, idx) => (
              <div key={idx}>{error}</div>
              ))}
            </div>
          )}
          <div className='formGroup'>
            <input
              type='text'
              name='profilePic'
              onChange={updatePic}
              value={profilePic}
              placeholder='Profile Picture URL'
            ></input>
            <div className='profile-preview'
              style={{backgroundImage: `url(${profilePic})`}}
            ></div>
          </div>
          <div className='formGroup'>
            <input
              type='text'
              name='instagram'
              onChange={updateInsta}
              value={instagram}
              placeholder='Instagram URL'
            ></input>
          </div>
          <div className='formGroup'>
            <input
              type='text'
              name='twitter'
              onChange={updateTwitter}
              value={twitter}
              placeholder='Twitter URL'
            ></input>
          </div>
          <div className='formGroup'>
            <input
              type='text'
              name='facebook'
              onChange={updateFaceBook}
              value={facebook}
              placeholder='Facebook URL'
            ></input>
          </div>
          {(!errors.length && (
            <button className='edit-user-subm' type='submit'>Update User</button>
          )) || (errors.length && (
            <p className='invalid-form'>Please Correct Errors</p>
          ))}
        </form>
      </Popup>
    </>
  )
};
// ------------------------------------------------------------------------- //
export default EditUser;