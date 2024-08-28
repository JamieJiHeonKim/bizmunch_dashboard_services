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
exports.callApi = void 0;
const axios_1 = __importDefault(require("axios"));
const apiErrorHandler_1 = require("../components/utils/apiErrorHandler");
axios_1.default.defaults.responseType = 'json';
axios_1.default.defaults.withCredentials = true;
/**
 * URLレファレンスのJSON内のURLの改変
 * @param {String} url
 * @param {Oject} params 返還したいURLパラメーター
 */
function formatUrl(url, params) {
    if (!params)
        return url;
    const prefix = '/:(.+?)(/|$)';
    const re = new RegExp(prefix, 'g');
    if ((url.match(re) || []).length !== Object.keys(params).length) {
        throw Error('Insufficinet (or) excess parameters while formating API URL');
    }
    return url.replace(re, (...p) => `/${params[p[1]]}${p[2]}`);
}
const callApi = (config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, urlParams } = config;
        if (!url)
            throw (0, apiErrorHandler_1.validationException)(new Error('ApiConfig must contain url'));
        config.url = formatUrl(url, urlParams);
        const response = yield (0, axios_1.default)(config);
        return Promise.resolve(response.data);
    }
    catch (err) {
        return Promise.reject(err);
    }
});
exports.callApi = callApi;
//# sourceMappingURL=axios.js.map