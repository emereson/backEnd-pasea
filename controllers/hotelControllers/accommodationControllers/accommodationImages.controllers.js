import { catchAsync } from '../../../utils/catchAsync.js';
import FormData from 'form-data';
import axios from 'axios';
import { ImagesAccommodation } from '../../../models/hotelModel/accommodationModel/imagesAccommodation.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const imagesAccommodations = await ImagesAccommodation.findAll();

  return res.status(200).json({
    status: 'Success',
    results: imagesAccommodations.length,
    imagesAccommodations,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { imageAccommodation } = req;

  return res.status(200).json({
    status: 'Success',
    imageAccommodation,
  });
});

export const create = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const imageFile = req.file;

  const formDataImg = new FormData();
  formDataImg.append('image', imageFile.buffer, {
    filename: imageFile.originalname,
  });

  const urlPost = `${process.env.SERVER_IMAGE}/image`;

  const responseImage = await axios.post(urlPost, formDataImg);
  const { imagePath } = responseImage.data;

  const imageAccommodation = await ImagesAccommodation.create({
    accommodationId: id,
    linkImg: imagePath,
  });

  res.status(201).json({
    status: 'success',
    message: 'La imagen se agrego exitosamente',
    imageAccommodation,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { imageAccommodation } = req;
  const imageName = imageAccommodation.linkImg.split('/').pop();

  await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);

  await imageAccommodation.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The dayPass Image with id: ${imageAccommodation.id} has been deleted`,
  });
});
