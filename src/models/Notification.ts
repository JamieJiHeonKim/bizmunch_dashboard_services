import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { notificationDocument } from '../@types/models';

// Notification schema
const notificationSchema = new Schema(
  {
    company: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

notificationSchema.plugin(mongoosePaginate);

export const Notification = model('Notification', notificationSchema);
