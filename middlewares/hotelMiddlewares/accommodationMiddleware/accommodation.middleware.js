import { Accommodation } from '../../../models/hotelModel/accommodationModel/accommodation.model.js';
import { ImagesAccommodation } from '../../../models/hotelModel/accommodationModel/imagesAccommodation.model.js';
import { ServiceSetAccommodation } from '../../../models/hotelModel/accommodationModel/serviceSetAccommodation.model.js';
import { SetAccommodation } from '../../../models/hotelModel/accommodationModel/setAccommodation.model.js';
import { Hotel } from '../../../models/hotelModel/hotel.model.js';
import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';

export const validExistAccommodation = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const accommodation = await Accommodation.findOne({
    where: {
      id,
      //   status: 'active',
    },
  });

  if (!accommodation) {
    return next(new AppError(`accommodation with id: ${id} not found `, 404));
  }

  req.accommodation = accommodation;
  next();
});

export const validExistAccommodationIncluid = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const accommodation = await Accommodation.findOne({
      where: {
        id,
      },
      include: [
        { model: ImagesAccommodation },
        { model: Hotel },
        {
          model: SetAccommodation,
          include: [
            {
              model: ServiceSetAccommodation,
              where: { status: 'active' }, // Filtra los ServicePackagesDayPass con estado activo
            },
          ],
        },
      ],
    });

    if (!accommodation) {
      return next(new AppError(`accommodation with id: ${id} not found `, 404));
    }

    req.accommodation = accommodation;
    next();
  }
);
