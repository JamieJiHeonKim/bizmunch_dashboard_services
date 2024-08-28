import { validationException } from '../components/utils/apiErrorHandler';
import { ParamSchema, Location } from 'express-validator';
import bcrypt from 'bcryptjs';
import {
  LENGTH_EMAIL_MAX,
  LENGTH_ID,
  LENGTH_NAME_MAX,
  LENGTH_NAME_MIN,
  LENGTH_PASSWORD_MAX,
  LENGTH_PASSWORD_MIN,
  LENGTH_ZIPCODE,
} from './rules';

import { REGEXP_BIRTH, REGEXP_PASSWORD } from './regexp';
// import { RESETTOKEN, ADMIN } from '../models';
import { HttpException } from '../components/utils/apiErrorHandler';

export const VALIDATION_UPDATE_PASSWORD = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
  custom: {
    options: async (value: string, { req }) => {
      const password = req.body.oldPassword;

      const isMatch = await bcrypt.compareSync(password, req.user.password);
      if (!isMatch) throw new HttpException(400, '40001', 3000);
      return true;
    },
  },
  errorMessage: '40001',
});

export const VALIDATION_EMAIL = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: true,
  isLength: {
    options: { max: LENGTH_EMAIL_MAX },
  },
  errorMessage: '40000',
});
// export const VALIDATION_IS_EMAIL_EXIST = (where: Location): ParamSchema => ({
//   in: [where],
//   isEmail: true,
//   isLength: {
//     options: { max: LENGTH_EMAIL_MAX },
//   },
//   custom: {
//     options: async (value: string, { req }) => {
//       const email = req.body.email;

//       const isEmailExist = await ADMIN.findOne({ email });
//       if (isEmailExist) {
//         throw new HttpException(400, '40000', 3000);
//       }
//       return true;
//     },
//   },
//   errorMessage: '40000',
// });

// export const VALIDATION_OTP = (where: Location): ParamSchema => ({
//   in: [where],
//   isLength: {
//     options: { max: 6 },
//   },
//   custom: {
//     options: async (value: string, { req }) => {
//       const token = req.body.token;
//       const email = req.body.email;
//       const isTokenExist = await RESETTOKEN.findOne({ token, email });
//       if (isTokenExist) return;
//       throw new HttpException(400, '40002', 3000);
//     },
//   },
//   errorMessage: '40002',
// });
// export const VALIDATION_OTP_RESET = (where: Location): ParamSchema => ({
//   in: [where],
//   custom: {
//     options: async (value: string, { req }) => {
//       const token = req.body.token;
//       const isTokenExist = await RESETTOKEN.findOne({ token , type: 'reset' });
//       if (isTokenExist) return true;
//       throw new HttpException(400, '40002', 3000);
//     },
//   },
//   errorMessage: '40002',
// });

// export const VALIDATION_LOGIN_EMAIL = (where: Location): ParamSchema => ({
//   in: [where],
//   isEmail: true,
//   isLength: {
//     options: { max: LENGTH_EMAIL_MAX },
//   },
//   custom: {
//     options: async (value: string, { req }) => {
//       const email = req.body.email;
//       const isUserExist = await ADMIN.findOne({ email });
//       if (!isUserExist) {
//         throw new HttpException(400, '40000', 3000);
//       }
//       return true;
//     },
//   },
//   errorMessage: 'Invalid Email',
// });

// export const VALIDATION_LOGIN_PASSWORD = (where: Location): ParamSchema => ({
//   in: [where],
//   isString: true,
//   custom: {
//     options: async (value: string, { req }) => {
//       const email = req.body.email;
//       const password = req.body.password;
//       const isUser = await ADMIN.findOne({ email });
//       if (isUser) {
//         const isMatch = bcrypt.compareSync(password, isUser?.password);
//         console.log(isUser?.password , password)
//         if (!isMatch) throw new HttpException(401, "40001", 3000);
//         req.user = isUser;
//         return true;
//       }
//       throw new HttpException(400, '40001', 3000);
//     },
//   },
//   errorMessage: '40001',
// });

export const VALIDATION_PASSWORD = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isString: true,
  errorMessage: '40001',
});

export const VALIDATION_PASSWORD_NULLABLE = (where: Location): ParamSchema => ({
  in: [where],
  optional: { options: { nullable: true } },
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
  errorMessage: '40001',
});

export const VALIDATION_OFFSET = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isNumeric: true,
  errorMessage: 'Offset required',
});

export const VALIDATION_LIMIT = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isNumeric: true,
  errorMessage: 'Limit required',
});
