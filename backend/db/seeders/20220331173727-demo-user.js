'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'yungdemo@user.io',
        username: 'Yung-Demo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'sepia13@user.io',
        username: 'VaporHax',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'sjw-queen-slay@user.io',
        username: 'iRememberTumblr',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Yung-Demo', 'VaporHax', 'iRememberTumblr'] }
    }, {});
  }
};