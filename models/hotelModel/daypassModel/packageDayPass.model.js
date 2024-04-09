import { BOOLEAN, DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const PackageDayPass = db.define('packageDayPass', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  dayPassiD: {
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
    allowNull: false,
  },
  endTimetable1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTimetable2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endTimetable2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTimetable3: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endTimetable3: {
    type: DataTypes.STRING,
    allowNull: false,
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
