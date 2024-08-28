import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { companyDocument } from '../@types/models';

const companySchema = new Schema(
  {
    companyId: { type: Number, index: 1 },
    name: { type: String, required: true, unique: true },
    domain: { type: String, required: false, unique: false },
    location: { type: String, required: true },
    invitationCode: { type: String, required: true },
    managerName: { type: String, required: true, unique: false },
    managerEmail: { type: String, required: true, unique: true },
    numberOfEmployees: { type: Number, required: false, unique: false },
    billingCycle: { type: Date, required: true },
    monthlyCost: { type: Number, required: true, get: (v: number) => parseFloat(v.toFixed(2)) },
    status: { type: String, required: true, default: 'active' }
  },
  { timestamps: true },
);

companySchema.index({ name: 1 });

companySchema.plugin(mongoosePaginate);

export const Company = model<companyDocument>('Company', companySchema);
