import passport from "passport"
import { encodeJwt } from "./jwt"
const jwt = require("jsonwebtoken")
const dev = process.env.NODE_ENV !== "production"

export const COOKIE_OPTIONS = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  maxAge: 60 * 60 * 24 * 30 * 1000,

}

export const COOKIE_OPTIONS_PARENT = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  maxAge: 60 * 60 * 24 * 365 * 1000,
}


export const getToken = (user:any) => {
  return jwt.sign({...user,tokenType:"accessToken"}, process.env.JWT_SECRET, {
    expiresIn: "24h",
  })
}

export const getTokenParent = (user:any) => {
  return jwt.sign({...user,tokenType:"accessToken"}, process.env.JWT_SECRET, {
    expiresIn: "90d",
  })
}
export const getRefreshTokenParent = (user:any) => {
  const refreshToken = jwt.sign({...user,tokenType:"refresh"}, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "365d" // 30 days,
  }) 
  return refreshToken
}

export const getRefreshToken = (user: any) => {
  return encodeJwt({ ...user, tokenType: "refresh" }, "90d");
};

export const  verifyAdmin = passport.authenticate("jwt-admin", { session: false }) 
export const  verifyParent = passport.authenticate("jwt-parent", { session: false }) 
export const  verifyChildren = passport.authenticate("jwt-children", { session: false }) 
