'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('People', [
      {
        artistId: '4',
        title: 'Plastic Love - Mariya Takeuchi',
        musicFile: 'PlasticLove.mp3',
        waveFile: 'NOT HERE',
      },
      {
        artistId: '5',
        title: 'Night of Fire - Niko',
        musicFile: 'NightOfFire.mp3',
        waveFile: 'NOT HERE',
      },
      {
        artistId: '3',
        title: 'No Guardian Angel - Travis Stebbins',
        musicFile: 'NoGuardianAngel.mp3',
        waveFile: 'NOT HERE',
      },
      {
        artistId: '4',
        title: 'Midnight Pretenders - Tomoko Aran',
        musicFile: 'MidnightPretenders.mp3',
        waveFile: 'NOT HERE',
      },
      {
        artistId: '1',
        title: 'Running in the 90\'s - Max Coveri',
        musicFile: 'RunningInThe90s.mp3',
        waveFile: 'NOT HERE',
      },
      {
        artistId: '1',
        title: 'Uninstall Love - Travis Stebbins',
        musicFile: 'UninstallLove.mp3',
        waveFile: 'NOT HERE',
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
