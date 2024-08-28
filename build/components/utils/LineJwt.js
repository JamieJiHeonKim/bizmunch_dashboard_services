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
exports.LineJwt = void 0;
const env_1 = require("../../middleware/env");
const private_key_1 = require("./../../constants/private.key");
let jose = require('node-jose');
const LineJwt = () => __awaiter(void 0, void 0, void 0, function* () {
    let header = {
        alg: "RS256",
        typ: "JWT",
        kid: env_1.LINE_KID
    };
    let payload = {
        iss: "1657747186",
        sub: "1657747186",
        aud: "https://api.line.me/",
        exp: Math.floor(new Date().getTime() / 1000) + 60 * 30,
        token_exp: 60 * 60 * 24 * 30
    };
    let lineJwt = yield jose.JWS.createSign({ format: 'compact', fields: header }, private_key_1.privateKey)
        .update(JSON.stringify(payload))
        .final();
    return lineJwt;
});
exports.LineJwt = LineJwt;
//# sourceMappingURL=LineJwt.js.map