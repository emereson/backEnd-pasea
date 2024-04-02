import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const DetailsAccommodation = db.define('detailsAccommodation', {
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
  idIcon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { DetailsAccommodation };
