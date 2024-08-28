"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISABLE_DATES_TIME_SLOTS = exports.RESERVATION_TIME_SLOTS = exports.USER_EXPERIENCES = exports.USER_GENDERS = exports.USER_TYPES = exports.USER_STATUSES = exports.MONTHS = exports.DATE = exports.TIMEZONE = exports.SALON_STATUSES = exports.RESET_TOKEN_TYPES = exports.POINT_TYPES = exports.USAGE_TYPES = exports.RESERVATION_CANCEL_EVENT_CAUSES = exports.RESERVATION_CANCEL_EVENT_REASONS = exports.RESERVATION_STATUSES = exports.PERCENTAGE_OPTIONS = exports.DISCOUNTS = exports.EXTRACHARGES = exports.SERVICE_FEE = exports.SALES_TAX = exports.DISCOUNT_TIME = exports.PAYMENT_STATUSES = exports.PAYMENT_METHODS = exports.BOOTH_TYPES = exports.BOOTH_STATUSES = exports.ADMIN_AUTHORITY_TYPE_LABELS = exports.KM_TO_METER = exports.POINT_EXPIRED_DATE = exports.LENGTH_LICENSE_NUMBER_MAX = exports.LENGTH_URL_MAX = exports.LENGTH_ZIPCODE = exports.LENGTH_ID = exports.LENGTH_NUMBER_MIN = exports.LENGTH_UPPERCASE_MIN = exports.LENGTH_LOWERCASE_MIN = exports.LENGTH_NAME_MAX = exports.LENGTH_NAME_MIN = exports.LENGTH_PASSWORD_MAX = exports.LENGTH_PASSWORD_MIN = exports.LENGTH_EMAIL_MAX = exports.ADMIN_EMAIL = void 0;
const japan_1 = require("./language/japan");
exports.ADMIN_EMAIL = 'ua1265513@gmail.com';
// Length Related
exports.LENGTH_EMAIL_MAX = 255;
exports.LENGTH_PASSWORD_MIN = 8;
exports.LENGTH_PASSWORD_MAX = 255;
exports.LENGTH_NAME_MIN = 3;
exports.LENGTH_NAME_MAX = 255;
exports.LENGTH_LOWERCASE_MIN = 1;
exports.LENGTH_UPPERCASE_MIN = 1;
exports.LENGTH_NUMBER_MIN = 1;
exports.LENGTH_ID = 7;
exports.LENGTH_ZIPCODE = 7;
exports.LENGTH_URL_MAX = 2048;
exports.LENGTH_LICENSE_NUMBER_MAX = 255;
exports.POINT_EXPIRED_DATE = 180;
// Distance Related
exports.KM_TO_METER = 1000;
// Admin Related
exports.ADMIN_AUTHORITY_TYPE_LABELS = [
    japan_1.ADMIN_SUPER_PRIVILEGE,
];
// Booth Related
exports.BOOTH_STATUSES = [japan_1.BOOTH_STATUS_AVAILABLE, japan_1.BOOTH_STATUS_NOT_AVAILABLE, japan_1.BOOTH_STATUS_APPLIED];
exports.BOOTH_TYPES = [
    japan_1.BOOTH_TYPE_OTHER,
    japan_1.BOOTH_TYPE_OPEN,
    japan_1.BOOTH_TYPE_PRIVATE,
    japan_1.BOOTH_TYPE_SEMIPRIVATE,
    japan_1.BOOTH_TYPE_ALLINPRIVATE,
];
// Payment Related
exports.PAYMENT_METHODS = [japan_1.PAYMENT_METHOD_PAYJP, japan_1.PAYMENT_METHOD_PAYPAY];
exports.PAYMENT_STATUSES = [
    japan_1.PAYMENT_STATUS_PROCEED,
    japan_1.PAYMENT_STATUS_SUCCESS,
    japan_1.PAYMENT_STATUS_REFUND,
    japan_1.PAYMENT_STATUS_CANCEL,
];
// Price Related
exports.DISCOUNT_TIME = {
    startTime: '22:00:00',
    endTime: '10:00:00',
};
exports.SALES_TAX = { add: 1.0, extract: 0.0 };
exports.SERVICE_FEE = { add: 1.15, extract: 0.15 };
exports.EXTRACHARGES = [
    { name: '0%', add: 1.0, extract: 0.0 },
    { name: '10%', add: 1.1, extract: 0.1 },
    { name: '20%', add: 1.2, extract: 0.2 },
    { name: '30%', add: 1.3, extract: 0.3 },
    { name: '40%', add: 1.4, extract: 0.4 },
    { name: '50%', add: 1.5, extract: 0.5 },
    { name: '60%', add: 1.6, extract: 0.6 },
    { name: '70%', add: 1.7, extract: 0.7 },
    { name: '80%', add: 1.8, extract: 0.8 },
    { name: '90%', add: 1.9, extract: 0.9 },
    { name: '100%', add: 2.0, extract: 1.0 },
];
exports.DISCOUNTS = [
    { name: '0%', add: 1.0, extract: 0.0 },
    { name: '10%', add: 0.9, extract: 0.1 },
    { name: '20%', add: 0.8, extract: 0.2 },
    { name: '30%', add: 0.7, extract: 0.3 },
    { name: '40%', add: 0.6, extract: 0.4 },
    { name: '50%', add: 0.5, extract: 0.5 },
    { name: '60%', add: 0.4, extract: 0.6 },
    { name: '70%', add: 0.3, extract: 0.7 },
    { name: '80%', add: 0.2, extract: 0.8 },
    { name: '90%', add: 0.1, extract: 0.9 },
    { name: '100%', add: 0.0, extract: 1.0 },
];
exports.PERCENTAGE_OPTIONS = ['0%', '10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
// Reservation Related
exports.RESERVATION_STATUSES = [
    japan_1.RESERVEATION_STATUS_UNDER_RESERVATION,
    japan_1.RESERVEATION_STATUS_PROGRESS,
    japan_1.RESERVEATION_STATUS_USED,
    japan_1.RESERVEATION_STATUS_CANCELED,
    japan_1.RESERVATION_STATUS_APPLY,
];
exports.RESERVATION_CANCEL_EVENT_REASONS = [
    japan_1.RESERVATION_CANCEL_EVENT_REASON_0,
    japan_1.RESERVATION_CANCEL_EVENT_REASON_1,
    japan_1.RESERVATION_CANCEL_EVENT_REASON_2,
    japan_1.RESERVATION_CANCEL_EVENT_REASON_3,
    japan_1.RESERVATION_CANCEL_EVENT_REASON_4,
    japan_1.RESERVATION_CANCEL_EVENT_REASON_5,
    japan_1.RESERVATION_CANCEL_EVENT_REASON_6,
];
exports.RESERVATION_CANCEL_EVENT_CAUSES = [
    japan_1.RESERVATION_CANCEL_EVENT_CAUSE_0,
    japan_1.RESERVATION_CANCEL_EVENT_CAUSE_1,
    japan_1.RESERVATION_CANCEL_EVENT_CAUSE_2,
    japan_1.RESERVATION_CANCEL_EVENT_CAUSE_3,
    japan_1.RESERVATION_CANCEL_EVENT_CAUSE_4,
];
exports.USAGE_TYPES = [japan_1.USAGE_TYPE_RESERVATION, japan_1.USAGE_TYPE_BONUS, japan_1.USAGE_TYPE_CHARGE, japan_1.USAGE_TYPE_REFUND];
exports.POINT_TYPES = [japan_1.POINT_TYPE_USE, japan_1.POINT_TYPE_CHARGE];
// Reset Token Related
exports.RESET_TOKEN_TYPES = [japan_1.RESET_TOKEN_TYPES_RESET_PASSWORD, japan_1.RESET_TOKEN_TYPES_ADMIN_REGISTRATION_CONFIRM_ADMIN];
// Salon Related
exports.SALON_STATUSES = [japan_1.SALON_STATUS_PUBLIC, japan_1.SALON_STATUS_PRIVATE, japan_1.SALON_STATUS_DELETE, japan_1.SALON_STATUS_APPLY];
// Time Related
exports.TIMEZONE = 'Asia/Tokyo';
exports.DATE = 'YYYY-MM-DD';
exports.MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
// User Related
exports.USER_STATUSES = [japan_1.USER_STATUS_APPLYING, japan_1.USER_STATUS_ALLOWED, japan_1.USER_STATUS_STOPPED];
exports.USER_TYPES = [japan_1.USER_TYPE_STYLIST, japan_1.USER_TYPE_BARBER, japan_1.USER_TYPE_SPALIST, japan_1.USER_TYPE_NAILIST];
exports.USER_GENDERS = [japan_1.USER_GENDER_MAN, japan_1.USER_GENDER_WOMAN, japan_1.USER_GENDER_AGENDER];
exports.USER_EXPERIENCES = [
    japan_1.USER_EXPERIENCE_1,
    japan_1.USER_EXPERIENCE_2,
    japan_1.USER_EXPERIENCE_3,
    japan_1.USER_EXPERIENCE_4,
    japan_1.USER_EXPERIENCE_5,
];
exports.RESERVATION_TIME_SLOTS = [
    '0:00',
    '0:30',
    '1:00',
    '1:30',
    '2:00',
    '2:30',
    '3:00',
    '3:30',
    '4:00',
    '4:30',
    '5:00',
    '5:30',
    '6:00',
    '6:30',
    '7:00',
    '7:30',
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
    '22:00',
    '22:30',
    '23:00',
    '23:30',
];
exports.DISABLE_DATES_TIME_SLOTS = [
    '0:00',
    '1:00',
    '2:00',
    '3:00',
    '4:00',
    '5:00',
    '6:00',
    '7:00',
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
];
//# sourceMappingURL=rules.js.map