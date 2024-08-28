"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnErrorMessage = void 0;
const i18n_1 = require("i18n");
const returnErrorMessage = (code) => {
    console.log(code);
    switch (code) {
        case "40000":
            return (0, i18n_1.__)("ERROR_INVALID_EMAIL");
        case "40001":
            return (0, i18n_1.__)("ERROR_INVALID_PASSWORD");
        case "40002":
            return (0, i18n_1.__)("ERROR_INVALID_TOKEN");
        case "40003":
            return (0, i18n_1.__)("ERROR_INVALID_TOKENTYPE");
        case "40004":
            return (0, i18n_1.__)("ERROR_USER_NOT_FOUND");
        case "40004":
            return (0, i18n_1.__)("ERROR_USER_ALREADY_EXISTS");
        case "40005":
            return (0, i18n_1.__)("ERROR_BIKEID");
        case "40006":
            return (0, i18n_1.__)("ERROR_CATEGORYID");
        case "40007":
            return (0, i18n_1.__)("ERROR_SHAREWITH");
        case "40008":
            return (0, i18n_1.__)("ERROR_BLOG_NOT_FOUND");
        case "40009":
            return (0, i18n_1.__)("ERROR_BLOG_COMMENT_ID");
        case "40010":
            return (0, i18n_1.__)("ERROR_THREAD_COMMENT_ID");
        case "40011":
            return (0, i18n_1.__)("ERROR_POST_ID");
        case "40012":
            return (0, i18n_1.__)("ERROR_POST_COMMENT_ID");
        case "40013":
            return (0, i18n_1.__)("ERROR_TOURING_ID");
        default:
            return code;
    }
};
exports.returnErrorMessage = returnErrorMessage;
//# sourceMappingURL=validationErrorMessages.js.map