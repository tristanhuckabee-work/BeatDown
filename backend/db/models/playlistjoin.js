'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistJoin = sequelize.define('PlaylistJoin', {
    playlistId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {});
  PlaylistJoin.associate = function(models) {
    // associations can be defined here
  };
  return PlaylistJoin;
};