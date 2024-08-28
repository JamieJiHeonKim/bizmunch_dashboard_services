"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restaurant = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const restaurantSchema = new mongoose_1.Schema({
    restaurantId: { type: Number, index: 1 },
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    managerName: { type: String, required: true, unique: false },
    managerEmail: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    logo: { type: String, required: true },
    barcode: { type: String, required: true },
    menuId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Menu' },
}, { timestamps: true });
restaurantSchema.index({ name: 1 });
restaurantSchema.plugin(mongoose_paginate_v2_1.default);
exports.Restaurant = (0, mongoose_1.model)('Restaurant', restaurantSchema);
//# sourceMappingURL=Restaurant.js.map