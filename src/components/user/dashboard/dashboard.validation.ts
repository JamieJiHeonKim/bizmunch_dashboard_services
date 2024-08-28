import { Schema } from 'express-validator';
import {
  VALIDATION_NAME,
  VALIDATION_EMAIL,
  VALIDATION_PASSWORD,
  VALIDATION_GENDER,
  VALIDATION_BIRTH,
  VALIDATION_PROVINCE,
  VALIDATION_TEL,
  VALIDATION_LOGIN_EMAIL,
  VALIDATION_LOGIN_PASSWORD,
  VALIDATION_STRING,
  VALIDATION_RESET_PASSWORD_EMAIL,
  VALIDATION_REGISTER_EMAIL,
  VALIDATION_CHANGE_PASSWORD,
  VALIDATION_OLD_PASSWORD
} from '../../../constants/validation';

export const LOGIN_SCHEMA: Schema = {
  email: VALIDATION_LOGIN_EMAIL('body', 'email.Invalid'),
  password: VALIDATION_LOGIN_PASSWORD('body', 'password.Invalid'),
};

export const CHANGE_PASSWORD_SCHEMA: Schema = {
  newPassword: VALIDATION_CHANGE_PASSWORD('body', 'newPassword.Invalid'),
};

export const FORGOT_PASSWORD_SCHEMA: Schema = {
  email: VALIDATION_RESET_PASSWORD_EMAIL('body', 'email.Invalid'),
};

// export const UPDATE_PASSWORD_SCHEMA: Schema = {
//   password: VALIDATION_RESET_PASSWORD('body', 'password.Invalid'),
//   token: VALIDATION_TOKEN_TYPE('body', 'token.Invalid'),
// };

export const VERIFYEMAIL_SCHEMA: Schema = {
  email: VALIDATION_EMAIL('body', 'email.Invalid'),
};

export const REGISTERATION_SCHEMA: Schema = {
  email: VALIDATION_REGISTER_EMAIL('body', 'email.Invalid'),
  password: VALIDATION_PASSWORD('body', 'password.Invalid'),
};

