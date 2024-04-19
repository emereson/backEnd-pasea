import { ImagesAccommodation } from '../../../models/hotelModel/accommodationModel/imagesAccommodation.model.js';
import { AppError } from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';

export const validExistImagesAccommodation = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const imageAccommodation = await ImagesAccommodation.findOne({
      where: {
        id,
      },
    });

    if (!imageAccommodation) {
      return next(
        new AppError(`imageAccommodation with id: ${id} not found `, 404)
      );
    }

    req.imageAccommodation = imageAccommodation;
    next();
  }
);
