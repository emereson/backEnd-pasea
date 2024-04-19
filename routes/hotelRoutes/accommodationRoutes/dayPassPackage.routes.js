import express from 'express';

import * as dayPassPackageController from '../../../controllers/hotelControllers/daypassControllers/dayPassPackage.controllers.js';
import * as dayPassPackageMiddleware from '../../../middlewares/hotelMiddlewares/dayPassMiddlewares/dayPassPackage.middleware.js';

import * as dayPassMiddleware from '../../../middlewares/hotelMiddlewares/dayPassMiddlewares/dayPass.middleware.js';
import * as authPartnerMidlleware from '../../../middlewares/authPartner.middleware.js';

const router = express.Router();

router.use(authPartnerMidlleware.protect);
router.get('/', dayPassPackageController.findAll);
router.get(
  '/dayPass/:id',
  dayPassMiddleware.validExistDayPass,
  dayPassPackageController.findAllDayPassId
);

router.get(
  '/services/:id',
  dayPassPackageMiddleware.validExistPackageDayPass,
  dayPassPackageController.findAllServicesId
);

router
  .route('/:id')
  .get(
    dayPassPackageMiddleware.validExistPackageDayPass,
    dayPassPackageController.findOne
  )
  .post(dayPassMiddleware.validExistDayPass, dayPassPackageController.create)
  .patch(
    dayPassPackageMiddleware.validExistPackageDayPass,
    dayPassPackageController.update
  )
  .delete(
    dayPassPackageMiddleware.validExistPackageDayPass,
    dayPassPackageController.deleteElement
  );

const dayPassPackageRouter = router;

export { dayPassPackageRouter };
