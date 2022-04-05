'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    artistId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    musicFile: DataTypes.STRING,
    waveFile: DataTypes.STRING
  }, {});
  Song.associate = function(models) {
    Song.hasMany(models.Like, { foreignKey: 'songId' })
    Song.hasMany(models.Comment, { foreignKey: 'songId' })
    Song.belongsTo(models.User, { foreignKey: 'userId' })
    Song.belongsToMany(models.Playlist,{
        through: 'PlaylistJoin',
        otherKey: 'playlistId',
        for: 'songId'
      })
  };
  return Song;
};