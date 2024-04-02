import { Partner } from '../models/partner.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const validExistPart = catchAsync(async (req, res, next) => {
  const { partnerId } = req.params;

  const partner = await Partner.findOne({
    where: {
      id: partnerId,
      status: 'active',
    },
  });

  if (!partner) {
    return next(new AppError(`partner with id: ${partnerId} not found `, 404));
  }

  req.partner = partner;
  next();
});

export const validExistPartDisble = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const partner = await Partner.findOne({
    where: {
      id,
      status: 'disable',
    },
  });

  if (!partner) {
    return next(
      new AppError(`El socio con el id: ${id} ya se encuentra activado `, 404)
    );
  }

  req.partner = partner;
  next();
});
