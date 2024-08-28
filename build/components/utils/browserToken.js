"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBrowserToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const randomstring_1 = __importDefault(require("randomstring"));
const generateBrowserToken = () => {
    const randomstring = randomstring_1.default.generate(10);
    const secretKey = crypto_1.default.createHash('sha256').update(randomstring).digest('hex');
    return secretKey;
};
exports.generateBrowserToken = generateBrowserToken;
//# sourceMappingURL=browserToken.js.map