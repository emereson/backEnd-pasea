import { PhotosHotel } from '../../models/hotelModel/photosHotel.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistPhotosHotel = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const photosHotel = await PhotosHotel.findOne({
    where: {
      id,
    },
  });

  if (!photosHotel) {
    return next(new AppError(`photosHotel with id: ${id} not found `, 404));
  }

  req.photosHotel = photosHotel;
  next();
});
