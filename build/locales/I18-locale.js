"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __importDefault(require("i18n"));
const path_1 = __importDefault(require("path"));
function I18NLCAOLE(app) {
    console.log(__dirname);
    i18n_1.default.configure({
        locales: ['en', 'ja'],
        directory: path_1.default.join(__dirname, "json"),
        defaultLocale: 'en',
        updateFiles: false,
        cookie: 'locale'
    });
    app.use(i18n_1.default.init);
}
exports.default = I18NLCAOLE;
//# sourceMappingURL=I18-locale.js.map