import { Accommodation } from '../../../models/hotelModel/accommodation/accommodation.model.js';
import { AccommodationImage } from '../../../models/hotelModel/accommodation/accommodationImage.model.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const findAll = catchAsync(async (req, res, next) => {
  const accommodations = await Accommodation.findAll({
    where: {
      status: 'active',
    },
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
  const { name, description, dayStart, dayEnd, price } = req.body;
  const { id } = req.params;
  const imageFile = req.file;

  const formDataImg = new FormData();
  formDataImg.append('image', imageFile.buffer, {
    filename: imageFile.originalname,
  });

  const urlPost = `${process.env.SERVER_IMAGE}/image`;
  const responseImage = await axios.post(urlPost, formDataImg);
  const { imagePath } = responseImage.data;

  const accommodation = await Accommodation.create({
    hotelId: id,
    name,
    description,
    dayStart,
    dayEnd,
    price,
    principalImage: imagePath,
  });

  res.status(201).json({
    status: 'success',
    message: 'El alojamiento se creó exitosamente',
    accommodation,
  });
});

export const update = catchAsync(async (req, res) => {
  const { name, description, dayStart, dayEnd, price } = req.body;
  const { accommodation } = req;
  const imageFile = req.file;
  const imageName = accommodation.principalImage.split('/').pop();

  if (imageFile) {
    await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);

    const formDataImg = new FormData();
    formDataImg.append('image', imageFile.buffer, {
      filename: imageFile.originalname,
    });

    const urlPost = `${process.env.SERVER_IMAGE}/image`;
    const responseImage = await axios.post(urlPost, formDataImg);
    const { imagePath } = responseImage.data;

    await accommodation.update({
      name,
      description,
      dayStart,
      dayEnd,
      price,
      principalImage: imagePath,
    });
  } else {
    await accommodation.update({
      name,
      description,
      dayStart,
      dayEnd,
      price,
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Los datos del alojamiento se actualizaron correctamente',
    accommodation,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { accommodation } = req;
  const imageName = accommodation.principalImage.split('/').pop();

  await axios.delete(`${process.env.SERVER_IMAGE}/delete-image/${imageName}`);

  await accommodation.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The accommodation with id: ${userApp.id} has been deleted`,
  });
});
