import { getToken, getRefreshToken } from './Authenticate';
import passport from 'passport';
import passportLocal from 'passport-local';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../middleware/log4';
import { unauthorizedException } from './apiErrorHandler';
// import { AdminDocument , dashboardUserDocument } from '../../@types/models';
import { dashboardUserDocument } from '../../@types/models';
import {
  ADMIN_BOOTH_PRIVILEGE_APPLYING,
  ADMIN_SUPER_PRIVILEGE,
  USER_STATUS_ALLOWED,
} from '../../constants/language/japan';
import { ADMIN_AUTHORITY_TYPE_LABELS, USER_STATUSES } from '../../constants/rules';
// import {  ADMIN} from '../../models';
import {
  ADMIN_APPLYING,
  ADMIN_NOT_FOUND,
  EMAIL_NOT_MATCH,
  PASSWORD_NOT_MATCH,
  UNAUTH,
  USER_NOT_EXIST,
} from '../../constants/errorMessage';
import { JWT_SECRET } from '../../middleware/env';


import {Strategy as JwtStrategy} from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';


const LocalStrategy = passportLocal.Strategy;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// passport.serializeUser((user: any, done) => {
//   // Logger.info('serializeUser' + user);
//   done(undefined, { id: user._id, type: user.type });
// });

// passport.deserializeUser((user: { _id: string; type:string }, done) => {
//   console.log('deserializeUser', user);
//   if (user.type=="admin") {
//     Admin.findById(user._id, (err: any, admin: AdminDocument) => {
//       done(err, admin);
//     });
//   } else if (user.type=="child") {
//     Child.findById(user._id, (err: any, user: ChildDocument) => {
//       done(err, user);
//     });
//   }
//   else if (user.type=="parent") {
//     Parent.findById(user._id, (
//       err: any,
//       user: ParentDocument,
//     ) => {
//       done(err, user);
//     });
//   }
//   else {
//     done(null, null);
//   }

// });





// passport.use(
//   'local-parent',
//   new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
//     Logger.info({ message: 'passport for user', email, password });
//     Parent.findOne({ email }, (err: any, user: ParentDocument) => {
//       if (err) {
//         Logger.info(err);
//         return done(err);
//       }

//       if (!user) {
//         Logger.error('user is not defined.');
//         return done(undefined, false, {
//           message: EMAIL_NOT_MATCH,
//         });
//       }
//       user.comparePassword(password, (err: Error, isMatch: boolean) => {
//         if (err) {
//           Logger.error(err);
//           return done(err);
//         }

//         if (isMatch) {
//           return done(null, user);
//         }
//         return done(undefined, false, { message: PASSWORD_NOT_MATCH });
//       });
//     });
//   }),
// );
// passport.use(
//   'local-child',
//   new LocalStrategy({ usernameField: 'loginId', passwordField: 'password' }, async (loginId, password, done) => {
//     Logger.info({ message: 'passport for user', loginId, password });
//     Child.findOne({ loginId }, (err: any, user: ParentDocument) => {
//       if (err) {
//         Logger.info(err);
//         return done(err);
//       }

//       if (!user) {
//         Logger.error('user is not defined.');
//         return done(undefined, false, {
//           message: EMAIL_NOT_MATCH,
//         });
//       }
//       user.comparePassword(password, (err: Error, isMatch: boolean) => {
//         if (err) {
//           Logger.error(err);
//           return done(err);
//         }

//         if (isMatch) {
//           return done(null, user);
//         }
//         return done(undefined, false, { message: PASSWORD_NOT_MATCH }); 
//       });
//     });
//   }),
// );

// passport.use(
//   'local-admin',
//   new LocalStrategy({ usernameField: 'userName', passwordField: 'password' }, async (userName, password, done) => {
//     Logger.info({ message: 'passport for admin', userName, password });
    
//     ADMIN.findOne({ userName }, (err: any, admin: AdminDocument) => {
//       if (err) {
//         Logger.info(err);
//         return done(err);
//       }

//       if (!admin) {
//         Logger.error('admin is not defined.');
//         return done(undefined, false, {
//           message: EMAIL_NOT_MATCH,
//         });
//       }
//       admin.comparePassword(password, (err: Error, isMatch: boolean) => {
//         if (err) {
//           Logger.error(err);
//           return done(err);
//         }

//         if (isMatch) {
//           return done(null, admin);
//         }
//         return done(undefined, false, { message: PASSWORD_NOT_MATCH });
//       });
//     });
//   }),
// );

/**
 * @description authenticate user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// export const parentAuthenticate = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate('local-parent', async (err, user, info) => {
//     try {
//       if (err) throw unauthorizedException(err);
//       if (!user) throw unauthorizedException(new Error(info.message));

//       const u = await Parent.findOne({ parent_id: user.parent_id }, { password: 0 });
//       if (!u) throw unauthorizedException(new Error(USER_NOT_EXIST));

//       if (u) {
//         req.login(u, (err) => {
//           if (err) throw unauthorizedException(err);

//           req.user = u;
//           next();
//         });
//       } else {
//         throw unauthorizedException(info);
//       }
//     } catch (err) {
//       next(err);
//     }
//   })(req, res, next);
// };
/**
 * @description authenticate user
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// export const childAuthenticate = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate('local-child', async (err, user, info) => {
//     try {
//       if (err) throw unauthorizedException(err);
//       if (!user) throw unauthorizedException(new Error(info.message));

//       const u = await Child.findOne({ child_id: user.child_id }, { password: 0 });
//       if (!u) throw unauthorizedException(new Error(USER_NOT_EXIST));

//       if (u) {
//         req.login(u, (err) => {
//           if (err) throw unauthorizedException(err);
//           req.user = u;
//           next();
//         });
//       } else {
//         throw unauthorizedException(info);
//       }
//     } catch (err) {
//       next(err);
//     }
//   })(req, res, next);
// };

/**
 * @description authenticate admin with email and password
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// export const adminAuthenticate = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate('local-admin', async (err:any, user:any, info:any) => {
//     try {
//       if (err) throw unauthorizedException(err);
//       if (!user) throw unauthorizedException(new Error(info.message));

//       const admin = await ADMIN.findOne({ adminId: user.adminId }, { password: 0 });
//       if (!admin) throw unauthorizedException(new Error(ADMIN_NOT_FOUND));

//       if (user) {
//         console.log("user", user);
//         if (admin.privilege == "admin") {
//           req.login(user, (err) => {
//             if (err) throw unauthorizedException(err);

            
//             req.user = admin;
//             next();
//           });
//         } else {
//           throw unauthorizedException(new Error(ADMIN_APPLYING));
//         }
//       } else {
//         throw unauthorizedException(info);
//       }
//     } catch (err) {
//       next(err);
//     }
//   })(req, res, next);
// };



