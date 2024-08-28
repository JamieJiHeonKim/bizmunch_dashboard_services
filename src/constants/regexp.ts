/**
 * @description Check kana
 */
/* eslint-disable no-irregular-whitespace */
export const REGEXP_NAME = /^[ァ-ンヴー　]*$/;
/**
 * @description YYYY-MM-DD
 */
export const REGEXP_BIRTH = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/;
/**
 * @description NN
 */
export const REGEXP_TWO_DIGITS = /^\d{2}$/;
/**
 * @description At least one special char, one lowercase, one uppercase, one number
 */
export const REGEXP_PASSWORD =/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// Must contain at least 1 Upper, 1 Lower, 1 Numeric and min 6 and 256 max
export const REGEXP_CHILD_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,256}$/;
/**
 * @description YYYY-MM-DD HH:MM:SS+HH:MM
 */
export const REGEXP_DATETIME =
  /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])T(0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d(\+|-)(0\d|1\d|2[0-3]):[0-5]\d$/;
