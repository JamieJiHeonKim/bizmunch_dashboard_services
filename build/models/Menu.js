"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const mongoose_1 = require("mongoose");
const menuItemSchema = new mongoose_1.Schema({
    price: { type: String, required: true },
    calories: { type: String, required: true },
    ingredients: { type: [String], required: true },
});
const menuSchema = new mongoose_1.Schema({
    restaurantId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    restaurantName: { type: String, required: true },
    menu: {
        type: Object,
        default: {},
    },
}, { timestamps: true });
exports.Menu = (0, mongoose_1.model)('Menu', menuSchema, 'menus');
//# sourceMappingURL=Menu.js.map