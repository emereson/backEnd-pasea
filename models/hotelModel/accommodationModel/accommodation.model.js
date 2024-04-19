import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const Accommodation = db.define('accommodation', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Accommodation };
