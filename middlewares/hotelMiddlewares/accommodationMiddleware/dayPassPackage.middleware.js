import { PackageDayPass } from '../../../models/hotelModel/daypassModel/packageDayPass.model.js';
import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';

export const validExistPackageDayPass = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const packageDayPass = await PackageDayPass.findOne({
    where: {
      id,
    },
  });

  if (!packageDayPass) {
    return next(new AppError(`packageDayPass with id: ${id} not found `, 404));
  }

  req.packageDayPass = packageDayPass;
  next();
});
