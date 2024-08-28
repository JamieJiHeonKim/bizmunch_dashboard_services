import { Request, Response, NextFunction } from "express";
import { dashboardUserDocument } from '../../../@types/models';
import * as service from "./auth.service";
import {
  HttpException,
  badImplementationException,
} from "../../utils/apiErrorHandler";

import { Logger } from "../../../middleware/log4";

export const register = async (req: Request,res: Response,next: NextFunction) => {
  try {
    Logger.info(req.body);
    const { name, email, password, companyId, status} = req.body;
    const registerUser = await service.register(email, password, name, companyId, status);
    res.status(200).json({ message: registerUser });
  } catch (err) {
    next(err);
  }
};

export const login = async ( req: Request, res: Response,next: NextFunction) => {
  try {
    Logger.info(req.body);
    const user = req.user as dashboardUserDocument;
    const {email} = req.body
    const loginUser = await service.login(user , email);
    res.status(200).json(loginUser);
  } catch (err) {
    next(err)
  }
};

export const updateProfile = async ( req: Request, res: Response, next: NextFunction) => {
  try{
    Logger.info(req.body);
    const {name,phone,email } = req.body;
    const {_id} = req?.user as dashboardUserDocument
    const data = await service.updateProfile(_id,name,phone,email );
    res.status(200).json(data);
    } catch (err) {
      next(err);
    }
}

export const changePassword = async ( req: Request, res: Response, next: NextFunction) => {
  try{
    Logger.info(req.body);
    const {newPassword } = req.body;
    const {_id} = req?.user as dashboardUserDocument
    const data = await service.changePassword(_id,newPassword );
    res.status(200).json(data);
    } catch (err) {
      next(err);
    }
}