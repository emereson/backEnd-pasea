import { DataTypes } from 'sequelize';
import { db } from '../../config/db.config.js';

const Hotel = db.define('hotel', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  partnerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  principalImage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  reference: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  locationName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  coordinatesLatitude: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  coordinatesLength: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disable'),
    allowNull: false,
    defaultValue: 'disable',
  },
});

export { Hotel };
