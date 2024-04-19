import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const ServiceSetAccommodation = db.define('serviceSetAccommodation', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  setAccommodationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  iconSvg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disable'),
    allowNull: false,
    defaultValue: 'disable',
  },
});

export { ServiceSetAccommodation };
