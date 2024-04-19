import express from 'express';
import * as accommodationController from '../../../controllers/hotelControllers/accommodationControllers/accommodation.controllers.js';
import * as accommodationMiddleware from '../../../middlewares/hotelMiddlewares/accommodationMiddleware/accommodation.middleware.js';

import * as hotelMiddleware from '../../../middlewares/hotelMiddlewares/hotel.middleware.js';
import * as partnerMiddleware from '../../../middlewares/partner.middleware.js';

import * as authPartnerMidlleware from '../../../middlewares/authPartner.middleware.js';
import { upload } from '../../../utils/multer.js';

const router = express.Router();

router.get('/', accommodationController.findAll);
router.get(
  '/:id',
  accommodationMiddleware.validExistAccommodationIncluid,
  accommodationController.findOne
);

router.use(authPartnerMidlleware.protect);
router.get(
  '/partner/:partnerId/hotel/:hotelId',
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  hotelMiddleware.validExistHotel,
  accommodationController.findAllIdHotel
);

router.get(
  '/partner/:partnerId/:id',
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  accommodationMiddleware.validExistAccommodationIncluid,
  accommodationController.findOne
);

router.post(
  '/partner/:partnerId/hotel/:hotelId',
  upload.fields([{ name: 'linkImg', maxCount: 4 }]),
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  hotelMiddleware.validExistHotel,
  accommodationController.create
);
router
  .route('/:id')
  .patch(
    accommodationMiddleware.validExistAccommodation,
    accommodationController.update
  )
  .delete(
    accommodationMiddleware.validExistAccommodation,
    accommodationController.deleteElement
  );

const accommodationRouter = router;

export { accommodationRouter };
