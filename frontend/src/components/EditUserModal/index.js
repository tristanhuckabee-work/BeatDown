import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup'
import './editUserModal.css';
// ------------------------------------------------------------------------- //
const EditUser = ({ user }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [isHovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [profilePic, setProfilePic] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');

  const editUser = (e) => {
    e.preventDefault();
    e.stopPropagation();

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