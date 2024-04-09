import { DataTypes } from 'sequelize';
import { db } from '../../config/db.config.js';

const PhotosHotel = db.define('photosHotel', {
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
  linkImg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { PhotosHotel };
