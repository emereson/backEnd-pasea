import { DataTypes } from 'sequelize';
import { db } from '../../config/db.config.js';

const OpinionDayPass = db.define('opinionDayPass', {
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
  hearts: {
    type: DataTypes.ENUM(1, 2, 3, 4, 5),
    allowNull: false,
    defaultValue: 5,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  checkIn: {
    type: DataTypes.ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
    allowNull: false,
    defaultValue: 10,
  },
  services: {
    type: DataTypes.ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
    allowNull: false,
    defaultValue: 10,
  },
  comfort: {
    type: DataTypes.ENUM(1, 2, 3, 4, 5, 6, 7, 8, 9, 10),
    allowNull: false,
    defaultValue: 10,
  },
});

export { OpinionDayPass };
