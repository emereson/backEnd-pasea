import express from 'express';
import * as partnerMiddleware from '../middlewares/partner.middleware.js';
import * as partnerController from '../controllers/partner.controllers.js';
import * as validationMiddleware from '../middlewares/validations.middleware.js';
import * as authPartnerMidlleware from '../middlewares/authPartner.middleware.js';

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUser,
  partnerController.signup
);
router.post('/login', validationMiddleware.loginUser, partnerController.login);
router.get('/email', partnerController.verificateExistEmail);
router.post(
  '/active/:id',
  partnerMiddleware.validExistPartDisble,
  partnerController.activePartner
);

router.use(authPartnerMidlleware.protect);
router.post(
  '/active-patner',
  partnerMiddleware.validExistPartDisble,
  partnerController.activePartner
);
router.post(
  '/generate-code',
  partnerMiddleware.validExistPartDisble,
  partnerController.generateNewCode
);

router.get('/', partnerController.findAll);
router
  .route('/:id')
  .get(partnerMiddleware.validExistPart, partnerController.findOne)
  .patch(partnerMiddleware.validExistPart, partnerController.update)
  .delete(partnerMiddleware.validExistPart, partnerController.deleteUser);

const partnerRouter = router;

export { partnerRouter };
