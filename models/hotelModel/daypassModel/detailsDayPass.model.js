import { DataTypes } from 'sequelize';
import { db } from '../../../config/db.config.js';

const DetailsDayPass = db.define('detailsDayPass', {
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
  idIcon: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { DetailsDayPass };
