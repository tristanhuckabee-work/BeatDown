'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('PlaylistJoins', [
      {
        playlistId: 1,
        songId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 1,
        songId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: 1,
        songId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PlaylistJoins', null, {});
  }
};
