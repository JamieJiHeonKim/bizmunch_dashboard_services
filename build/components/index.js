"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerComponents = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const components_1 = __importDefault(require("./components"));
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
const registerComponents = (app) => {
    if (process.env.NODE_ENV === 'development')
        app.use('/v1', components_1.default);
    else
        app.use('/v1', apiLimiter, components_1.default);
    app.get('/', (req, res, next) => {
        return res.status(200).json('Hello World');
    });
};
exports.registerComponents = registerComponents;
//# sourceMappingURL=index.js.map