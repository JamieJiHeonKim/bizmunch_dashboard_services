import { Schema, model } from 'mongoose';

const menuItemSchema = new Schema({
  price: { type: String, required: true },
  calories: { type: String, required: true },
  ingredients: { type: [String], required: true },
});

const menuSchema = new Schema({
  restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  restaurantName: { type: String, required: true },
  menu: {
    type: Object,
    default: {},
  },
}, { timestamps: true });

export const Menu = model('Menu', menuSchema, 'menus');
