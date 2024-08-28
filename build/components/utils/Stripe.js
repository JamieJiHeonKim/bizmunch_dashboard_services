"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const env_1 = require("../../middleware/env");
const stripe = new stripe_1.default(env_1.STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
    typescript: true,
});
exports.default = stripe;
//# sourceMappingURL=Stripe.js.map