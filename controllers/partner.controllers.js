import { sendVerificationEmail } from '../middlewares/emailMiddleware/verificationEmail.middleware.js';
import { Partner } from '../models/partner.model.js';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { generateJWT } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';

export const findAll = catchAsync(async (req, res, next) => {
  const partners = await Partner.findAll({
    where: {
      status: 'active',
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: partners.length,
    partners,
  });
});

export const findOne = catchAsync(async (req, res, next) => {
  const { partners } = req;

  return res.status(200).json({
    status: 'Success',
    partners,
  });
});

export const verificateExistEmail = catchAsync(async (req, res, next) => {
  const { email } = req.query;

  const partner = await Partner.findOne({
    where: {
      email,
    },
  });

  if (partner) {
    return next(new AppError(`El correo ya se encuentra registrado`, 404));
  }

  return res.status(200).json({
    status: 'Success',
    message: 'El correo  no se encuentra registrado',
    partner,
  });
});

const generateVerificationCode = () => {
  const min = 100000; // El valor mínimo (inclusive)
  const max = 999999; // El valor máximo (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const signup = catchAsync(async (req, res, next) => {
  const { name, lastName, ruc, phoneNumber, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const codeVerification = generateVerificationCode();

  const partner = await Partner.create({
    name,
    lastName,
    ruc,
    phoneNumber,
    email,
    password: encryptedPassword,
    codeVerification,
  });
  await sendVerificationEmail(email, codeVerification);

  const token = await generateJWT(partner.id);

  delete partner.password;
  res.status(201).json({
    status: 'success',
    message: 'El partner se registró exitosamente',
    token,
    partner,
  });
});

export const activePartner = catchAsync(async (req, res, next) => {
  const { code } = req.body;
  const { partner } = req;

  if (code === partner.codeVerification) {
    await partner.update({ status: 'active' });
  } else {
    return next(new AppError('Codigo Incorrecto', 401));
  }

  res.status(201).json({
    status: 'success',
    message: 'El correo del socio ha sido verificado exitosamente',
    partner,
  });
});

export const generateNewCode = catchAsync(async (req, res, next) => {
  const { partner } = req;

  const codeVerification = generateVerificationCode();
  await partner.update({ codeVerification });

  await sendVerificationEmail(partner.email, codeVerification);

  res.status(201).json({
    status: 'success',
    message: 'Se ha enviado un nuevo código de verificación a su correo electrónico.',
    partner,
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const partner = await Partner.findOne({
    where: {
      email,
    },
  });
  if (!partner) {
    return next(new AppError('El correo no se encuenta registrado', 404));
  }

  if (!(await bcrypt.compare(password, partner.password))) {
    return next(new AppError('Contraseña Incorrecta', 401));
  }

  const token = await generateJWT(partner.id);

  delete partner.password;

  res.status(201).json({
    status: 'success',
    token,
    partner,
  });
});

export const update = catchAsync(async (req, res) => {
  const { name, lastName, ruc, phoneNumber, email } = req.body;
  const { partner } = req;

  await partner.update({
    name,
    lastName,
    ruc,
    phoneNumber,
    email,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Los datos del partner se actualizaron correctamente',
    partner,
  });
});

export const deleteUser = catchAsync(async (req, res) => {
  const { partner } = req;

  await partner.destroy();

  return res.status(200).json({
    status: 'success',
    message: `The partner with id: ${partner.id} has been deleted`,
  });
});
