# BeatDown
This is a website where you can upload and listen to music, based on [SoundCloud](https://soundcloud.com/discover), view the [Live Link](https://beat-down.herokuapp.com/).
![forReadme](https://user-images.githubusercontent.com/87467157/162663676-84fe7da7-346f-429d-a7db-c54b5df540a8.png)


## Index
- [MVP Feature List](https://github.com/tristanhuckabee-work/BeatDown/wiki/feature-list)
- [Database Schema](https://github.com/tristanhuckabee-work/BeatDown/wiki/database-schema)
## Technologies Used

  <p>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/>
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/>
    <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>
    <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/>
  </p>

## How to Use
Either visit the [Live Link](https://beat-down.herokuapp.com/) or follow the directions below...
1. Clone this reopository
2. Run `npm install` from the root directory
3. In PSQL, run `CREATE USER <name> WITH PASSWORD '<password>' CREATEDB` (replacing the name with a username, and password with a password)
4. Create a new .env file based on the .env.example file in the backend directory
5. Enter your username, password, and desired database name into the .env as well as a JWT_SECRET and your desired port (preferably 500);
6. Add `"proxy": "http://localhost:<PORT>` to your package.json within the frontend directory, matching the port with the port specified in your .env file.
7. Run the following commands in order...
- `npx dotenv sequelize db:create`
- `npx dotenv sequelize db:migrate`
- `npx dotenv sequelize db:seed:all`
8. Start the services in the backend with `npm start`
9. Start the services in the frontend with `npm start` 
10. You may use the Demo Login or Create an Account to begin using the site.

## Features
Anyone can view and listen to a track.
Logged in Users may...
- Add, Edit, Delete Songs
- Like and Unlike Songs
- Comment on Songs

## Problems, Solutions, and Outcomes
### Problem: If a song is 'liked' on-load then you can not 'unlike'...
- Solution: I rewrote the reducer in the like-store for adding and deleting likes.
- Outcome: Though you can like and unlike at will with a single click.
### Problem: Unable to play songs from a user page...
- Solution: I rewrote the way the music player accessed the tracks, previously they were given via a slice of state, throught the redux store.
- Outcome: You can play music from any page that has a track to click on.
