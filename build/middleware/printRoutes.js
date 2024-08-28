"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printRoutes = void 0;
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const log4_1 = require("./log4");
const printRoutes = (app) => {
    const routesInfo = (0, express_list_endpoints_1.default)(app);
    for (const route of routesInfo) {
        log4_1.Logger.info(`${route.methods}: ${route.path}`);
        const middlewares = [];
        for (const middleware of route.middlewares) {
            if (middleware !== 'middleware')
                middlewares.push(middleware);
        }
        if (middlewares.length)
            log4_1.Logger.warn(`Middlewares: ${middlewares}\n`);
    }
};
exports.printRoutes = printRoutes;
//# sourceMappingURL=printRoutes.js.map