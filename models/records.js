'use strict';
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Records', {
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
  },
  {
    timestamps : true,
    freezeTableName : true
  });
};