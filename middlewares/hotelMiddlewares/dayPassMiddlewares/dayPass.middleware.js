import { DayPass } from '../../../models/hotelModel/daypassModel/dayPass.model.js';
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
    return next(new AppError(`hotel with id: ${hotelId} not found `, 404));
  }

  req.dayPass = dayPass;
  next();
});
