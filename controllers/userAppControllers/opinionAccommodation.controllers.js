import { OpinionAccommodation } from '../../models/userAppModel/opinionAccommodation.model.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res, next) => {
  const opinionAccommodations = await OpinionAccommodation.findAll();

  return res.status(200).json({
    status: 'Success',
    results: opinionAccommodations.length,
    opinionAccommodations,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { opinionAccommodation } = req;

  return res.status(200).json({
    status: 'Success',
    opinionAccommodation,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { hearts, title, description, checkIn, services, comfort, accommodationId } = req.body;
  const { id } = req.params;

  const detailsAccommodation = await OpinionAccommodation.create({
    usserAppId: id,
    accommodationId,
    hearts,
    title,
    description,
    checkIn,
    services,
    comfort,
  });

  res.status(201).json({
    status: 'success',
    message: 'la opinion exitosamente',
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
