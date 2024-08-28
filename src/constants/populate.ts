import { BOOTH_STATUS_AVAILABLE } from './language/japan';
import { BOOTH_STATUSES } from './rules';

export const POPULATE_ADMIN = {
  path: 'admin',
  select: { password: 0 },
};

export const POPULATE_USER = {
  path: 'user',
  select: { password: 0 },
};

export const POPULATE_SALON = {
  path: 'salon',
  match: { deletedAt: null },
};

export const POPULATE_SALON_AND_ADMIN = {
  path: 'salon',
  match: { deletedAt: null },
  populate: POPULATE_ADMIN,
};

export const POPULATE_BOOTH = {
  path: 'booths',
  match: { deletedAt: null },
  options: { sort: { name: 1 } },
};

export const POPULATE_BOOTH_USER = {
  path: 'booths',
  match: { deletedAt: null, status: BOOTH_STATUSES.indexOf(BOOTH_STATUS_AVAILABLE) },
  options: { sort: { name: 1 } },
};

export const POPULATE_BOOTH_AND_SALON = {
  path: 'booth',
  match: { deletedAt: null },
  populate: POPULATE_SALON,
};
