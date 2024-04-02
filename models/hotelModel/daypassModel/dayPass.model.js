import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const DayPass = db.define('dayPass', {
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
  houreStart: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  houreEnd: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export { DayPass };
