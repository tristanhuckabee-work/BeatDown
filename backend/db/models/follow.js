'use strict';

const song = require("./song");

module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: DataTypes.INTEGER,
    followedId: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    
  };
  return Follow;
};