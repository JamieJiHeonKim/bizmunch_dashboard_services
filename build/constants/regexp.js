"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGEXP_DATETIME = exports.REGEXP_CHILD_PASSWORD = exports.REGEXP_PASSWORD = exports.REGEXP_TWO_DIGITS = exports.REGEXP_BIRTH = exports.REGEXP_NAME = void 0;
/**
 * @description Check kana
 */
/* eslint-disable no-irregular-whitespace */
exports.REGEXP_NAME = /^[ァ-ンヴー　]*$/;
/**
 * @description YYYY-MM-DD
 */
exports.REGEXP_BIRTH = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/;
/**
 * @description NN
 */
exports.REGEXP_TWO_DIGITS = /^\d{2}$/;
/**
 * @description At least one special char, one lowercase, one uppercase, one number
 */
exports.REGEXP_PASSWORD = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// Must contain at least 1 Upper, 1 Lower, 1 Numeric and min 6 and 256 max
exports.REGEXP_CHILD_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,256}$/;
/**
 * @description YYYY-MM-DD HH:MM:SS+HH:MM
 */
exports.REGEXP_DATETIME = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])T(0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d(\+|-)(0\d|1\d|2[0-3]):[0-5]\d$/;
//# sourceMappingURL=regexp.js.map