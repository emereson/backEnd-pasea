import { UserApp } from '../../models/userAppModel/userApp.model.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { generateJWT } from '../../utils/jwt.js';
import bcrypt from 'bcryptjs';

export const findAll = catchAsync(async (req, res, next) => {
  const usersApp = await UserApp.findAll({
    where: {
      status: 'active',
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: usersApp.length,
    usersApp,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { userApp } = req;

  return res.status(200).json({
    status: 'Success',
    userApp,
  });
});

export const signup = catchAsync(async (req, res, next) => {
  const {
    nameLastName,
    nameUser,
    birthdate,
    idNumberOrPassport,
    phoneNumber,
    address,
    email,
    password,
  } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const userApp = await UserApp.create({
    nameLastName,
    nameUser,
    birthdate,
    idNumberOrPassport,
    phoneNumber,
    address,
    email,
    password: encryptedPassword,
  });

  const token = await generateJWT(user.id);

  delete userApp.password;

  res.status(201).json({
    status: 'success',
    message: 'El usuario se registro exitosamente',
    token,
    userApp,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const userApp = await UserApp.findOne({
    where: {
      email,
    },
  });
  if (!userApp) {
    return next(new AppError('El correo no se encuenta registrado', 404));
  }

  if (!(await bcrypt.compare(password, userApp.password))) {
    return next(new AppError('Contraseña Incorrecta', 401));
  }

  const token = await generateJWT(userApp.id);

  delete userApp.password;

  res.status(201).json({
    status: 'success',
    token,
    userApp,
  });
});

export const update = catchAsync(async (req, res) => {
  const { nameLastName, nameUser, birthdate, idNumberOrPassport, phoneNumber, address } = req.body;
  const { userApp } = req;

  await userApp.update({
    nameLastName,
    nameUser,
    birthdate,
    idNumberOrPassport,
    phoneNumber,
    address,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Los datos del usuario se actualizaron correctamente',
    userApp,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { userApp } = req;

  await userApp.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The userApp with id: ${userApp.id} has been deleted`,
  });
});
