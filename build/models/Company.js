"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const companySchema = new mongoose_1.Schema({
    companyId: { type: Number, index: 1 },
    name: { type: String, required: true, unique: true },
    domain: { type: String, required: false, unique: false },
    location: { type: String, required: true },
    invitationCode: { type: String, required: true },
    managerName: { type: String, required: true, unique: false },
    managerEmail: { type: String, required: true, unique: true },
    numberOfEmployees: { type: Number, required: false, unique: false },
    billingCycle: { type: Date, required: true },
    monthlyCost: { type: Number, required: true, get: (v) => parseFloat(v.toFixed(2)) },
    status: { type: String, required: true, default: 'active' }
}, { timestamps: true });
companySchema.index({ name: 1 });
companySchema.plugin(mongoose_paginate_v2_1.default);
exports.Company = (0, mongoose_1.model)('Company', companySchema);
//# sourceMappingURL=Company.js.map