import { Hotel } from '../../models/hotelModel/hotel.model.js';
import { ServicesHotel } from '../../models/hotelModel/servicesHotel.model.js';
import { catchAsync } from '../../utils/catchAsync.js';
import axios from 'axios';
import FormData from 'form-data';

export const findAll = catchAsync(async (req, res, next) => {
  const hotels = await Hotel.findAll({
    where: {
      //   status: 'active',
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: hotels.length,
    hotels,
  });
});

export const findAllHotelsPartner = catchAsync(async (req, res, next) => {
  const { partner } = req;

  const hotels = await Hotel.findAll({
    where: {
      partnerId: partner.id,
      // status: 'active',
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: hotels.length,
    hotels,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { hotel } = req;

  return res.status(200).json({
    status: 'Success',
    hotel,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { partner } = req;
  const {
    name,
    description,
    country,
    city,
    reference,
    locationName,
    coordinatesLatitude,
    coordinatesLength,
  } = req.body;
  const imageFile = req.file;

  const formDataImg = new FormData();
  formDataImg.append('image', imageFile.buffer, {
    filename: imageFile.originalname,
  });

  const urlPost = `${process.env.SERVER_IMAGE}/image`;
  const responseImage = await axios.post(urlPost, formDataImg);
  const { imagePath } = responseImage.data;

  const hotel = await Hotel.create({
    partnerId: partner.id,
    name,
    country,
    city,
    description,
    reference,
    locationName,
    coordinatesLatitude,
    coordinatesLength,
    principalImage: imagePath,
  });

  // Crear servicios para el hotel
  const services = [
    { name: 'Restaurante', IconSvg: 'restaurant.svg' },
    { name: 'Bar / Cafetería', IconSvg: 'bar.svg' },
    { name: 'Alojamiento', IconSvg: 'accommodation.svg' },
    { name: 'Parking privado', IconSvg: 'parking.svg' },
    { name: 'Área de trabajo', IconSvg: 'jobs.svg' },
    { name: 'Piscina interior', IconSvg: 'pool.svg' },
    { name: 'Vista a la playa', IconSvg: 'beach.svg' },
    { name: 'Jardín', IconSvg: 'garden.svg' },
    { name: 'Área para ciclistas', IconSvg: 'cyclists.svg' },
    { name: 'Wifi gratis', IconSvg: 'wifi.svg' },
  ];

  const servicePromises = services.map((service) => {
    return ServicesHotel.create({
      hotelId: hotel.id,
      name: service.name,
      IconSvg: service.IconSvg,
    });
  });

  await Promise.all(servicePromises);

  res.status(201).json({
    status: 'success',
    message: 'El hotel se creó exitosamente',
    hotel,
  });
});

export const update = catchAsync(async (req, res) => {
  const {
    name,
    description,
    reference,
    locationName,
    coordinatesLatitude,
    coordinatesLength,
  } = req.body;
  const { hotel } = req;
  const imageFile = req.file;
  const imageName = hotel.principalImage.split('/').pop();

  if (imageFile) {
    await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);

    const formDataImg = new FormData();
    formDataImg.append('image', imageFile.buffer, {
      filename: imageFile.originalname,
    });

    const urlPost = `${process.env.SERVER_IMAGE}/image`;
    const responseImage = await axios.post(urlPost, formDataImg);
    const { imagePath } = responseImage.data;

    await hotel.update({
      name,
      description,
      reference,
      locationName,
      coordinatesLatitude,
      coordinatesLength,
      principalImage: imagePath,
    });
  } else {
    await hotel.update({
      name,
      description,
      reference,
      locationName,
      coordinatesLatitude,
      coordinatesLength,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Los datos del hotel se actualizaron correctamente',
    hotel,
  });
});

export const updateService = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const { status } = req.body;

  const servicesHotel = await ServicesHotel.findOne({
    where: { id: serviceId },
  });
  await servicesHotel.update({ status });

  return res.status(200).json({
    status: 'success',
    message: 'El servicesHotel del hotel se activo correctamente',
    servicesHotel,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { hotel } = req;
  const imageName = hotel.principalImage.split('/').pop();

  await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);

  await hotel.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The hotel with id: ${hotel.id} has been deleted`,
  });
});
