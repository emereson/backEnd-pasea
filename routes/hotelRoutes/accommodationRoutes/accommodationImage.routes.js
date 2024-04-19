import express from 'express';
import { upload } from '../../../utils/multer.js';

import * as accommodationImageController from '../../../controllers/hotelControllers/accommodationControllers/accommodationImages.controllers.js';
import * as accommodationImageMiddleware from '../../..//middlewares/hotelMiddlewares/accommodationMiddleware/accommodationImage.middleware.js';

import * as accommodationMiddleware from '../../../middlewares/hotelMiddlewares/accommodationMiddleware/accommodation.middleware.js';
import * as authPartnerMidlleware from '../../../middlewares/authPartner.middleware.js';

const router = express.Router();

router.use(authPartnerMidlleware.protect);
router.get('/', accommodationImageController.findAll);

router.post(
  '/:id',
  upload.single('linkImg'),
  accommodationMiddleware.validExistAccommodation,
  accommodationImageController.create
);
router
  .route('/:id')

  .delete(
    accommodationImageMiddleware.validExistImagesAccommodation,
    accommodationImageController.deleteElement
  );

const accommodationImageRouter = router;

export { accommodationImageRouter };
