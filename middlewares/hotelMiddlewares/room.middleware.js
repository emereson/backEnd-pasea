import { Room } from '../../models/hotelModel/room.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const validExistRoom = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const room = await Room.findOne({
    where: {
      id,
    },
  });

  if (!room) {
    return next(new AppError(`room with id: ${id} not found `, 404));
  }

  req.room = room;
  next();
});
