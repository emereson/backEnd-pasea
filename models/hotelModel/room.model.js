import { DataTypes } from 'sequelize';
import { db } from '../../config/db.config.js';

const Room = db.define('room', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  hotelId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  typeRoom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberRooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  individualBed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doubleBed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  largeDoubleBed: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availableRooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numberPeoples: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export { Room };
