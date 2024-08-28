"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POPULATE_BOOTH_AND_SALON = exports.POPULATE_BOOTH_USER = exports.POPULATE_BOOTH = exports.POPULATE_SALON_AND_ADMIN = exports.POPULATE_SALON = exports.POPULATE_USER = exports.POPULATE_ADMIN = void 0;
const japan_1 = require("./language/japan");
const rules_1 = require("./rules");
exports.POPULATE_ADMIN = {
    path: 'admin',
    select: { password: 0 },
};
exports.POPULATE_USER = {
    path: 'user',
    select: { password: 0 },
};
exports.POPULATE_SALON = {
    path: 'salon',
    match: { deletedAt: null },
};
exports.POPULATE_SALON_AND_ADMIN = {
    path: 'salon',
    match: { deletedAt: null },
    populate: exports.POPULATE_ADMIN,
};
exports.POPULATE_BOOTH = {
    path: 'booths',
    match: { deletedAt: null },
    options: { sort: { name: 1 } },
};
exports.POPULATE_BOOTH_USER = {
    path: 'booths',
    match: { deletedAt: null, status: rules_1.BOOTH_STATUSES.indexOf(japan_1.BOOTH_STATUS_AVAILABLE) },
    options: { sort: { name: 1 } },
};
exports.POPULATE_BOOTH_AND_SALON = {
    path: 'booth',
    match: { deletedAt: null },
    populate: exports.POPULATE_SALON,
};
//# sourceMappingURL=populate.js.map