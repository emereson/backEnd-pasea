import { catchAsync } from '../../../utils/catchAsync.js';
import FormData from 'form-data';
import axios from 'axios';
import { ImagesDayPass } from '../../../models/hotelModel/daypassModel/imagesDayPass.model.js';

export const findAll = catchAsync(async (req, res, next) => {
  const dayPassImages = await ImagesDayPass.findAll();

  return res.status(200).json({
    status: 'Success',
    results: dayPassImages.length,
    dayPassImages,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { dayPassImage } = req;

  return res.status(200).json({
    status: 'Success',
    dayPassImage,
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

  const dayPassImage = await ImagesDayPass.create({
    dayPassiD: id,
    linkImg: imagePath,
  });

  res.status(201).json({
    status: 'success',
    message: 'La imagen se agrego exitosamente',
    dayPassImage,
  });
});

export const deleteElement = catchAsync(async (req, res) => {
  const { dayPassImage } = req;
  const imageName = dayPassImage.linkImg.split('/').pop();

  await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);

  await dayPassImage.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The dayPass Image with id: ${dayPassImage.id} has been deleted`,
  });
});
