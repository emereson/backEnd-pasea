import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import xss from 'xss-clean';
import cors from 'cors';

import { usersRouter } from './routes/users.routes.js';
import { globalErrorHandler } from './controllers/error.controllers.js';
import { partnerRouter } from './routes/partner.routes.js';
import { AppError } from './utils/AppError.js';
import { hotelRouter } from './routes/hotelRoutes/hotel.routes.js';
import { dayPassRouter } from './routes/hotelRoutes/dayPassRoutes/dayPass.routes.js';
import { roomRouter } from './routes/hotelRoutes/room.routes.js';

const app = express();
app.use(express.json());
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this Ip, please try again in an hour!',
});

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use('/api/v1', limiter);
app.use('/api/v1/user', usersRouter);

app.use('/api/v1/partner', partnerRouter);

// hotel
app.use('/api/v1/hotel', hotelRouter);
app.use('/api/v1/room', roomRouter);
app.use('/api/v1/dayPass', dayPassRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this seerver! 💀`, 404)
  );
});

app.use(globalErrorHandler);

export { app };
