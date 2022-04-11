# BeatDown
This is a website where you can upoload and listen to music, based on [SoundCloud](https://soundcloud.com/discover), view the [Live Link](https://beat-down.herokuapp.com/).
![forReadme](https://user-images.githubusercontent.com/87467157/162663676-84fe7da7-346f-429d-a7db-c54b5df540a8.png)


## Index
- [MVP Feature List](https://github.com/tristanhuckabee-work/BeatDown/wiki/feature-list)
- [Database Schema](https://github.com/tristanhuckabee-work/BeatDown/wiki/database-schema)
- 
## Technologies Used
HTML, CSS, Javascript, React, Redux, Express, PostgreSQL, VS Code, [Vectr](https://vectr.com/), and Github

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
