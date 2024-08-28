import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { restaurantDocument } from '../@types/models';

const restaurantSchema = new Schema(
  {
    restaurantId: { type: Number, index: 1 },
    name: { type: String, required: true, unique: true },
    location: { type: String, required: true },
    managerName: { type: String, required: true, unique: false },
    managerEmail: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    logo: { type: String , required: true },
    barcode: { type: String, required: true },
    menuId: {type: Schema.Types.ObjectId, ref: 'Menu'},
  },
  { timestamps: true },
);

restaurantSchema.index({ name: 1 });

restaurantSchema.plugin(mongoosePaginate);

export const Restaurant = model<restaurantDocument>('Restaurant', restaurantSchema);
