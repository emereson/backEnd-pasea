import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const Accommodation = db.define('accommodation', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  hotelId: {
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
  dayStart: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dayEnd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export { Accommodation };
