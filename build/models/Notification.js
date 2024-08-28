"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
// Notification schema
const notificationSchema = new mongoose_1.Schema({
    company: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });
notificationSchema.plugin(mongoose_paginate_v2_1.default);
exports.Notification = (0, mongoose_1.model)('Notification', notificationSchema);
//# sourceMappingURL=Notification.js.map