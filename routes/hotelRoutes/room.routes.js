import express from 'express';

import * as roomController from '../../controllers/hotelControllers/room.controllers.js';
import * as roomMiddleware from '../../middlewares/hotelMiddlewares/room.middleware.js';

import * as hotelMiddleware from '../../middlewares/hotelMiddlewares/hotel.middleware.js';
import * as partnerMiddleware from '../../middlewares/partner.middleware.js';
import * as authPartnerMidlleware from '../../middlewares/authPartner.middleware.js';

const router = express.Router();

router.get('/', roomController.findAll);

router.use(authPartnerMidlleware.protect);

router.get(
  '/partner/:partnerId/hotel/:hotelId',
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  hotelMiddleware.validExistHotel,
  roomController.findAllHotel
);

router.post(
  '/partner/:partnerId/hotel/:hotelId',
  partnerMiddleware.validExistPart,
  authPartnerMidlleware.protectAccountOwner,
  hotelMiddleware.validExistHotel,
  roomController.create
);
router
  .route('/:id')
  .get(roomMiddleware.validExistRoom, roomController.findOne)
  .patch(roomMiddleware.validExistRoom, roomController.update)
  .delete(roomMiddleware.validExistRoom, roomController.deleteElement);

const roomRouter = router;

export { roomRouter };
