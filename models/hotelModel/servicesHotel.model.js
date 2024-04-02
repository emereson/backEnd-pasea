import { DataTypes } from 'sequelize';
import { db } from '../../config/db.config.js';

const ServicesHotel = db.define('servicesHotel', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  hotelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  IconSvg: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'disable'),
    allowNull: false,
    defaultValue: 'disable',
  },
});

export { ServicesHotel };
