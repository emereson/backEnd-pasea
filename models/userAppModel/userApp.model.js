import { DataTypes } from 'sequelize';
import { db } from '../../config/db.config.js';

const UserApp = db.define('userApp', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  nameLastName: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nameUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idNumberOrPassport: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { UserApp };
