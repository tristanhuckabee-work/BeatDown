'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'yungdemo@user.io',
        username: 'Yung-Demo',
        hashedPassword: bcrypt.hashSync('password'),
        profilePic: 'https://res.cloudinary.com/dzsgront4/image/upload/v1649206041/ab67616d0000b2731a8bba168d85553d9b2d47a9_ezchvc.jpg',
        twitter: 'yung_demo',
        instagram: 'yung_demo',
        facebook: 'No...',
        biography: 'This is the demo user for BeatDown.'
      },
      {
        email: 'sepia13@user.io',
        username: 'VaporHax',
        hashedPassword: bcrypt.hashSync('password2'),
        profilePic: 'https://res.cloudinary.com/dzsgront4/image/upload/v1651689328/darthsimpson_e80ofm.png',
        twitter: 'vaporHax',
        instagram: 'the_real_vh',
        facebook: 'vaporHax',
        biography: 'Its ya boi VaporHaxxxxxx.'
      },
      {
        email: 'sjw-queen-slay@user.io',
        username: 'iRememberTumblr',
        hashedPassword: bcrypt.hashSync('password3'),
        profilePic: 'https://res.cloudinary.com/dzsgront4/image/upload/v1652200841/National-I-Love-Horses-Day-640x514_gjojxp.jpg',
      },
      {
        email: 'citypopphantom@user.io',
        username: 'cityPopPhantom',
        hashedPassword: bcrypt.hashSync('password3'),
        profilePic: 'https://res.cloudinary.com/dzsgront4/image/upload/v1649654388/pexels-bryan-catota-3756766_tk3z6n.jpg',
        twitter: 'No...',
        instagram: 'No...',
        facebook: 'No...',
        biography: 'This is the best seed username Ive ever made.'
      },
      {
        email: 'ravequeen@user.io',
        username: 'RaveQueen',
        hashedPassword: bcrypt.hashSync('password3'),
        profilePic: 'https://res.cloudinary.com/dzsgront4/image/upload/v1652200985/4268bd9b4cfc02bc709bf452626882ec_ne0f5n.jpg'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Yung-Demo', 'VaporHax', 'iRememberTumblr', 'cityPopPhantom', 'RaveQueen'] }
    }, {});
  }
};