import { Accommodation } from './hotelModel/accommodationModel/accommodation.model.js';
import { ImagesAccommodation } from './hotelModel/accommodationModel/imagesAccommodation.model.js';
import { ServiceSetAccommodation } from './hotelModel/accommodationModel/serviceSetAccommodation.model.js';
import { SetAccommodation } from './hotelModel/accommodationModel/setAccommodation.model.js';
import { DayPass } from './hotelModel/daypassModel/dayPass.model.js';
import { ImagesDayPass } from './hotelModel/daypassModel/imagesDayPass.model.js';
import { PackageDayPass } from './hotelModel/daypassModel/packageDayPass.model.js';
import { ServicePackagesDayPass } from './hotelModel/daypassModel/servicePackagesDayPass.model.js';
import { Hotel } from './hotelModel/hotel.model.js';
import { PhotosHotel } from './hotelModel/photosHotel.model.js';
import { Room } from './hotelModel/room.model.js';
import { ServicesHotel } from './hotelModel/servicesHotel.model.js';

const initModel = () => {
  Hotel.hasMany(ServicesHotel, { foreignKey: 'hotelId' });
  ServicesHotel.belongsTo(Hotel, { foreignKey: 'hotelId' });

  Hotel.hasMany(Room, { foreignKey: 'hotelId' });
  Room.belongsTo(Hotel, { foreignKey: 'hotelId' });

  Hotel.hasMany(DayPass, { foreignKey: 'hotelId' });
  DayPass.belongsTo(Hotel, { foreignKey: 'hotelId' });

  Hotel.hasMany(Accommodation, { foreignKey: 'hotelId' });
  Accommodation.belongsTo(Hotel, { foreignKey: 'hotelId' });

  Hotel.hasMany(PhotosHotel, { foreignKey: 'hotelId' });
  PhotosHotel.belongsTo(Hotel, { foreignKey: 'hotelId' });
  // DayPass
  DayPass.hasMany(ImagesDayPass, { foreignKey: 'dayPassId' });
  ImagesDayPass.belongsTo(DayPass, { foreignKey: 'dayPassId' });

  DayPass.hasMany(PackageDayPass, { foreignKey: 'dayPassId' });
  PackageDayPass.belongsTo(DayPass, { foreignKey: 'dayPassId' });

  PackageDayPass.hasMany(ServicePackagesDayPass, {
    foreignKey: 'packageDayPassId',
  });
  ServicePackagesDayPass.belongsTo(PackageDayPass, {
    foreignKey: 'packageDayPassId',
  });

  // Accommodation

  Accommodation.hasMany(ImagesAccommodation, { foreignKey: 'accommodationId' });
  ImagesAccommodation.belongsTo(Accommodation, {
    foreignKey: 'accommodationId',
  });

  Accommodation.hasMany(SetAccommodation, {
    foreignKey: 'accommodationId',
  });
  SetAccommodation.belongsTo(Accommodation, {
    foreignKey: 'accommodationId',
  });

  SetAccommodation.hasMany(ServiceSetAccommodation, {
    foreignKey: 'setAccommodationId',
  });
  ServiceSetAccommodation.belongsTo(SetAccommodation, {
    foreignKey: 'setAccommodationId',
  });
};

export { initModel };
