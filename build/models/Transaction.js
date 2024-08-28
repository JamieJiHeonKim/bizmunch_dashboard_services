"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    companyId: { type: String, required: true },
    userId: { type: String, required: true },
    productName: { type: String, required: true },
    productCost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    profit: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    discount: { type: Number, default: 0 }
}, { timestamps: true });
exports.Transaction = (0, mongoose_1.model)('Transaction', transactionSchema);
//# sourceMappingURL=Transaction.js.map