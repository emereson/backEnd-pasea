import { DetailsAccommodation } from '../../../models/hotelModel/accommodation/detailsAccommodation.model.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res, next) => {
  const detailsAccommodations = await DetailsAccommodation.findAll();

  return res.status(200).json({
    status: 'Success',
    results: detailsAccommodations.length,
    detailsAccommodations,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { detailsAccommodation } = req;

  return res.status(200).json({
    status: 'Success',
    detailsAccommodation,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { name, idIcon } = req.body;
  const { id } = req.params;

  const detailsAccommodation = await DetailsAccommodation.create({
    accommodationId: id,
    name,
    idIcon,
  });

  res.status(201).json({
    status: 'success',
    message: 'El detalle para el alojamiento se agrego exitosamente',
    detailsAccommodation,
  });
});

export const update = catchAsync(async (req, res) => {
  const { name, idIcon } = req.body;
  const { detailsAccommodation } = req;

  await detailsAccommodation.update({
    name,
    idIcon,
  });

  return res.status(200).json({
    status: 'success',
    message: 'El detalle para el alojamiento se actualizaron correctamente',
    detailsAccommodation,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { detailsAccommodation } = req;

  await detailsAccommodation.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The detailsAccommodation with id: ${userApp.id} has been deleted`,
  });
});
