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
exports.VALIDATION_CHANGE_PASSWORD = exports.VALIDATION_EMPTY_STRING = exports.VALIDATION_NUMERIC = exports.VALIDATION_STRING = exports.VALIDATION_SHAREWITH = exports.VALIDATION_OLD_PASSWORD = exports.VALIDATION_LOGIN_PASSWORD = exports.VALIDATION_LOGIN_EMAIL = exports.VALIDATION_NAME = exports.VALIDATION_PASSWORD = exports.VALIDATION_PROVINCE = exports.VALIDATION_BIRTH = exports.VALIDATION_GENDER = exports.VALIDATION_REGISTER_EMAIL = exports.VALIDATION_TEL = exports.VALIDATION_EMAIL = exports.VALIDATION_RESET_PASSWORD_EMAIL = void 0;
const rules_1 = require("./rules");
const { ObjectId } = require('mongodb');
const models_1 = require("../models");
const apiErrorHandler_1 = require("../components/utils/apiErrorHandler");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const VALIDATION_RESET_PASSWORD_EMAIL = (where, errorCode) => ({
    in: [where],
    notEmpty: true,
    isEmail: true,
    isLength: {
        options: { max: rules_1.LENGTH_EMAIL_MAX },
    },
    custom: {
        options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const email = req.body.email;
            const isEmailExist = yield models_1.DASHBOARDUSER.findOne({ email });
            if (!isEmailExist) {
                throw new apiErrorHandler_1.HttpException(400, "emai.not.exist", "emai.not.exist");
            }
            return true;
        }),
    },
    errorMessage: errorCode,
});
exports.VALIDATION_RESET_PASSWORD_EMAIL = VALIDATION_RESET_PASSWORD_EMAIL;
const VALIDATION_EMAIL = (where, errorCode) => ({
    in: [where],
    notEmpty: true,
    isEmail: true,
    isLength: {
        options: { max: rules_1.LENGTH_EMAIL_MAX },
    },
    custom: {
        options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const email = req.body.email;
            const isEmailExist = yield models_1.DASHBOARDUSER.findOne({ email });
            if (isEmailExist) {
                throw new apiErrorHandler_1.HttpException(400, "emai.already.exist", "emai.already.exist");
            }
            return true;
        }),
    },
    errorMessage: errorCode,
});
exports.VALIDATION_EMAIL = VALIDATION_EMAIL;
const VALIDATION_TEL = (where) => ({
    in: [where],
    notEmpty: true,
    isString: true,
    custom: {
        options: (value) => {
            const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
            if (!phoneRegex.test(value)) {
                throw new apiErrorHandler_1.HttpException(400, "invalid.phone", "invalid.phone");
            }
            return true;
        },
    },
    errorMessage: "invalid.phone",
});
exports.VALIDATION_TEL = VALIDATION_TEL;
const VALIDATION_REGISTER_EMAIL = (where, errorCode) => ({
    in: [where],
    notEmpty: true,
    isEmail: true,
    isLength: {
        options: { max: rules_1.LENGTH_EMAIL_MAX },
    },
    custom: {
        options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const email = req.body.email;
            const isEmailExist = yield models_1.DASHBOARDUSER.findOne({ email });
            if (isEmailExist) {
                throw new apiErrorHandler_1.HttpException(400, "email.already.exist", "email.already.exist");
            }
            return true;
        }),
    },
    errorMessage: errorCode,
});
exports.VALIDATION_REGISTER_EMAIL = VALIDATION_REGISTER_EMAIL;
const VALIDATION_GENDER = (where, errorCode) => ({
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
exports.VALIDATION_GENDER = VALIDATION_GENDER;
const VALIDATION_BIRTH = (where, errorCode) => ({
    in: [where],
    notEmpty: true,
    matches: {
        options: /^\d{4}-\d{2}-\d{2}$/,
        errorMessage: "invalid.DOB",
    },
    custom: {
        options: (value) => {
            const date = new Date(value);
            return !isNaN(date.getTime()) && value === date.toISOString().slice(0, 10);
        },
        errorMessage: errorCode,
    },
});
exports.VALIDATION_BIRTH = VALIDATION_BIRTH;
const VALIDATION_PROVINCE = (where, errorCode) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    errorMessage: errorCode,
});
exports.VALIDATION_PROVINCE = VALIDATION_PROVINCE;
const VALIDATION_PASSWORD = (where, errorCode) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
    errorMessage: errorCode,
});
exports.VALIDATION_PASSWORD = VALIDATION_PASSWORD;
const VALIDATION_NAME = (where, errorCode) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    isLength: {
        options: { min: rules_1.LENGTH_NAME_MIN, max: rules_1.LENGTH_NAME_MAX },
    },
    errorMessage: errorCode,
});
exports.VALIDATION_NAME = VALIDATION_NAME;
const VALIDATION_LOGIN_EMAIL = (where, errorCode) => ({
    in: [where],
    isEmail: true,
    notEmpty: true,
    isLength: {
        options: { max: rules_1.LENGTH_EMAIL_MAX },
    },
    custom: {
        options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const email = req.body.email;
            const isUserExist = yield models_1.DASHBOARDUSER.findOne({ email });
            if (!isUserExist) {
                throw new apiErrorHandler_1.HttpException(400, "email.not.found", "email.not.found");
            }
            return true;
        }),
    },
    errorMessage: errorCode,
});
exports.VALIDATION_LOGIN_EMAIL = VALIDATION_LOGIN_EMAIL;
const VALIDATION_LOGIN_PASSWORD = (where, errorCode) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
    custom: {
        options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const isUser = yield models_1.DASHBOARDUSER.findOne({ email });
            if (isUser) {
                const isMatch = bcryptjs_1.default.compareSync(password, isUser === null || isUser === void 0 ? void 0 : isUser.password);
                if (!isMatch)
                    throw new apiErrorHandler_1.HttpException(400, "password.wrong", "password.wrong");
                req.user = isUser;
                return true;
            }
            throw new apiErrorHandler_1.HttpException(400, "email.not.found", "email.not.found");
        }),
    },
    errorMessage: errorCode,
});
exports.VALIDATION_LOGIN_PASSWORD = VALIDATION_LOGIN_PASSWORD;
const VALIDATION_OLD_PASSWORD = (where, errorCode) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
    custom: {
        options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const { _id } = req === null || req === void 0 ? void 0 : req.user;
            const password = req.body.oldPassword;
            const id = ObjectId(`${_id}`);
            const isUser = yield models_1.DASHBOARDUSER.findById(id);
            if (isUser) {
                const isMatch = bcryptjs_1.default.compareSync(password, isUser === null || isUser === void 0 ? void 0 : isUser.password);
                if (!isMatch)
                    throw new apiErrorHandler_1.HttpException(400, "password.old.wrong", "password.old.wrong");
                req.user = isUser;
                return true;
            }
            throw new apiErrorHandler_1.HttpException(400, "email.not.found", "email.not.found");
        }),
    },
    errorMessage: errorCode,
});
exports.VALIDATION_OLD_PASSWORD = VALIDATION_OLD_PASSWORD;
const VALIDATION_SHAREWITH = (where, errorCode) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    isIn: {
        options: [["public", "friends"]],
    },
    errorMessage: errorCode,
});
exports.VALIDATION_SHAREWITH = VALIDATION_SHAREWITH;
const VALIDATION_STRING = (where, errorCode) => ({
    in: [where],
    isString: true,
    errorMessage: errorCode,
});
exports.VALIDATION_STRING = VALIDATION_STRING;
const VALIDATION_NUMERIC = (where, errorCode) => ({
    in: [where],
    notEmpty: true,
    isNumeric: true,
    errorMessage: errorCode,
});
exports.VALIDATION_NUMERIC = VALIDATION_NUMERIC;
const VALIDATION_EMPTY_STRING = (where, errorCode) => ({
    in: [where],
    optional: true,
    isString: true,
    errorMessage: errorCode,
});
exports.VALIDATION_EMPTY_STRING = VALIDATION_EMPTY_STRING;
const VALIDATION_CHANGE_PASSWORD = (where, errorCode) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
    custom: {
        options: (value, { req }) => __awaiter(void 0, void 0, void 0, function* () {
            const { _id } = req === null || req === void 0 ? void 0 : req.user;
            const password = req.body.newPassword;
            const id = ObjectId(`${_id}`);
            const isUser = yield models_1.DASHBOARDUSER.findById(id);
            if (isUser) {
                const isMatch = bcryptjs_1.default.compareSync(password, isUser === null || isUser === void 0 ? void 0 : isUser.password);
                if (isMatch)
                    throw new apiErrorHandler_1.HttpException(400, "password.wrong", "password.wrong");
                req.user = isUser;
                return true;
            }
            throw new apiErrorHandler_1.HttpException(400, "email.not.found", "email.not.found");
        }),
    },
    errorMessage: errorCode,
});
exports.VALIDATION_CHANGE_PASSWORD = VALIDATION_CHANGE_PASSWORD;
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
//# sourceMappingURL=validation.js.map