import { ParamSchema, Location } from 'express-validator';
import {
  LENGTH_EMAIL_MAX,
  LENGTH_ID,
  LENGTH_NAME_MAX,
  LENGTH_NAME_MIN,
  LENGTH_PASSWORD_MAX,
  LENGTH_PASSWORD_MIN,
} from './rules';
const { ObjectId } = require('mongodb');

import { DASHBOARDUSER  } from "../models";
import {
  HttpException,
  dataNotExistException,
} from "../components/utils/apiErrorHandler";

import { REGEXP_BIRTH, REGEXP_CHILD_PASSWORD, REGEXP_DATETIME, REGEXP_NAME, REGEXP_PASSWORD, REGEXP_TWO_DIGITS } from './regexp';
import dayjs from 'dayjs';
import bcrypt from "bcryptjs";
import { dashboardUserDocument } from '../@types/models';



export const VALIDATION_RESET_PASSWORD_EMAIL = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isEmail: true,
  isLength: {
    options: { max: LENGTH_EMAIL_MAX },
  },
  custom: {
    options: async (value: string, { req }) => {
      const email = req.body.email;

      const isEmailExist = await DASHBOARDUSER.findOne({ email });
      if (!isEmailExist) {
        throw new HttpException(400, "emai.not.exist", "emai.not.exist");
      }
      return true;
    },
  },
  errorMessage: errorCode,
});

export const VALIDATION_EMAIL = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isEmail: true,
  isLength: {
    options: { max: LENGTH_EMAIL_MAX },
  },
  custom: {
    options: async (value: string, { req }) => {
      const email = req.body.email;

      const isEmailExist = await DASHBOARDUSER.findOne({ email });
      if (isEmailExist) {
        throw new HttpException(400, "emai.already.exist", "emai.already.exist");
      }
      return true;
    },
  },
  errorMessage: errorCode,
});





export const VALIDATION_TEL = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isString: true,
  custom: {
    options: (value) => {
      const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
      if (!phoneRegex.test(value)) {
        throw new HttpException(400, "invalid.phone", "invalid.phone");
      }
      return true;
    },
  },
  errorMessage: "invalid.phone",
});


export const VALIDATION_REGISTER_EMAIL = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isEmail: true,
  isLength: {
    options: { max: LENGTH_EMAIL_MAX },
  },
  custom: {
    options: async (value: string, { req }) => {
      const email = req.body.email;

      const isEmailExist = await DASHBOARDUSER.findOne({ email });
      if (isEmailExist) {
        throw new HttpException(400, "email.already.exist", "email.already.exist");
      }
      return true;
    },
  },
  errorMessage: errorCode,
});

export const VALIDATION_GENDER = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  notEmpty: true,
  custom: {
    options: (value, { req }) => {
      const gender = value.toLowerCase();
      return ['male', 'female', 'other'].includes(gender);
    },
  },
  errorMessage: errorCode,
});

export const VALIDATION_BIRTH = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  notEmpty: true,
  matches: {
    options: /^\d{4}-\d{2}-\d{2}$/,
    errorMessage:"invalid.DOB",
  },
  custom: {
    options: (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime()) && value === date.toISOString().slice(0, 10);
    },
    errorMessage: errorCode,
  },
});

export const VALIDATION_PROVINCE = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  errorMessage: errorCode,
});

export const VALIDATION_PASSWORD = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
  errorMessage: errorCode,
});









export const VALIDATION_NAME = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  isLength: {
    options: { min: LENGTH_NAME_MIN, max: LENGTH_NAME_MAX },
  },
  errorMessage: errorCode,
});


export const VALIDATION_LOGIN_EMAIL = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  isEmail: true,
  notEmpty: true,
  isLength: {
    options: { max: LENGTH_EMAIL_MAX },
  },
  custom: {
    options: async (value: string, { req }) => {
      const email = req.body.email;
      const isUserExist = await DASHBOARDUSER.findOne({ email });
      if (!isUserExist) {
        throw new HttpException(400, "email.not.found", "email.not.found");
      }
      return true;
    },
  },
  errorMessage: errorCode,
});

