"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionConfig = void 0;
const env_1 = require("./env");
exports.sessionConfig = {
    secret: env_1.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        sameSite: env_1.IS_PRODUCTION ? 'none' : 'lax',
        secure: env_1.IS_PRODUCTION,
        domain: env_1.IS_PRODUCTION ? 'salonde.co.jp' : 'localhost123',
        // expires: new Date(getNextMonth(getCurrentTime().format()).format()),
        maxAge: 30 * 60 * 60 * 1000,
    },
};
//# sourceMappingURL=session.js.map