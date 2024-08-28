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
exports.sendMessage = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const env_1 = require("../../middleware/env");
const log4_1 = require("../../middleware/log4");
mail_1.default.setApiKey(env_1.SEND_GRID_API_KEY);
/**
 * @description Mail内容を元にメールを送信
 * @param message
 * @returns Promise<any>
 */
const sendMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let isSend = yield mail_1.default.send(message);
        log4_1.Logger.info('Email was sent.');
        return Promise.resolve(isSend);
    }
    catch (err) {
        log4_1.Logger.error(err);
        return Promise.reject(err);
    }
});
exports.sendMessage = sendMessage;
//# sourceMappingURL=sgMailer.js.map