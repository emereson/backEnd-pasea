import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const AccommodationImage = db.define('accommodationImage', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  accommodationsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  linkImage: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { AccommodationImage };
