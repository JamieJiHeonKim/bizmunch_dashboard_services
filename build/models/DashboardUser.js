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
exports.DashboardUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const dashboardUserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    companyId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Company', required: true },
    status: { type: String, enum: ['employee', 'manager', 'admin'] },
    accessToken: { type: String },
    lastLogin: { type: Date },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    deletedAt: { type: Date },
}, { timestamps: true });
dashboardUserSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hash = bcryptjs_1.default.hashSync(user.password, 10);
        user.password = hash;
        next();
    }
    catch (err) {
        next(err);
    }
});
dashboardUserSchema.pre('findOneAndUpdate', function findOneAndUpdate(next) {
    try {
        const data = this.getUpdate();
        if (data) {
            const password = data.$set.password;
            if (password) {
                this.setOptions({});
                const hash = bcryptjs_1.default.hashSync(password, 10);
                this.setUpdate(Object.assign(Object.assign({}, data.$set), { password: hash }));
            }
        }
        next();
    }
    catch (err) {
        return next(err);
    }
});
const comparePassword = function (candidatePassword, cb) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isMatch = bcryptjs_1.default.compareSync(candidatePassword, this.password);
            cb(null, isMatch);
        }
        catch (err) {
            cb(err, false);
        }
    });
};
dashboardUserSchema.methods.comparePassword = comparePassword;
dashboardUserSchema.set("toJSON", {
    transform: function (doc, ret, options) {
        delete ret.refreshToken;
        return ret;
    },
});
dashboardUserSchema.plugin(mongoose_paginate_v2_1.default);
exports.DashboardUser = (0, mongoose_1.model)('Dashboard.Users', dashboardUserSchema);
//# sourceMappingURL=DashboardUser.js.map