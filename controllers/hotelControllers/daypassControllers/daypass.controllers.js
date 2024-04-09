import { json } from 'sequelize';
import { DayPass } from '../../../models/hotelModel/daypassModel/dayPass.model.js';
import { ImagesDayPass } from '../../../models/hotelModel/daypassModel/imagesDayPass.model.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import axios from 'axios';
import FormData from 'form-data';
import { PackageDayPass } from '../../../models/hotelModel/daypassModel/packageDayPass.model.js';
import { ServicePackagesDayPass } from '../../../models/hotelModel/daypassModel/servicePackagesDayPass.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const daysPass = await DayPass.findAll({
    where: {},
  });

  return res.status(200).json({
    status: 'Success',
    results: daysPass.length,
    daysPass,
  });
});

export const findAllIdHotel = catchAsync(async (req, res, next) => {
  const { hotel } = req;
  const daysPass = await DayPass.findAll({
    where: { hotelId: hotel.id },
  });

  return res.status(200).json({
    status: 'Success',
    results: daysPass.length,
    daysPass,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { dayPass } = req;

  return res.status(200).json({
    status: 'Success',
    dayPass,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { hotel } = req;
  const { name, listServices, dataPackage } = req.body;

  const ImagesFiles = req.files['linkImg'];
  const createdPhotosDayPass = [];

  const jsonDataPackage = JSON.parse(dataPackage);
  const jsonListServices = JSON.parse(listServices);

  const dayPass = await DayPass.create({
    hotelId: hotel.id,
    name,
  });

  const ImagesPromises = ImagesFiles.map(async (file) => {
    const formDataImg = new FormData();
    formDataImg.append('image', file.buffer, {
      filename: file.originalname,
    });
    const urlPost = `${process.env.SERVER_IMAGE}/image`;
    const responseImage = await axios.post(urlPost, formDataImg);
    const { imagePath } = responseImage.data;
    const imagesDayPass = await ImagesDayPass.create({
      dayPassiD: dayPass.id,
      linkImg: imagePath,
    });
    createdPhotosDayPass.push(imagesDayPass);
  });

  const packageDayPass = await PackageDayPass.create({
    dayPassiD: dayPass.id,
    name: jsonDataPackage.name,
    typeRoom: jsonDataPackage.typeRoom,
    startTimetable1: jsonDataPackage.startTimetable1,
    endTimetable1: jsonDataPackage.endTimetable1,
    startTimetable2: jsonDataPackage.startTimetable2,
    endTimetable2: jsonDataPackage.endTimetable2,
    startTimetable3: jsonDataPackage.startTimetable3,
    endTimetable3: jsonDataPackage.endTimetable3,
    priceDays: Number(jsonDataPackage.priceDays),
    priceSatuyday: Number(jsonDataPackage.priceSatuyday),
  });

  const jsonListServicesPromises = jsonListServices.map(
    async (services) =>
      await ServicePackagesDayPass.create({
        packageDayPassId: packageDayPass.id,
        name: services.name,
        iconSvg: services.IconSvg,
        status: services.status,
      })
  );

  await Promise.all(ImagesPromises);
  await Promise.all(jsonListServicesPromises);

  res.status(201).json({
    status: 'success',
    message: 'El pase día se creó exitosamente',
    dayPass,
    createdPhotosDayPass,
    packageDayPass,
  });
});

export const update = catchAsync(async (req, res) => {
  const { name, desription, houreStart, houreEnd, price } = req.body;
  const { dayPass } = req;
  const imageFile = req.file;
  const imageName = dayPass.principalImage.split('/').pop();

  if (imageFile) {
    await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);

    const formDataImg = new FormData();
    formDataImg.append('image', imageFile.buffer, {
      filename: imageFile.originalname,
    });

    const urlPost = `${process.env.SERVER_IMAGE}/image`;
    const responseImage = await axios.post(urlPost, formDataImg);
    const { imagePath } = responseImage.data;

    await dayPass.update({
      name,
      desription,
      houreStart,
      houreEnd,
      price,
      principalImage: imagePath,
    });
  } else {
    await dayPass.update({
      name,
      desription,
      houreStart,
      houreEnd,
      price,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Los datos del dayPass se actualizaron correctamente',
    dayPass,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { dayPass } = req;
  const imageName = dayPass.principalImage.split('/').pop();

  await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);

  await dayPass.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The dayPass with id: ${dayPass.id} has been deleted`,
  });
});
