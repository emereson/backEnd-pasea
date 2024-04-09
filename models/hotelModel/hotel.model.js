import { Sequelize, DataTypes } from 'sequelize';
import { db } from '../../config/db.config.js';

const Hotel = db.define('hotel', {
  id: {
    primaryKey: true,
    allowNull: false,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  partnerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stars: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
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
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
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
