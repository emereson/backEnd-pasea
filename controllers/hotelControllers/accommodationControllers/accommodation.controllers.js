import { ImagesDayPass } from '../../../models/hotelModel/daypassModel/imagesDayPass.model.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import axios from 'axios';
import FormData from 'form-data';
import { Hotel } from '../../../models/hotelModel/hotel.model.js';
import { Op } from 'sequelize';
import { Accommodation } from '../../../models/hotelModel/accommodationModel/accommodation.model.js';
import { SetAccommodation } from '../../../models/hotelModel/accommodationModel/setAccommodation.model.js';
import { ServiceSetAccommodation } from '../../../models/hotelModel/accommodationModel/serviceSetAccommodation.model.js';
import { ImagesAccommodation } from '../../../models/hotelModel/accommodationModel/imagesAccommodation.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const { search } = req.query;
  let whereCondition = {}; // Declarar la variable fuera del bloque if

  if (search !== '') {
    whereCondition = {
      [Op.or]: [
        { name: { [Op.iLike]: `%${search}%` } },
        { '$hotel.name$': { [Op.iLike]: `%${search}%` } },
        { '$hotel.description$': { [Op.iLike]: `%${search}%` } },
        { '$hotel.country$': { [Op.iLike]: `%${search}%` } },
        { '$hotel.city$': { [Op.iLike]: `%${search}%` } },
        { '$hotel.address$': { [Op.iLike]: `%${search}%` } },
      ],
    };
  }

  const accommodations = await Accommodation.findAll({
    where: whereCondition, // Usar la variable donde se almacena la condición where
    include: [
      {
        model: SetAccommodation,
        required: true,
        include: [
          {
            model: ServiceSetAccommodation,
            where: { status: 'active' },
          },
        ],
      },
      { model: ImagesAccommodation },
      {
        model: Hotel,
        required: true,
      },
    ],
  });

  return res.status(200).json({
    status: 'Success',
    results: accommodations.length,
    accommodations,
  });
});

export const findAllIdHotel = catchAsync(async (req, res, next) => {
  const { hotel } = req;
  const accommodations = await Accommodation.findAll({
    where: { hotelId: hotel.id },
    include: [
      { model: ImagesAccommodation },
      {
        model: SetAccommodation,
        include: [
          {
            model: ServiceSetAccommodation,
            where: { status: 'active' },
          },
        ],
      },
    ],
  });

  return res.status(200).json({
    status: 'Success',
    results: accommodations.length,
    accommodations,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { accommodation } = req;

  return res.status(200).json({
    status: 'Success',
    accommodation,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { hotel } = req;
  const { name, listServices, dataSet } = req.body;

  const ImagesFiles = req.files['linkImg'];
  const createdPhotosDayPass = [];

  const jsonDataSet = JSON.parse(dataSet);
  const jsonListServices = JSON.parse(listServices);

  const accommodation = await Accommodation.create({
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
    const { imagePath } = await responseImage.data;
    const imagesAccommodation = await ImagesAccommodation.create({
      accommodationId: accommodation.id,
      linkImg: imagePath,
    });
    createdPhotosDayPass.push(imagesAccommodation);
  });

  const setAccommodation = await SetAccommodation.create({
    accommodationId: accommodation.id,
    name: jsonDataSet.name,
    typeRoom: jsonDataSet.typeRoom,
    checkIn: jsonDataSet.checkIn,
    checkOut: jsonDataSet.checkOut,
    priceNigth: Number(jsonDataSet.priceNigth),
  });

  const jsonListServicesPromises = jsonListServices.map(
    async (services) =>
      await ServiceSetAccommodation.create({
        setAccommodationId: setAccommodation.id,
        name: services.name,
        iconSvg: services.iconSvg,
        status: services.status,
      })
  );

  await Promise.all(ImagesPromises);
  await Promise.all(jsonListServicesPromises);

  res.status(201).json({
    status: 'success',
    message: 'El pase día se creó exitosamente',
    accommodation,
    createdPhotosDayPass,
    setAccommodation,
  });
});

export const update = catchAsync(async (req, res) => {
  const { name, desription, houreStart, houreEnd, price } = req.body;
  const { accommodation } = req;

  await accommodation.update({
    name,
    desription,
    houreStart,
    houreEnd,
    price,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Los datos del dayPass se actualizaron correctamente',
    dayPass,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { accommodation } = req;

  const imagesAll = await ImagesAccommodation.findAll({
    where: {
      accommodationId: accommodation.id,
    },
  });

  const deleteImagePromises = imagesAll.map(async (image) => {
    const imageName = image.linkImg.split('/').pop();
    await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);
  });

  await Promise.all(deleteImagePromises);

  await accommodation.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The accommodation with id: ${accommodation.id} has been deleted`,
  });
});
