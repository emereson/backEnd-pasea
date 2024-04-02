import { ServicesHotel } from '../../models/hotelModel/servicesHotel.model';

export const update = catchAsync(async (req, res) => {
  const { id } = req.paramas;
  const { status } = req.body;

  const servicesHotel = await ServicesHotel.findOne({
    where: { id },
  });
  await servicesHotel.update({ status });

  return res.status(200).json({
    status: 'success',
    message: 'El servicesHotel del hotel se activo correctamente',
    servicesHotel,
  });
});
