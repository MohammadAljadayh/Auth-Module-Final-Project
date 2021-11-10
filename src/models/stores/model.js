'use strict';

const storeModel = (sequelize, DataTypes) => sequelize.define('Store', {
  name: { type: DataTypes.STRING, required: true },
  price: { type: DataTypes.STRING, required: true },
  stock: { type: DataTypes.STRING, required: true },
  location : { type: DataTypes.STRING, required: true }
});

module.exports = storeModel;
