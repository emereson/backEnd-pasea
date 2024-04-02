import { User } from '../models/user.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { generateJWT } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';

export const findAll = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'active',
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: users.length,
    users,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'Success',
    user,
  });
});

export const signup = catchAsync(async (req, res, next) => {
  const { name, lastName, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    lastName,
    email,
    password: encryptedPassword,
  });
  delete user.password;

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'El usuario se registro exitosamente',
    token,
    user,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    return next(new AppError('El correo no se encuenta registrado', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Contraseña Incorrecta', 401));
  }

  const token = await generateJWT(user.id);

  delete user.password;

  res.status(201).json({
    status: 'success',
    token,
    user,
  });
});

export const update = catchAsync(async (req, res) => {
  const { name, lastName } = req.body;
  const { user } = req;

  await user.update({ name, lastName });

  return res.status(200).json({
    status: 'success',
    message: 'Los datos del usuario se actualizaron correctamente',
    user,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The user with id: ${user.id} has been deleted`,
  });
});
