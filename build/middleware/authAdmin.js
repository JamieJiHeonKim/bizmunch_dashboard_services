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
exports.authAdmin = void 0;
const apiErrorHandler_1 = require("../components/utils/apiErrorHandler");
// import {  ADMIN } from '../models';
const log4_1 = require("./log4");
const jwt = require('jsonwebtoken');
const { CognitoIdentityServiceProvider } = require('aws-sdk');
const CognitoExpress = require('cognito-express');
// export const cognitoExpress = new CognitoExpress({
// 	region: process.env.AWS_REGION ,
// 	cognitoUserPoolId: process.env.USER_POOL_ID,
// 	tokenUse: "access", //Possible Values: access | id
// 	tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
// });
const authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bearer = req.headers['authorization'];
        if (!bearer) {
            throw (0, apiErrorHandler_1.unauthorizedException)('Admin not authorized');
        }
        const token = bearer.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }
        // Decode the token to get the payload
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken || !decodedToken.payload.exp || Date.now() >= decodedToken.payload.exp * 1000) {
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
        // Get the user from Cognito
        const cognito = new CognitoIdentityServiceProvider({
            region: process.env.REGION,
        });
        cognito.getUser({ AccessToken: token }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ message: 'Access denied. Invalid token.' });
            }
            // Attach the user to the request object
            req.user = data.UserAttributes;
            next();
        });
        next();
    }
    catch (err) {
        log4_1.Logger.error(err);
        next(err);
    }
});
exports.authAdmin = authAdmin;
//# sourceMappingURL=authAdmin.js.map