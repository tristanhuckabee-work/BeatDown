'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Songs', [
      {
        artistId: 4,
        title: 'Plastic Love - Mariya Takeuchi',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191688/Plastic_Love_ywr0ja.mp4',
        waveFile: 'https://res.cloudinary.com/dzsgront4/image/upload/v1649205347/8b8_hocfp0.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 5,
        title: 'Night of Fire - Niko',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191683/Night_of_Fire_sb8phi.mp4',
        waveFile: 'https://res.cloudinary.com/dzsgront4/image/upload/v1649205648/ab67616d0000b27397974872e84444385ffd01ea_dkmafg.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 3,
        title: 'No Guardian Angel - Travis Stebbins',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191665/No_Guardian_Angel_tqibdv.mp4',
        waveFile: 'https://res.cloudinary.com/dzsgront4/image/upload/v1649205648/ab67616d0000b27397974872e84444385ffd01ea_dkmafg.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 4,
        title: 'Midnight Pretenders - Tomoko Aran',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191684/Midnight_Pretenders_qilu0r.mp4',
        waveFile: 'https://res.cloudinary.com/dzsgront4/image/upload/v1649372063/R-14508181-1575973209-2949_wn2lpr.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 1,
        title: 'Running in the 90\'s - Max Coveri',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191686/Running_In_The_90_s_srqvic.mp4',
        waveFile: 'https://res.cloudinary.com/dzsgront4/image/upload/v1649372099/I_Don_27t_Wanna_Break_Your_Sweet_Heart_Single_ssi237.webp',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: 1,
        title: 'Uninstall Love - Travis Stebbins',
        musicFile: 'https://res.cloudinary.com/dzsgront4/video/upload/v1649191637/Uninstall_Love_trqnhf.mp4',
        waveFile: 'https://res.cloudinary.com/dzsgront4/image/upload/v1649267308/cyber-heart-3d-model-max-obj-fbx_xwebql.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Songs', null, {});
  }
};
