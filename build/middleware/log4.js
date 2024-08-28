"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const Log4js = __importStar(require("log4js"));
const fast_safe_stringify_1 = __importDefault(require("fast-safe-stringify"));
const config = {
    appenders: {
        access: {
            type: 'dateFile',
            filename: 'logs/access/access.json',
            layout: { type: 'json', separator: ',' },
        },
        error: {
            type: 'dateFile',
            filename: 'logs/error/error.json',
            layout: { type: 'json', separator: ',' },
        },
        system: {
            type: 'dateFile',
            filename: 'logs/system/system.json',
            layout: { type: 'json', separator: ',' },
        },
        console: {
            type: 'console',
        },
        stdout: {
            type: 'stdout',
        },
    },
    categories: {
        default: {
            appenders: ['access', 'console'],
            level: 'INFO',
            enableCallStack: true,
        },
        access: {
            appenders: ['access', 'console'],
            level: 'INFO',
            enableCallStack: true,
        },
        system: {
            appenders: ['system', 'console'],
            level: 'ALL',
            enableCallStack: true,
        },
        error: {
            appenders: ['error', 'console'],
            level: 'WARN',
            enableCallStack: true,
        },
    },
};
class Logger {
    static initialize() {
        Log4js.addLayout('json', (config) => {
            return (logEvent) => (0, fast_safe_stringify_1.default)(logEvent) + config.separator;
        });
        Log4js.configure(config);
    }
    static access() {
        const logger = Log4js.getLogger('access');
        return Log4js.connectLogger(logger, {});
    }
    static info(message) {
        const logger = Log4js.getLogger('system');
        logger.info(message);
    }
    static warn(message) {
        const logger = Log4js.getLogger('warn');
        logger.warn(message);
    }
    static error(message) {
        const logger = Log4js.getLogger('error');
        logger.error(message);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=log4.js.map