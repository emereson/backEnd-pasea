import express from 'express';
import * as photoHotelController from '../../controllers/hotelControllers/photosHotel.controllers.js';
import * as photoHotelMiddleware from '../../middlewares/hotelMiddlewares/photoHotel.middleware.js';

import * as hotelMiddleware from '../../middlewares/hotelMiddlewares/hotel.middleware.js';
import * as authPartnerMidlleware from '../../middlewares/authPartner.middleware.js';
import { upload } from '../../utils/multer.js';

const router = express.Router();

router.use(authPartnerMidlleware.protect);
router.get('/', photoHotelController.findAll);

router.post(
  '/:hotelId',
  upload.single('linkImg'),
  hotelMiddleware.validExistHotel,
  photoHotelController.create
);
router
  .route('/:id')

  .delete(
    photoHotelMiddleware.validExistPhotosHotel,
    photoHotelController.deleteElement
  );

const photoHotelRouter = router;

export { photoHotelRouter };
