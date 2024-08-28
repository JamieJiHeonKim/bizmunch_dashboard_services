import { Request, Response, NextFunction } from 'express';
import {
  unauthorizedException
} from '../components/utils/apiErrorHandler';
import { decodeJwt } from '../components/utils/jwt';
import { DASHBOARDUSER } from '../models';
import { Logger } from './log4';


export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearer = req.headers['authorization'];
    if (!bearer) {
      throw unauthorizedException('user not authorized');
    }
    const token = bearer.split(' ')[1];
    const decoded = await decodeJwt(token as string);
    if (!decoded) {
      throw unauthorizedException('user not authorized');
    }
    const { id } = decoded.payload;
    const user = await DASHBOARDUSER.findById(id);
    if (!user) {
      throw unauthorizedException('user not authorized');
    }
    req.user = user;
    next();
  } catch (err) {
    Logger.error(err);
    next(err);
  }
};