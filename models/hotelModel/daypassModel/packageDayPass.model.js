import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const PackageDayPass = db.define('packageDayPass', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  dayPassId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeRoom: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  startTimetable1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  endTimetable1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startTimetable2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  endTimetable2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  startTimetable3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  endTimetable3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  priceDays: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  priceSatuyday: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export { PackageDayPass };
