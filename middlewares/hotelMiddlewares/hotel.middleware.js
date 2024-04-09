import { DayPass } from '../../models/hotelModel/daypassModel/dayPass.model.js';
import { Hotel } from '../../models/hotelModel/hotel.model.js';
import { PhotosHotel } from '../../models/hotelModel/photosHotel.model.js';
import { Room } from '../../models/hotelModel/room.model.js';
import { ServicesHotel } from '../../models/hotelModel/servicesHotel.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistHotel = catchAsync(async (req, res, next) => {
  const { hotelId } = req.params;

  const hotel = await Hotel.findOne({
    where: {
      id: hotelId,
      //   status: 'active',
    },
  });

  if (!hotel) {
    return next(new AppError(`hotel with id: ${hotelId} not found `, 404));
  }

  req.hotel = hotel;
  next();
});

export const validExistHotelIncluids = catchAsync(async (req, res, next) => {
  const { hotelId } = req.params;

  const hotel = await Hotel.findOne({
    where: {
      id: hotelId,
      //   status: 'active',
    },
    include: [
      {
        model: ServicesHotel,
      },
      {
        model: DayPass,
      },
      {
        model: PhotosHotel,
      },
      {
        model: Room,
      },
    ],
  });

  if (!hotel) {
    return next(new AppError(`hotel with id: ${hotelId} not found `, 404));
  }

  req.hotel = hotel;
  next();
});
