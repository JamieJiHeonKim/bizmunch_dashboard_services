"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_LIMIT = exports.VALIDATION_OFFSET = exports.VALIDATION_PASSWORD_NULLABLE = exports.VALIDATION_PASSWORD = exports.VALIDATION_EMAIL = exports.VALIDATION_UPDATE_PASSWORD = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const rules_1 = require("./rules");
const regexp_1 = require("./regexp");
// import { RESETTOKEN, ADMIN } from '../models';
const apiErrorHandler_1 = require("../components/utils/apiErrorHandler");
const VALIDATION_UPDATE_PASSWORD = (where) => ({
    in: [where],
    isString: true,
    matches: {
        options: regexp_1.REGEXP_PASSWORD,
    },
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
    custom: {
        options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const password = req.body.oldPassword;
            const isMatch = yield bcryptjs_1.default.compareSync(password, req.user.password);
            if (!isMatch)
                throw new apiErrorHandler_1.HttpException(400, '40001', 3000);
            return true;
        }),
    },
    errorMessage: '40001',
});
exports.VALIDATION_UPDATE_PASSWORD = VALIDATION_UPDATE_PASSWORD;
const VALIDATION_EMAIL = (where) => ({
    in: [where],
    isEmail: true,
    isLength: {
        options: { max: rules_1.LENGTH_EMAIL_MAX },
    },
    errorMessage: '40000',
});
exports.VALIDATION_EMAIL = VALIDATION_EMAIL;
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
const VALIDATION_PASSWORD = (where) => ({
    in: [where],
    notEmpty: true,
    isString: true,
    errorMessage: '40001',
});
exports.VALIDATION_PASSWORD = VALIDATION_PASSWORD;
const VALIDATION_PASSWORD_NULLABLE = (where) => ({
    in: [where],
    optional: { options: { nullable: true } },
    isString: true,
    matches: {
        options: regexp_1.REGEXP_PASSWORD,
    },
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
    errorMessage: '40001',
});
exports.VALIDATION_PASSWORD_NULLABLE = VALIDATION_PASSWORD_NULLABLE;
const VALIDATION_OFFSET = (where) => ({
    in: [where],
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Offset required',
});
exports.VALIDATION_OFFSET = VALIDATION_OFFSET;
const VALIDATION_LIMIT = (where) => ({
    in: [where],
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'Limit required',
});
exports.VALIDATION_LIMIT = VALIDATION_LIMIT;
//# sourceMappingURL=Admin.Validation.js.map