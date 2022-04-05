'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});
  Playlist.associate = function(models) {
    Playlist.belongsTo(models.User, {foreignKey : 'userId'})
    Playlist.belongsToMany(models.Song, {
      through: 'PlaylistJoin',
      foreignKey: 'playlistId'
    })
  };
  return Playlist;
};