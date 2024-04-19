import { PackageDayPass } from '../../../models/hotelModel/daypassModel/packageDayPass.model.js';
import { ServicePackagesDayPass } from '../../../models/hotelModel/daypassModel/servicePackagesDayPass.model.js';
import { catchAsync } from '../../../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res, next) => {
  const packagesDayPass = await PackageDayPass.findAll();

  return res.status(200).json({
    status: 'Success',
    results: packagesDayPass.length,
    packagesDayPass,
  });
});

export const findAllDayPassId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const packagesDayPass = await PackageDayPass.findAll({
    where: { dayPassId: id },
    include: [{ model: ServicePackagesDayPass }],
    order: [['id', 'ASC']],
  });

  return res.status(200).json({
    status: 'Success',
    results: packagesDayPass.length,
    packagesDayPass,
  });
});

export const findAllServicesId = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const servicePackagesDayPass = await ServicePackagesDayPass.findAll({
    where: { packageDayPassId: id },
    order: [['id', 'ASC']],
  });

  return res.status(200).json({
    status: 'Success',
    results: servicePackagesDayPass.length,
    servicePackagesDayPass,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { packageDayPass } = req;

  return res.status(200).json({
    status: 'Success',
    packageDayPass,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { dayPass } = req;
  const {
    name,
    typeRoom,
    startTimetable1,
    endTimetable1,
    startTimetable2,
    endTimetable2,
    startTimetable3,
    endTimetable3,
    priceDays,
    priceSatuyday,
    listServices,
  } = req.body;

  const packageDayPass = await PackageDayPass.create({
    dayPassId: dayPass.id,
    name,
    typeRoom,
    startTimetable1,
    endTimetable1,
    startTimetable2,
    endTimetable2,
    startTimetable3,
    endTimetable3,
    priceDays,
    priceSatuyday,
  });

  const listServicesPromise = listServices.map(
    async (services) =>
      await ServicePackagesDayPass.create({
        packageDayPassId: packageDayPass.id,
        name: services.name,
        iconSvg: services.iconSvg,
        status: services.status,
      })
  );

  await Promise.all(listServicesPromise);

  res.status(201).json({
    status: 'success',
    message: 'El paquete del day pass se agrego exitosamente',
    packageDayPass,
  });
});

export const update = catchAsync(async (req, res) => {
  const { packageDayPass } = req;
  const {
    name,
    typeRoom,
    startTimetable1,
    endTimetable1,
    startTimetable2,
    endTimetable2,
    startTimetable3,
    endTimetable3,
    priceDays,
    priceSaturday,
    listServices,
  } = req.body;

  await packageDayPass.update({
    name,
    typeRoom,
    startTimetable1,
    endTimetable1,
    startTimetable2,
    endTimetable2,
    startTimetable3,
    endTimetable3,
    priceDays,
    priceSaturday,
  });

  const listServicesPromise = listServices.map(async (service) => {
    const foundService = await ServicePackagesDayPass.findByPk(service.id);
    console.log(foundService);
    if (foundService) {
      await foundService.update({
        status: service.status,
      });
    }
  });

  await Promise.all(listServicesPromise);

  return res.status(200).json({
    status: 'success',
    message: 'Los datos del day paas se actualizaron correctamente',
    packageDayPass,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { packageDayPass } = req;

  await packageDayPass.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The packageDayPass with id: ${packageDayPass.id} has been deleted`,
  });
});
