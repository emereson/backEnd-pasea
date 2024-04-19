import { ImagesDayPass } from '../../../models/hotelModel/daypassModel/imagesDayPass.model.js';
import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';

export const validExistDayPassImage = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const dayPassImage = await ImagesDayPass.findOne({
    where: {
      id,
    },
  });

  if (!dayPassImage) {
    return next(new AppError(`dayPassImage with id: ${id} not found `, 404));
  }

  req.dayPassImage = dayPassImage;
  next();
});
