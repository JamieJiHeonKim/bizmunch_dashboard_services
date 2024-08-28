import * as express from 'express';
import { checkSchema } from 'express-validator';
import { authUser } from '../../../middleware/authUser';
import { checkValidation } from '../../utils/validation';
import * as controller from './auth.controller';
import {
  REGISTERATION_SCHEMA,
  LOGIN_SCHEMA,
  VERIFYEMAIL_SCHEMA,
  CHANGE_PASSWORD_SCHEMA
} from './auth.validation';

const router = express.Router();


router.post('/register',
  checkSchema(REGISTERATION_SCHEMA),
  checkValidation,
  controller.register);
  
router.put('/login',
  checkSchema(LOGIN_SCHEMA),
  checkValidation,
  controller.login);
  
router.put("/profile/update",
  authUser,
  controller.updateProfile)

  router.put("/password/change",
  authUser,
  controller.changePassword)

  

export default router;
