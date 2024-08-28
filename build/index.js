"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const components_1 = require("./components");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
(0, middleware_1.config)(app);
(0, components_1.registerComponents)(app);
(0, middleware_1.errorHandler)(app);
const server = app.listen(process.env.PORT || 3001, function () {
    // const port = server.address().port
    console.log("App started at port:", process.env.PORT || 3001);
});
exports.default = app;
//# sourceMappingURL=index.js.map