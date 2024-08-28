import { Schema, model } from 'mongoose';
import { transactionDocument} from '../@types/models';

const transactionSchema = new Schema(
  {
    companyId: { type: String, required: true },
    userId: { type: String, required: true },
    productName: { type: String, required: true },
    productCost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    profit: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    discount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Transaction = model('Transaction', transactionSchema);