export const VALIDATION_LOGIN_PASSWORD = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
  custom: {
    options: async (value: string, { req }) => {
      const email = req.body.email;
      const password = req.body.password;
      const isUser = await DASHBOARDUSER.findOne({ email });
      if (isUser) {
        const isMatch = bcrypt.compareSync(password, isUser?.password);
        if (!isMatch) throw new HttpException(400, "password.wrong", "password.wrong");
        req.user = isUser;
        return true;
      }
      throw new HttpException(400, "email.not.found", "email.not.found");
    },
  },
  errorMessage: errorCode,
});

export const VALIDATION_OLD_PASSWORD = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
  custom: {
    options: async (value: string, { req }) => {
      const { _id } = req?.user as dashboardUserDocument;
      const password = req.body.oldPassword;
      const id = ObjectId(`${_id}`)
      const isUser = await DASHBOARDUSER.findById(id);
      if (isUser) {
        const isMatch = bcrypt.compareSync(password, isUser?.password);
        if (!isMatch) throw new HttpException(400, "password.old.wrong", "password.old.wrong");
        req.user = isUser;
        return true;
      }

      throw new HttpException(400,"email.not.found", "email.not.found");
    },
  },
  errorMessage: errorCode,
});



export const VALIDATION_SHAREWITH = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  isIn:{
    options:[["public","friends"]],
  },
  errorMessage: errorCode,
});







export const VALIDATION_STRING = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  isString: true,
  errorMessage: errorCode,
});

export const VALIDATION_NUMERIC = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isNumeric: true,
  errorMessage: errorCode,
});

export const VALIDATION_EMPTY_STRING = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  optional: true,
  isString: true,
  errorMessage: errorCode,
});


export const VALIDATION_CHANGE_PASSWORD = (where: Location, errorCode: string): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
  custom: {
    options: async (value: string, { req }) => {
      const { _id } = req?.user as dashboardUserDocument;
      const password = req.body.newPassword;
      const id = ObjectId(`${_id}`);
      const isUser = await DASHBOARDUSER.findById(id);
      if (isUser) {
        const isMatch = bcrypt.compareSync(password, isUser?.password);
        if (isMatch) throw new HttpException(400, "password.wrong", "password.wrong");
        req.user = isUser;
        return true;
      }
      throw new HttpException(400, "email.not.found", "email.not.found");
    },
  },
  errorMessage: errorCode,
});


// export const VALIDATION_RESET_PASSWORD = (where: Location, errorCode: string): ParamSchema => ({
//   in: [where],
//   isString: true,
//   isLength: {
//     options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
//   },
//   custom: {
//     options: async (value: string, { req }) => {
//       const token = req.body.token;
//       const password = req.body.password;
//       const isToken = await RESETTOKEN.findOne({ token, type: 'reset' });
//       const email = isToken?.email;
//       const isUser = await USER.findOne({ email });
//       if (isUser) {
//         const isMatch = bcrypt.compareSync(password, isUser?.password);
//         if (isMatch) throw new HttpException(400, "password.wrong", "password.wrong");
//         req.user = isUser;
//         return true;
//       }
//       throw new HttpException(400, "email.not.found", "email.not.found");
//     },
//   },
//   errorMessage: errorCode,
// });


// export const VALIDATION_TOKEN_TYPE = (where: Location, errorCode: string): ParamSchema => ({
//   in: [where],
//   notEmpty: true,
//   isString: true,
//   custom: {
//     options: async (value: string, { req }) => {
//       const token = req.body.token;

//       const resetToken = await RESETTOKEN.findOne({ token });
//       if (!resetToken) {
//         throw new HttpException(400, "token.expire.or.invalid", "token.expire.or.invalid");
//       }

//       return true;
//     },
//   },
//   errorMessage: errorCode,
// });









