"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const whitelist = [
    'http://localhost:8081',
    'https://bizmunch.com',
    'https://api.bizmunch.com'
];
exports.corsOptions = {
    origin(origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
//# sourceMappingURL=cors.js.map