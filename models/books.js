'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Books', {
      title: DataTypes.STRING,
      author: DataTypes.STRING    
  },
  {
    timestamps : true,
    freezeTableName : true,
    indexes : [{unique: true, fields : ['title']}]
  });
};