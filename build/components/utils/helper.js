"use strict";
// import { ClientSession } from 'mongoose';
// import {
//   RESERVATION_STATUSES,
//   KM_TO_METER,
//   DISCOUNTS,
//   EXTRACHARGES,
//   SALES_TAX,
//   SERVICE_FEE,
//   USER_STATUSES,
//   USER_TYPES,
//   SALON_STATUSES,
//   BOOTH_STATUSES,
// } from '../../constants/rules';
// import { Logger } from '../../middleware/log4';
// import {   Admin } from '../../models';
// import { AdminFilter, UserFilter } from './@types';
// import { dataConflictException, dataNotExistException, validationException } from './apiErrorHandler';
// import { getNextMonth, getStartOf, getTime, getTimeDifference, getTotalPrices } from './dayjs';
// import { GeoDocument } from '../../@types/index';
// import {
//   BOOTH_STATUS_AVAILABLE,
//   RESERVATION_STATUS_APPLY,
//   RESERVEATION_STATUS_CANCELED,
//   RESERVEATION_STATUS_PROGRESS,
//   RESERVEATION_STATUS_UNDER_RESERVATION,
//   RESERVEATION_STATUS_USED,
//   SALON_STATUS_PUBLIC,
//   USER_STATUS_APPLYING,
// } from '../../constants/language/japan';
// import { BOOTH_NOT_EXIST, DISABLE_DATE_EXIST, RESERVATION_ALREADY_EXIST } from '../../constants/errorMessage';
// export const checkDisabledDate = async (
//   boothId: string,
//   startTime: string,
//   endTime: string,
//   session: ClientSession,
// ) => {
//   try {
//     const disabledDates = await BoothDisabledDate.find(
//       { boothId, startTime: { $gte: new Date(startTime), $lt: new Date(endTime) } },
//       {},
//       { session },
//     );
//     Logger.error({ message: 'disableDates', disabledDates });
//     if (disabledDates.length) throw dataConflictException(new Error(DISABLE_DATE_EXIST));
//     const reservations = await BoothReservation.find(
//       { boothId, startTime: { $gte: new Date(startTime), $lt: new Date(endTime) } },
//       {},
//       { session },
//     );
//     Logger.error({ message: 'reservations', reservations });
//     if (reservations.length) throw dataConflictException(new Error(RESERVATION_ALREADY_EXIST));
//     return Promise.resolve();
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };
// export const getPriceDetail = async (boothId: string, startTime: string, endTime: string, keepLocalTime?: boolean) => {
//   const start = getTime(startTime, keepLocalTime);
//   const end = getTime(endTime, keepLocalTime);
//   const totalTime = getTimeDifference(end.format(), start.format(), 'minutes', true);
//   if (totalTime % 30 !== 0) throw validationException(new Error('Time is invalid.'));
//   const booth = await Booth.findOne({ boothId }, {}, {});
//   if (!booth) throw dataNotExistException(new Error(BOOTH_NOT_EXIST));
//   const { price, discount, extraCharge, isApplyDiscountOnWeekend } = booth;
//   const { totalBase, totalDiscount, totalExtraCharge, totalDiscountOnWeekend } = getTotalPrices(
//     startTime,
//     endTime,
//     isApplyDiscountOnWeekend,
//     keepLocalTime,
//   );
//   const totalBasePrice = Math.round(price * totalBase);
//   const totalExtraChargePrice = Math.round(price * totalExtraCharge * EXTRACHARGES[extraCharge].add);
//   const totalDiscountPrice = Math.round(price * totalDiscount * DISCOUNTS[discount].add);
//   const totalDiscountOnWeekendPrice = Math.round(
//     price * totalDiscountOnWeekend * EXTRACHARGES[extraCharge].add * DISCOUNTS[discount].add,
//   );
//   const totalPrice = Math.round(
//     totalBasePrice + totalExtraChargePrice + totalDiscountPrice + totalDiscountOnWeekendPrice,
//   );
//   const serviceFee = Math.round(totalPrice * SERVICE_FEE.extract);
//   const salesTax = Math.round(totalPrice * SALES_TAX.extract);
//   return {
//     totalTime,
//     totalSlot: totalTime / 30,
//     totalBase,
//     totalBasePrice,
//     totalExtraCharge,
//     totalExtraChargePrice,
//     totalDiscount,
//     totalDiscountPrice,
//     totalDiscountOnWeekend,
//     totalDiscountOnWeekendPrice,
//     serviceFee,
//     taxRate: Math.round(SALES_TAX.extract * 100),
//     salesTax,
//     totalCost: Math.round(totalPrice * SERVICE_FEE.add * SALES_TAX.add),
//   };
// };
// export const getPagination = (page?: string, limit?: string) => {
//   const result = { limit: limit ? (+limit > 20 ? +limit : 20) : 20, page: page ? +page : 1 };
//   Logger.info({ message: 'Pagination', pagination: result });
//   return result;
// };
// export const getSalonFilter = (location?: string[], prefecture?: string, adminId?: string) => {
//   const result = [];
//   if (location) {
//     const loc: number[] = [];
//     for (let i = 0; i < location.length; i++) {
//       const num = Number(location[i]);
//       if (!isNaN(num)) loc.push(num);
//     }
//     if (loc.length === 2)
//       result.push({
//         $geoNear: {
//           near: {
//             type: 'Point',
//             coordinates: loc,
//           },
//           distanceField: 'distance',
//           spherical: true,
//         },
//       });
//   }
//   if (prefecture) {
//     if (adminId) {
//       result.push({
//         $match: { adminId, prefecture, status: SALON_STATUSES.indexOf(SALON_STATUS_PUBLIC), deletedAt: null },
//       });
//     } else {
//       result.push({ $match: { prefecture, status: SALON_STATUSES.indexOf(SALON_STATUS_PUBLIC), deletedAt: null } });
//     }
//   } else {
//     if (adminId) {
//       result.push({ $match: { adminId, status: SALON_STATUSES.indexOf(SALON_STATUS_PUBLIC), deletedAt: null } });
//     } else {
//       result.push({ $match: { status: SALON_STATUSES.indexOf(SALON_STATUS_PUBLIC), deletedAt: null } });
//     }
//   }
//   result.push({
//     $lookup: {
//       from: Admin.collection.name,
//       localField: 'adminId',
//       foreignField: 'adminId',
//       as: 'admin',
//     },
//   });
//   result.push({ $project: { 'admin.password': 0 } });
//   result.push({
//     $lookup: {
//       from: Booth.collection.name,
//       let: { boothId: '$boothId', salonId: '$salonId' },
//       pipeline: [
//         {
//           $match: {
//             $expr: {
//               $and: [
//                 { $eq: ['$booths.boothId', '$$boothId'] },
//                 { $eq: ['$salonId', '$$salonId'] },
//                 { $eq: ['$status', BOOTH_STATUSES.indexOf(BOOTH_STATUS_AVAILABLE)] },
//               ],
//             },
//           },
//         },
//       ],
//       as: 'booths',
//     },
//   });
//   Logger.info({ message: 'Filter Salon', filter: result });
//   return result;
// };
// export const getAdminSalonFilter = (prefecture?: string, adminId?: string, status?: string) => {
//   const result = [];
//   if (prefecture) {
//     if (adminId) {
//       result.push({ $match: { adminId, prefecture, deletedAt: null } });
//     } else {
//       result.push({ $match: { prefecture, deletedAt: null } });
//     }
//   } else {
//     if (adminId) {
//       result.push({ $match: { adminId, deletedAt: null } });
//     } else {
//       result.push({ $match: { deletedAt: null } });
//     }
//   }
//   if (status !== undefined) {
//     result.push({ $match: { status: SALON_STATUSES.indexOf(status) } });
//   }
//   result.push({
//     $lookup: {
//       from: Admin.collection.name,
//       localField: 'adminId',
//       foreignField: 'adminId',
//       as: 'admin',
//     },
//   });
//   result.push({ $project: { 'admin.password': 0 } });
//   result.push({
//     $lookup: { from: Booth.collection.name, localField: 'salonId', foreignField: 'salonId', as: 'booths' },
//   });
//   result.push({ $unwind: '$admin' });
//   Logger.info({ message: 'Filter Salon', filter: result });
//   return result;
// };
// export const getReservationFilter = (
//   salonId?: string,
//   boothId?: string,
//   userId?: string,
//   startDate?: string,
//   endDate?: string,
//   reservationStatuses?: string[],
//   adminId?: string,
// ) => {
//   const result = [];
//   if (startDate && endDate) {
//     result.push({
//       $match: { startTime: { $gte: new Date(getTime(startDate).format()), $lte: new Date(getTime(endDate).format()) } },
//     });
//   } else if (startDate) {
//     result.push({
//       $match: { startTime: { $gte: new Date(getTime(startDate).format()) } },
//     });
//   } else if (endDate) {
//     result.push({
//       $match: { startTime: { $lte: new Date(getTime(endDate).format()) } },
//     });
//   }
//   if (reservationStatuses) {
//     const arr: number[] = [];
//     for (let i = 0; i < reservationStatuses.length; i++) {
//       const index = RESERVATION_STATUSES.indexOf(reservationStatuses[i]);
//       if (index !== -1) arr.push(index);
//     }
//     if (arr.length > 0) {
//       result.push({
//         $match: { status: { $in: arr } },
//       });
//     }
//   }
//   result.push({
//     $lookup: {
//       from: User.collection.name,
//       localField: 'userId',
//       foreignField: 'userId',
//       as: 'user',
//     },
//   });
//   result.push({
//     $lookup: {
//       from: Booth.collection.name,
//       localField: 'boothId',
//       foreignField: 'boothId',
//       as: 'booth',
//     },
//   });
//   result.push({
//     $lookup: {
//       from: Salon.collection.name,
//       localField: 'booth.salonId',
//       foreignField: 'salonId',
//       as: 'salon',
//     },
//   });
//   result.push({ $unwind: '$salon' });
//   result.push({ $unwind: '$user' });
//   result.push({ $unwind: '$booth' });
//   if (adminId) {
//     result.push({ $match: { 'salon.adminId': adminId } });
//   }
//   if (boothId) result.push({ $match: { boothId } });
//   if (salonId) result.push({ $match: { 'booth.salonId': salonId } });
//   if (userId) result.push({ $match: { userId } });
//   Logger.info({ message: 'Filter Reservation', filter: result });
//   return result;
// };
// export const getUpcomingReservationFilter = (userId: string) => {
//   const result = [];
//   if (userId) result.push({ $match: { userId } });
//   result.push({
//     $match: {
//       status: {
//         $in: [
//           RESERVATION_STATUSES.indexOf(RESERVATION_STATUS_APPLY),
//           RESERVATION_STATUSES.indexOf(RESERVEATION_STATUS_UNDER_RESERVATION),
//           RESERVATION_STATUSES.indexOf(RESERVEATION_STATUS_PROGRESS),
//         ],
//       },
//     },
//   });
//   result.push({
//     $lookup: {
//       from: User.collection.name,
//       localField: 'userId',
//       foreignField: 'userId',
//       as: 'user',
//     },
//   });
//   result.push({
//     $lookup: {
//       from: Booth.collection.name,
//       localField: 'boothId',
//       foreignField: 'boothId',
//       as: 'booth',
//     },
//   });
//   result.push({
//     $lookup: {
//       from: Salon.collection.name,
//       localField: 'booth.salonId',
//       foreignField: 'salonId',
//       as: 'salon',
//     },
//   });
//   result.push({ $unwind: '$salon' });
//   result.push({ $unwind: '$user' });
//   result.push({ $unwind: '$booth' });
//   Logger.info({ message: 'Filter Reservation', filter: result });
//   return result;
// };
// export const getHistoryReservationFilter = (userId: string, date: string) => {
//   const result = [];
//   const time = getTime(date);
//   const startOfMonth = getStartOf(time.format(), 'month');
//   const nextMonth = getNextMonth(time.format());
//   result.push({
//     $match: { startTime: { $gte: new Date(startOfMonth.format()), $lte: new Date(nextMonth.format()) } },
//   });
//   result.push({
//     $match: {
//       status: {
//         $in: [
//           RESERVATION_STATUSES.indexOf(RESERVEATION_STATUS_CANCELED),
//           RESERVATION_STATUSES.indexOf(RESERVEATION_STATUS_USED),
//         ],
//       },
//     },
//   });
//   result.push({
//     $lookup: {
//       from: User.collection.name,
//       localField: 'userId',
//       foreignField: 'userId',
//       as: 'user',
//     },
//   });
//   result.push({
//     $lookup: {
//       from: Booth.collection.name,
//       localField: 'boothId',
//       foreignField: 'boothId',
//       as: 'booth',
//     },
//   });
//   result.push({
//     $lookup: {
//       from: Salon.collection.name,
//       localField: 'booth.salonId',
//       foreignField: 'salonId',
//       as: 'salon',
//     },
//   });
//   result.push({ $unwind: '$salon' });
//   result.push({ $unwind: '$user' });
//   result.push({ $unwind: '$booth' });
//   Logger.info({ message: 'Filter Reservation', filter: result });
//   return result;
// };
// export const getUserFilter = (userName: string, prefecture: string, userStatuses: string[], userType: string) => {
//   const result: UserFilter = {};
//   if (userName) result.name = { $regex: new RegExp(userName), $options: 'i' };
//   if (prefecture) result.prefecture = prefecture;
//   if (userStatuses) {
//     const arr: number[] = [];
//     for (let i = 0; i < userStatuses.length; i++) {
//       const index = USER_STATUSES.indexOf(userStatuses[i]);
//       if (index !== -1) arr.push(index);
//     }
//     if (arr.length > 0) {
//       result.status = { $in: arr };
//     }
//   }
//   if (userType) result.type = { $in: [USER_TYPES.indexOf(userType)] };
//   Logger.info({ message: 'Filter User', filter: result });
//   return result;
// };
// export const getAdminFilter = () => {
//   const result: AdminFilter = { select: { password: 0 } };
//   return result;
// };
// export const getApplicantFilter = () => {
//   const result: UserFilter = {};
//   result.status = { $in: [USER_STATUSES.indexOf(USER_STATUS_APPLYING)] };
//   Logger.info({ message: 'Filter User', filter: result });
//   return result;
// };
// export const getGeoLocation = (location: number[]) => {
//   const geoLocation = <GeoDocument>{ type: 'Point', coordinates: location };
//   Logger.info({ message: 'Geo Location', geoLocation });
//   return geoLocation;
// };
//# sourceMappingURL=helper.js.map