import { DayPass } from '../../../models/hotelModel/daypassModel/dayPass.model.js';
import { ImagesDayPass } from '../../../models/hotelModel/daypassModel/imagesDayPass.model.js';
import { PackageDayPass } from '../../../models/hotelModel/daypassModel/packageDayPass.model.js';
import { ServicePackagesDayPass } from '../../../models/hotelModel/daypassModel/servicePackagesDayPass.model.js';
import { Hotel } from '../../../models/hotelModel/hotel.model.js';
import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';

export const validExistDayPass = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const dayPass = await DayPass.findOne({
    where: {
      id,
      //   status: 'active',
    },
  });

  if (!dayPass) {
    return next(new AppError(`hotel with id: ${dayPass} not found `, 404));
  }

  req.dayPass = dayPass;
  next();
});

export const validExistDayPassIncluid = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const dayPass = await DayPass.findOne({
    where: {
      id,
    },
    include: [
      { model: ImagesDayPass },
      { model: Hotel },
      {
        model: PackageDayPass,
        include: [
          {
            model: ServicePackagesDayPass,
            where: { status: 'active' }, // Filtra los ServicePackagesDayPass con estado activo
          },
        ],
      },
    ],
  });

  if (!dayPass) {
    return next(new AppError(`hotel with id: ${hotelId} not found `, 404));
  }

  req.dayPass = dayPass;
  next();
});
