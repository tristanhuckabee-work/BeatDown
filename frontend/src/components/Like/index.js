import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './like.css';

// ------------------------------------------------------------------------ //

const Like = ({ song }) => {
 return (
   <>
     <button className='like-btn'>
       <i className='fas fa-heart fa-2x' />  
     </button>
   </>
 )
}

// ------------------------------------------------------------------------ //

export default Like;