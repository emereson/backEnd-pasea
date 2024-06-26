import express from 'express';
import * as dayPassController from '../../../controllers/hotelControllers/daypassControllers/daypass.controllers.js';
import * as dayPassMiddleware from '../../../middlewares/hotelMiddlewares/dayPassMiddlewares/dayPass.middleware.js';

import * as hotelMiddleware from '../../../middlewares/hotelMiddlewares/hotel.middleware.js';
import * as partnerMiddleware from '../../../middlewares/partner.middleware.js';

import * as authPartnerMidlleware from '../../../middlewares/authPartner.middleware.js';
import { upload } from '../../../utils/multer.js';

const router = express.Router();

router.get('/', dayPassController.findAll);
router.get(
  '/:id',
  dayPassMiddleware.validExistDayPassIncluid,
  dayPassController.findOne
);

router.use(authPartnerMidlleware.protect);
router.get(
  '/partner/:partnerId/hotel/:hotelId',
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  hotelMiddleware.validExistHotel,
  dayPassController.findAllIdHotel
);

router.get(
  '/partner/:partnerId/:id',
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  dayPassMiddleware.validExistDayPassIncluid,
  dayPassController.findOne
);

router.post(
  '/partner/:partnerId/hotel/:hotelId',
  upload.fields([{ name: 'linkImg', maxCount: 4 }]),
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  hotelMiddleware.validExistHotel,
  dayPassController.create
);
router
  .route('/:id')
  .patch(dayPassMiddleware.validExistDayPass, dayPassController.update)
  .delete(dayPassMiddleware.validExistDayPass, dayPassController.deleteElement);

const dayPassRouter = router;

export { dayPassRouter };
