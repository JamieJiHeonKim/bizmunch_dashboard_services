import { Logger } from "../../../middleware/log4";
import { HttpException ,badImplementationException, dataNotExistException,validationException} from "../../utils/apiErrorHandler";
import { DASHBOARDUSER } from '../../../models'
import { dashboardUserDocument } from '../../../@types/models';
const { ObjectId } = require('mongodb');
import {
  ADMIN_NOT_FOUND,
  EMAIL_EXIST, INVALID_RESET_TOKEN, MESSAGES,
  // EMAIL_NOT_VERIFIED
} from '../../../constants/errorMessage';
import {encodeJwt } from '../../utils/jwt';
import { sendMessage } from '../../utils/sgMailer';
import { ForgotPasswordMessage, VerifyEMailMessage, messages } from './dashboard.message';
import { LENGTH_ID } from '../../../constants/rules';
import { generateToken } from '../../utils/genToken';
import { __ } from "i18n";
import {  SENDGRID_EMAIL_SENDER } from '../../../middleware/env';
import { getRefreshToken, getToken } from "../../utils/Authenticate";
import { generateBrowserToken } from "../../utils/browserToken";





