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
exports.changePassword = exports.updateProfile = exports.login = exports.register = void 0;
const log4_1 = require("../../../middleware/log4");
const apiErrorHandler_1 = require("../../utils/apiErrorHandler");
const models_1 = require("../../../models");
const { ObjectId } = require('mongodb');
const errorMessage_1 = require("../../../constants/errorMessage");
const jwt_1 = require("../../utils/jwt");
const auth_message_1 = require("./auth.message");
const register = (email, password, name, companyId, status) => __awaiter(void 0, void 0, void 0, function* () {
    let error, session, data;
    try {
        log4_1.Logger.info("Register User");
        session = yield models_1.DASHBOARDUSER.startSession();
        session.startTransaction();
        let userData = {
            email: email,
            password: password,
            name: name,
            companyId: companyId,
            status: status
        };
        const newUser = new models_1.DASHBOARDUSER(userData);
        const token = (0, jwt_1.encodeJwt)({ id: newUser._id }, '1d');
        newUser.accessToken = token;
        newUser.lastLogin = new Date();
        yield newUser.save({ session });
        data = {
            status: 200,
            message: auth_message_1.messages.success,
            accessToken: token,
            newUser: newUser,
        };
        yield session.commitTransaction();
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
        if (session)
            yield session.abortTransaction();
    }
    finally {
        if (session)
            session.endSession();
    }
    if (error) {
        log4_1.Logger.error(error);
        return Promise.reject(error);
    }
    else {
        return Promise.resolve(data);
    }
});
exports.register = register;
const login = (user, email) => __awaiter(void 0, void 0, void 0, function* () {
    let error, session, data;
    try {
        log4_1.Logger.info('login User');
        session = yield models_1.DASHBOARDUSER.startSession();
        session.startTransaction();
        const token = (0, jwt_1.encodeJwt)({ id: user._id }, '1d');
        const updateUser = yield models_1.DASHBOARDUSER.findOneAndUpdate({ email }, {
            $set: {
                accessToken: token,
                lastLogin: new Date(),
            },
        }, { new: true }).select('-password');
        if (!updateUser) {
            throw (0, apiErrorHandler_1.dataNotExistException)(errorMessage_1.MESSAGES.notFound, 'unknown.User.Not.Found');
        }
        // Get the companyId from the user document
        // const companyId = user.companyId;
        // if (!companyId) {
        //   throw dataNotExistException(MESSAGES.notFound, 'unknown.Company.Not.Found');
        // }
        // // Find the company details using the companyId
        // const companyDetails = await COMPANY.findById(companyId);
        // if (!companyDetails) {
        //   throw dataNotExistException(MESSAGES.notFound, 'unknown.Company.Not.Found');
        // }
        data = {
            status: 200,
            message: auth_message_1.messages.success,
            accessToken: token,
            updateUser,
            // companyDetails, // Include company details in the response
        };
        yield session.commitTransaction();
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
        if (session)
            yield session.abortTransaction();
    }
    finally {
        if (session)
            session.endSession();
    }
    if (error) {
        log4_1.Logger.error(error);
        return Promise.reject(error);
    }
    else {
        return Promise.resolve(data);
    }
});
exports.login = login;
const updateProfile = (_id, name, phone, email) => __awaiter(void 0, void 0, void 0, function* () {
    let error, session, data;
    try {
        log4_1.Logger.info("updating profile ");
        session = yield models_1.DASHBOARDUSER.startSession();
        session.startTransaction();
        const id = Object(`${_id}`);
        const isUser = yield models_1.DASHBOARDUSER.findById(id);
        if (!isUser) {
            throw (0, apiErrorHandler_1.dataNotExistException)(errorMessage_1.MESSAGES.notFound, 'user.not.found');
        }
        if (name) {
            isUser.name = name;
        }
        if (email) {
            isUser.email = email;
        }
        yield isUser.save({ session });
        data = {
            status: 200,
            message: auth_message_1.messages.success,
            user: isUser
        };
        yield session.commitTransaction();
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
        if (session)
            yield session.abortTransaction();
    }
    finally {
        if (session)
            session.endSession();
    }
    if (error) {
        log4_1.Logger.error(error);
        return Promise.reject(error);
    }
    else {
        return Promise.resolve(data);
    }
});
exports.updateProfile = updateProfile;
const changePassword = (_id, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    let error, session, data;
    try {
        log4_1.Logger.info("updating profile ");
        session = yield models_1.DASHBOARDUSER.startSession();
        session.startTransaction();
        const id = Object(`${_id}`);
        const isUser = yield models_1.DASHBOARDUSER.findById(id);
        if (!isUser) {
            throw (0, apiErrorHandler_1.dataNotExistException)(errorMessage_1.MESSAGES.notFound, 'user.not.found');
        }
        if (newPassword) {
            isUser.password = newPassword;
        }
        yield isUser.save({ session });
        data = {
            status: 200,
            message: auth_message_1.messages.success,
            user: isUser
        };
        yield session.commitTransaction();
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
        if (session)
            yield session.abortTransaction();
    }
    finally {
        if (session)
            session.endSession();
    }
    if (error) {
        log4_1.Logger.error(error);
        return Promise.reject(error);
    }
    else {
        return Promise.resolve(data);
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=auth.service.js.map