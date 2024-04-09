import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const ImagesDayPass = db.define('imagesDayPass', {
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
  linkImg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { ImagesDayPass };
