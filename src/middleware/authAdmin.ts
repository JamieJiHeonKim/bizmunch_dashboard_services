import { Request, Response, NextFunction } from 'express';
import {
  unauthorizedException
} from '../components/utils/apiErrorHandler';
import { decodeJwt } from '../components/utils/jwt';
// import {  ADMIN } from '../models';
import { Logger } from './log4';
const jwt = require('jsonwebtoken');
const { CognitoIdentityServiceProvider } = require('aws-sdk');
import { userPool } from "../components/utils/cognito";
const CognitoExpress = require('cognito-express')



// export const cognitoExpress = new CognitoExpress({
// 	region: process.env.AWS_REGION ,
// 	cognitoUserPoolId: process.env.USER_POOL_ID,
// 	tokenUse: "access", //Possible Values: access | id
// 	tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
// });



export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearer = req.headers['authorization'];
    if (!bearer) {
      throw unauthorizedException('Admin not authorized');
    }
    const token = bearer.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Decode the token to get the payload
    const decodedToken = jwt.decode(token, { complete: true });
    if (!decodedToken || !decodedToken.payload.exp || Date.now() >= decodedToken.payload.exp * 1000) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }

      // Get the user from Cognito
      const cognito = new CognitoIdentityServiceProvider({
        region: process.env.REGION,
      });
      cognito.getUser({ AccessToken: token }, (err:Error | null, data : any) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ message: 'Access denied. Invalid token.' });
        }
        // Attach the user to the request object
        req.user = data.UserAttributes;
        next();
      });

    next();
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};

