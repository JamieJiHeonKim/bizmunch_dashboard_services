
import jwt from 'jsonwebtoken';
import { INVALID_JWT_TOKEN } from '../../constants/errorMessage';
import { JWT_SECRET } from '../../middleware/env';
import { validationException } from './apiErrorHandler';

// const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt
import { dashboardUserDocument } from '../../@types/models';

export const encodeJwt = (payload: string | Record<string, unknown> | Buffer, expiresIn: string | number) => {
  const jwtoken = jwt.sign({ payload }, JWT_SECRET, { expiresIn });
  return jwtoken;
};

export const decodeJwt = (jwtoken: string) => {
  try {
    const decode = jwt.verify(jwtoken, JWT_SECRET);

    if (typeof decode === 'string') throw validationException(INVALID_JWT_TOKEN);

    return Promise.resolve(decode);
  } catch (err) {
    return Promise.reject(err);
  }
};






// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
// export const jwtTOKEN=function(passport:any){
//   const opts = {
//     jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey :JWT_SECRET
//     }
    
//   passport.use(
//     'jwt-admin',
//     new JwtStrategy(opts, function (jwt_payload:{_id:string,type:string}, done:any) {
//       // Check against the DB only if necessary.
//       // This can be avoided if you don't want to fetch user details in each request.
//       console.log(jwt_payload,"jwt_payload")
//       if (jwt_payload.type=="admin") {
//         ADMIN.findOne({ _id: jwt_payload._id }, function (err:any, user:any) {
//           if (err) {
//             return done(err, false)
//           }
//           if (user) {
//             return done(null, user)
//           } else {
//             return done(null, false)
//             // or you could create a new account
//           }
//         })
//       } else{
//         return done(null, false)
//       }
//     }
//   ))  
//   // passport.use(
//   //   'jwt-parent',
//   //   new JwtStrategy(opts, function (jwt_payload:{_id:string,type:string}, done:any) {
//   //     // Check against the DB only if necessary.
//   //     // This can be avoided if you don't want to fetch user details in each request.
//   //     if (jwt_payload.type=="parent") {
//   //       Parent.findById(jwt_payload._id, ( err: any, user: ParentDocument) => {
//   //         if (err) {
//   //           return done(err, false)
//   //         }
//   //         if (user) {
//   //           return done(null, user)
//   //         } else {
//   //           return done(null, false)
//   //           // or you could create a new account
//   //         }
//   //       });
//   //     }
//   //     else{
//   //       return done(null, false)
//   //     }
//   //   }
//   // ))  
//   // passport.use(
//   //   'jwt-children',
//   //   new JwtStrategy(opts, function (jwt_payload:{_id:string,type:string}, done:any) {
//   //     if (jwt_payload.type=="child") {
//   //       Child.findById(jwt_payload._id, (err: any, user: ChildDocument) => {
//   //         if (err) {
//   //           return done(err, false)
//   //         }
//   //         if (user) {
//   //           return done(null, user)
//   //         } else {
//   //           return done(null, false)
//   //           // or you could create a new account
//   //         }
//   //       });
//   //     }
//   //     else {
//   //       return done(null, false)
//   //     }
//   //   }
//   // ))  
// }