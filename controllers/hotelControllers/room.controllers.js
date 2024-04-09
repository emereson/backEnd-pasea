import { Room } from '../../models/hotelModel/room.model.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res, next) => {
  const rooms = await Room.findAll();

  return res.status(200).json({
    status: 'Success',
    results: rooms.length,
    rooms,
  });
});

export const findAllHotel = catchAsync(async (req, res, next) => {
  const { hotel } = req;
  const rooms = await Room.findAll({
    where: { hotelId: hotel.id }, // Coma faltante después de la cláusula where
    order: [['id', 'ASC']], // Especificación correcta de la opción order
  });

  return res.status(200).json({
    status: 'Success',
    results: rooms.length,
    rooms,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { room } = req;

  return res.status(200).json({
    status: 'Success',
    room,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { hotel } = req;
  const {
    typeRoom,
    numberRooms,
    individualBed,
    doubleBed,
    largeDoubleBed,
    numberPeoples,
  } = req.body;

  console.log(req.body);

  const room = await Room.create({
    hotelId: hotel.id,
    typeRoom,
    numberRooms,
    individualBed,
    doubleBed,
    largeDoubleBed,
    availableRooms: numberRooms,
    numberPeoples,
  });

  res.status(201).json({
    status: 'success',
    message: 'La habitación se agrego exitosamente',
    room,
  });
});

export const update = catchAsync(async (req, res) => {
  const { room } = req;
  const {
    typeRoom,
    numberRooms,
    individualBed,
    doubleBed,
    largeDoubleBed,
    numberPeoples,
  } = req.body;

  await room.update({
    typeRoom,
    numberRooms,
    individualBed,
    doubleBed,
    largeDoubleBed,
    numberPeoples,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Los datos de la habitación se  actualizaron correctamente',
    room,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { room } = req;

  await room.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The room with id: ${room.id} has been deleted`,
  });
});
