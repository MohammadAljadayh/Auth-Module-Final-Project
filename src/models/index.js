'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const storeModel = require('./stores/model');

const userModel = require('./users.js');
const Collection = require('./data-collection.js');

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};


let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const users = userModel(sequelize, DataTypes);
const addressModel = require('./address/model');
const addresses = addressModel(sequelize, DataTypes);

addresses.hasMany(users, { foreignKey: 'userId', sourceKey: 'id' });
users.belongsTo(addresses, { foreignKey: 'userId', targetKey: 'id' });

const address= new Collection(addresses);
const userCollection =new Collection(users)

const stores = storeModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users:users,
  stores: new Collection(stores),
  userCollection: userCollection,
  address: address
};

