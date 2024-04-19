import { PhotosHotel } from '../../models/hotelModel/photosHotel.model.js';
import { catchAsync } from '../../utils/catchAsync.js';
import FormData from 'form-data';
import axios from 'axios';

export const findAll = catchAsync(async (req, res, next) => {
  const photosHotels = await PhotosHotel.findAll();

  return res.status(200).json({
    status: 'Success',
    results: photosHotels.length,
    photosHotels,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { photosHotel } = req;

  return res.status(200).json({
    status: 'Success',
    photosHotel,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { hotelId } = req.params;
  const imageFile = req.file;
  console.log(imageFile);

  const formDataImg = new FormData();
  formDataImg.append('image', imageFile.buffer, {
    filename: imageFile.originalname,
  });

  const urlPost = `${process.env.SERVER_IMAGE}/image`;

  const responseImage = await axios.post(urlPost, formDataImg);
  const { imagePath } = responseImage.data;

  const detailsDayPass = await PhotosHotel.create({
    hotelId: hotelId,
    linkImg: imagePath,
  });

  res.status(201).json({
    status: 'success',
    message: 'La imagen se agrego exitosamente',
    detailsDayPass,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { photosHotel } = req;
  const imageName = photosHotel.linkImg.split('/').pop();

  await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);

  await photosHotel.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The photosHotel with id: ${photosHotel.id} has been deleted`,
  });
});
