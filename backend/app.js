const cookieParser = require('cookie-parser');
const cors = require('cors');
const csurf = require('csurf');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const { environment } = require('./config');
const { isProduction } = environment === 'production';

const app = express();
const routes = require('./routes');

app.use( morgan('dev') );
app.use( cookieParser() );
app.use( express.json() );
app.use( routes );

// SECURITY
if ( !isProduction ) app.use( cors() );
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && 'Lax',
      httpOnly: true
    }
  })
);

module.exports = app;