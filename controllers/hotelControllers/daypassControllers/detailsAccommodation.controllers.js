import { DetailsDayPass } from '../../../models/hotelModel/daypassModel/detailsDayPass.model.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res, next) => {
  const allDetailsDayPass = await DetailsDayPass.findAll();

  return res.status(200).json({
    status: 'Success',
    results: allDetailsDayPass.length,
    allDetailsDayPass,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { detailsDayPass } = req;

  return res.status(200).json({
    status: 'Success',
    detailsDayPass,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { name, idIcon } = req.body;
  const { id } = req.params;

  const detailsDayPass = await DetailsDayPass.create({
    dayPassId: id,
    name,
    idIcon,
  });

  res.status(201).json({
    status: 'success',
    message: 'El detalle para el pase día se agrego exitosamente',
    detailsDayPass,
  });
});

export const update = catchAsync(async (req, res) => {
  const { name, idIcon } = req.body;
  const { detailsDayPass } = req;

  await detailsDayPass.update({
    name,
    idIcon,
  });

  return res.status(200).json({
    status: 'success',
    message: 'El detalle para el pase día se actualizaron correctamente',
    detailsDayPass,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { detailsDayPass } = req;

  await detailsDayPass.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The detailsDayPass with id: ${userApp.id} has been deleted`,
  });
});
