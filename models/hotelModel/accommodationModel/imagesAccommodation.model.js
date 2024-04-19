import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const ImagesAccommodation = db.define('imagesAccommodation', {
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
  linkImg: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { ImagesAccommodation };
