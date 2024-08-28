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
exports.config = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = require("./mongo");
const log4_1 = require("./log4");
const env_1 = require("./env");
const Swagger_config_1 = require("./Swagger.config");
const I18_locale_1 = __importDefault(require("../locales/I18-locale"));
const session_1 = require("./session");
const expressSession = require('express-session');
const config = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use(log4_1.Logger.access());
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)(env_1.COOKIE_SECRET));
    app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
    (0, I18_locale_1.default)(app);
    app.use(expressSession(session_1.sessionConfig));
    (0, Swagger_config_1.swaeger)(app);
    yield (0, mongo_1.connectMongo)();
    if (env_1.IS_PRODUCTION)
        app.set('trust proxy', 1);
});
exports.config = config;
//# sourceMappingURL=config.js.map