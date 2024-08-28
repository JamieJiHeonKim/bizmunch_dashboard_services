"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyChildren = exports.verifyParent = exports.verifyAdmin = exports.getRefreshToken = exports.getRefreshTokenParent = exports.getTokenParent = exports.getToken = exports.COOKIE_OPTIONS_PARENT = exports.COOKIE_OPTIONS = void 0;
const passport_1 = __importDefault(require("passport"));
const jwt_1 = require("./jwt");
const jwt = require("jsonwebtoken");
const dev = process.env.NODE_ENV !== "production";
exports.COOKIE_OPTIONS = {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: !dev,
    signed: true,
    maxAge: 60 * 60 * 24 * 30 * 1000,
};
exports.COOKIE_OPTIONS_PARENT = {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: !dev,
    signed: true,
    maxAge: 60 * 60 * 24 * 365 * 1000,
};
const getToken = (user) => {
    return jwt.sign(Object.assign(Object.assign({}, user), { tokenType: "accessToken" }), process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};
exports.getToken = getToken;
const getTokenParent = (user) => {
    return jwt.sign(Object.assign(Object.assign({}, user), { tokenType: "accessToken" }), process.env.JWT_SECRET, {
        expiresIn: "90d",
    });
};
exports.getTokenParent = getTokenParent;
const getRefreshTokenParent = (user) => {
    const refreshToken = jwt.sign(Object.assign(Object.assign({}, user), { tokenType: "refresh" }), process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "365d" // 30 days,
    });
    return refreshToken;
};
exports.getRefreshTokenParent = getRefreshTokenParent;
const getRefreshToken = (user) => {
    return (0, jwt_1.encodeJwt)(Object.assign(Object.assign({}, user), { tokenType: "refresh" }), "90d");
};
exports.getRefreshToken = getRefreshToken;
exports.verifyAdmin = passport_1.default.authenticate("jwt-admin", { session: false });
exports.verifyParent = passport_1.default.authenticate("jwt-parent", { session: false });
exports.verifyChildren = passport_1.default.authenticate("jwt-children", { session: false });
//# sourceMappingURL=Authenticate.js.map