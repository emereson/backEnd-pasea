import express from 'express';
import * as hotelController from '../../controllers/hotelControllers/hotel.controllers.js';
import * as hotelMiddleware from '../../middlewares/hotelMiddlewares/hotel.middleware.js';

import * as partnerMiddleware from '../../middlewares/partner.middleware.js';
import * as authPartnerMidlleware from '../../middlewares/authPartner.middleware.js';
import { upload } from '../../utils/multer.js';

const router = express.Router();

router.get('/', hotelController.findAll);

router.use(authPartnerMidlleware.protect);
router.get(
  '/partner/:partnerId',
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  hotelController.findAllHotelsPartner
);
router.get(
  '/partner/:partnerId/hotel/:hotelId',
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  hotelMiddleware.validExistHotelIncluids,
  hotelController.findOne
);

router.patch('/service/:serviceId', hotelController.updateService);

router.post(
  '/partner/:partnerId',
  upload.single('linkImg'),
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  hotelController.create
);
router
  .route('/:hotelId')
  .patch(hotelMiddleware.validExistHotel, hotelController.update)
  .delete(hotelMiddleware.validExistHotel, hotelController.deleteElement);

const hotelRouter = router;

export { hotelRouter };
