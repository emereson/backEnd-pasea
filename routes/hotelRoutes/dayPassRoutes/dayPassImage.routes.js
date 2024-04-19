import express from 'express';
import { upload } from '../../../utils/multer.js';

import * as dayPassImageController from '../../../controllers/hotelControllers/daypassControllers/dayPassImage.controllers.js';
import * as dayPassImageMiddleware from '../../..//middlewares/hotelMiddlewares/dayPassMiddlewares/dayPassImage.middleware.js';

import * as dayPassMiddleware from '../../../middlewares/hotelMiddlewares/dayPassMiddlewares/dayPass.middleware.js';
import * as authPartnerMidlleware from '../../../middlewares/authPartner.middleware.js';

const router = express.Router();

router.use(authPartnerMidlleware.protect);
router.get('/', dayPassImageController.findAll);

router.post(
  '/:id',
  upload.single('linkImg'),
  dayPassMiddleware.validExistDayPass,
  dayPassImageController.create
);
router
  .route('/:id')

  .delete(
    dayPassImageMiddleware.validExistDayPassImage,
    dayPassImageController.deleteElement
  );

const dayPassImageRouter = router;

export { dayPassImageRouter };
