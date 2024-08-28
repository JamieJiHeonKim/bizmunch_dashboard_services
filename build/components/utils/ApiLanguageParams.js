"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiLanguageParams = void 0;
const env_1 = require("../../middleware/env");
// this method is used to get the language params for the api calls
// this method is used to get the language params for the api calls
const ApiLanguageParams = (req, res, next) => {
    const { language } = req.query;
    if (!language || (language !== 'en' && language !== 'ja' || !env_1.IS_PRODUCTION)) {
        req.query.language = 'ja';
    }
    next();
};
exports.ApiLanguageParams = ApiLanguageParams;
//# sourceMappingURL=ApiLanguageParams.js.map