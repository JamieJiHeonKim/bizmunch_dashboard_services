"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJwt = exports.encodeJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorMessage_1 = require("../../constants/errorMessage");
const env_1 = require("../../middleware/env");
const apiErrorHandler_1 = require("./apiErrorHandler");
// const passport = require("passport")
const JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt;
const encodeJwt = (payload, expiresIn) => {
    const jwtoken = jsonwebtoken_1.default.sign({ payload }, env_1.JWT_SECRET, { expiresIn });
    return jwtoken;
};
exports.encodeJwt = encodeJwt;
const decodeJwt = (jwtoken) => {
    try {
        const decode = jsonwebtoken_1.default.verify(jwtoken, env_1.JWT_SECRET);
        if (typeof decode === 'string')
            throw (0, apiErrorHandler_1.validationException)(errorMessage_1.INVALID_JWT_TOKEN);
        return Promise.resolve(decode);
    }
    catch (err) {
        return Promise.reject(err);
    }
};
exports.decodeJwt = decodeJwt;
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
//# sourceMappingURL=jwt.js.map