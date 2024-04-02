import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/AppError.js';
import { Partner } from '../models/partner.model.js';

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in!, Please log in to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  const partner = await Partner.findOne({
    where: {
      id: decoded.id,
      status: 'active',
    },
  });

  if (!partner) {
    return next(
      new AppError('The owner of this token is not longer available', 401)
    );
  }

  if (partner.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      partner.passwordChangedAt.getTime() / 1000,
      10
    );

    if (decoded.iat < changedTimeStamp) {
      return next(
        new AppError(
          'partner Hotel recently changed password!, please login again.',
          401
        )
      );
    }
  }

  req.sessionPartner = partner;

  next();
});

export const protectAccountOwner = catchAsync(async (req, res, next) => {
  const { partner, sessionPartner } = req;

  if (partner.id !== sessionPartner.id) {
    return next(new AppError('You are not the owner of this account.', 401));
  }

  next();
});
