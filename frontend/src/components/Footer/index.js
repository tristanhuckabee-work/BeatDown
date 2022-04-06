import React from 'react';

import './footer.css'

// ------------------------------------------------------------------------- //

const Footer = () => {
  return (
    <footer>
      <p>&copy; Tristan Huckabee 2020</p>
      <div>
        <a href='https://github.com/tristanhuckabee-work/BeatDown' target='_blank'>
          <i className='fab fa-github-square fa-2x'></i>
        </a>
        <a href='https://www.linkedin.com/in/tristan-huckabee-60402122a/' target='_blank'>
          <i className='fab fa-linkedin fa-2x'></i>
        </a>
      </div>
    </footer>
  );
}

// ------------------------------------------------------------------------- //

export default Footer;