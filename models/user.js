'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Users", {
    name: DataTypes.STRING
  },
  {
    timestamps : true,
    freezeTableName : true
  });
};