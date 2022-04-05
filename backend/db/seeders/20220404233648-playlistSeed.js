'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Playlists', [
      { 
        userId: 1,
        name: 'Test Playlist',
        createdAt: new Date(),
        updatedAt: new Date() 
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Playlists', null, {});
  }
};
