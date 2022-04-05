'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        artistId: 4,
        title: 'Plastic Love - Mariya Takeuchi',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191688/Plastic_Love_ywr0ja.mp4',
        waveFile: 'NOT HERE',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 5,
        title: 'Night of Fire - Niko',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191683/Night_of_Fire_sb8phi.mp4',
        waveFile: 'NOT HERE1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 3,
        title: 'No Guardian Angel - Travis Stebbins',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191665/No_Guardian_Angel_tqibdv.mp4',
        waveFile: 'NOT HERE2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 4,
        title: 'Midnight Pretenders - Tomoko Aran',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191684/Midnight_Pretenders_qilu0r.mp4',
        waveFile: 'NOT HERE3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 1,
        title: 'Running in the 90\'s - Max Coveri',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191686/Running_In_The_90_s_srqvic.mp4',
        waveFile: 'NOT HERE4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 1,
        title: 'Uninstall Love - Travis Stebbins',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191637/Uninstall_Love_trqnhf.mp4',
        waveFile: 'NOT HERE5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
