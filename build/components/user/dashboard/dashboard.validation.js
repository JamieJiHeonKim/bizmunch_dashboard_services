"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTERATION_SCHEMA = exports.VERIFYEMAIL_SCHEMA = exports.FORGOT_PASSWORD_SCHEMA = exports.CHANGE_PASSWORD_SCHEMA = exports.LOGIN_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.LOGIN_SCHEMA = {
    email: (0, validation_1.VALIDATION_LOGIN_EMAIL)('body', 'email.Invalid'),
    password: (0, validation_1.VALIDATION_LOGIN_PASSWORD)('body', 'password.Invalid'),
};
exports.CHANGE_PASSWORD_SCHEMA = {
    newPassword: (0, validation_1.VALIDATION_CHANGE_PASSWORD)('body', 'newPassword.Invalid'),
};
exports.FORGOT_PASSWORD_SCHEMA = {
    email: (0, validation_1.VALIDATION_RESET_PASSWORD_EMAIL)('body', 'email.Invalid'),
};
// export const UPDATE_PASSWORD_SCHEMA: Schema = {
//   password: VALIDATION_RESET_PASSWORD('body', 'password.Invalid'),
//   token: VALIDATION_TOKEN_TYPE('body', 'token.Invalid'),
// };
exports.VERIFYEMAIL_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL)('body', 'email.Invalid'),
};
exports.REGISTERATION_SCHEMA = {
    email: (0, validation_1.VALIDATION_REGISTER_EMAIL)('body', 'email.Invalid'),
    password: (0, validation_1.VALIDATION_PASSWORD)('body', 'password.Invalid'),
};
//# sourceMappingURL=dashboard.validation.js.map