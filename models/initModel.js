import { DayPass } from './hotelModel/daypassModel/dayPass.model.js';
import { Hotel } from './hotelModel/hotel.model.js';
import { ServicesHotel } from './hotelModel/servicesHotel.model.js';

const initModel = () => {
  Hotel.hasMany(ServicesHotel, { foreignKey: 'hotelId' });
  ServicesHotel.belongsTo(Hotel, { foreignKey: 'hotelId' });

  Hotel.hasMany(DayPass, { foreignKey: 'hotelId' });
  DayPass.belongsTo(Hotel, { foreignKey: 'hotelId' });
};

export { initModel };
