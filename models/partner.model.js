import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const Partner = db.define('partner', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ruc: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    unique: true,
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
  status: {
    type: DataTypes.ENUM('active', 'disable'),
    allowNull: false,
    defaultValue: 'disable',
  },
  codeVerification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Partner };
