import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const SetAccommodation = db.define('setAccommodation', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  accommodationId: {
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
  checkIn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  checkOut: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  priceNigth: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export { SetAccommodation };
