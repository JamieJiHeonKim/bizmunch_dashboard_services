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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const apiErrorHandler_1 = require("../components/utils/apiErrorHandler");
const jwt_1 = require("../components/utils/jwt");
const models_1 = require("../models");
const log4_1 = require("./log4");
const authUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearer = req.headers['authorization'];
        if (!bearer) {
            throw (0, apiErrorHandler_1.unauthorizedException)('user not authorized');
        }
        const token = bearer.split(' ')[1];
        const decoded = yield (0, jwt_1.decodeJwt)(token);
        if (!decoded) {
            throw (0, apiErrorHandler_1.unauthorizedException)('user not authorized');
        }
        const { id } = decoded.payload;
        const user = yield models_1.DASHBOARDUSER.findById(id);
        if (!user) {
            throw (0, apiErrorHandler_1.unauthorizedException)('user not authorized');
        }
        req.user = user;
        next();
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.authUser = authUser;
//# sourceMappingURL=authUser.js.map