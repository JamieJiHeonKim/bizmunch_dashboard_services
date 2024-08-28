import { Logger } from "../../../middleware/log4";
import { HttpException ,badImplementationException, dataNotExistException,validationException} from "../../utils/apiErrorHandler";
import { COMPANY, DASHBOARDUSER} from '../../../models'
import { dashboardUserDocument } from '../../../@types/models';
const { ObjectId } = require('mongodb');
import {
  ADMIN_NOT_FOUND,
  EMAIL_EXIST, INVALID_RESET_TOKEN, MESSAGES,
  // EMAIL_NOT_VERIFIED
} from '../../../constants/errorMessage';
import {encodeJwt } from '../../utils/jwt';
import { sendMessage } from '../../utils/sgMailer';
import { ForgotPasswordMessage, VerifyEMailMessage, messages } from './auth.message';
import { LENGTH_ID } from '../../../constants/rules';
import { generateToken } from '../../utils/genToken';
import { __ } from "i18n";
import {  SENDGRID_EMAIL_SENDER } from '../../../middleware/env';
import { getRefreshToken, getToken } from "../../utils/Authenticate";
import { generateBrowserToken } from "../../utils/browserToken";


export const register = async (email:string, password:string, name:string, companyId:string, status:string) => {
  let error: Error | HttpException | undefined, session, data: any;
  try {
    Logger.info("Register User");
    session = await DASHBOARDUSER.startSession();
    session.startTransaction();

    let userData = {
      email: email,
      password: password,
      name: name,
      companyId: companyId,
      status:status
    }

    const newUser = new DASHBOARDUSER(userData);

    const token: any = encodeJwt({ id: newUser._id }, '1d');

    newUser.accessToken = token;
    newUser.lastLogin = new Date();

    await newUser.save({ session });

    data = {
      status: 200,
      message: messages.success,
      accessToken: token,
      newUser: newUser,
    };

    await session.commitTransaction();
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
    if (session) await session.abortTransaction();
  } finally {
    if (session) session.endSession();
  }
  if (error) {
    Logger.error(error);
    return Promise.reject(error);
  } else {
    return Promise.resolve(data);
  }
};

export const login = async (user: dashboardUserDocument, email: string) => {
  let error: Error | HttpException | undefined, session, data: any;
  try {
    Logger.info('login User');
    session = await DASHBOARDUSER.startSession();
    session.startTransaction();

    const token: any = encodeJwt({ id: user._id }, '1d');

    const updateUser = await DASHBOARDUSER.findOneAndUpdate(
      { email },
      {
        $set: {
          accessToken: token,
          lastLogin: new Date(),
        },
      },
      { new: true }
    ).select('-password');

    if (!updateUser) {
      throw dataNotExistException(MESSAGES.notFound, 'unknown.User.Not.Found');
    }

    // Get the companyId from the user document
    // const companyId = user.companyId;
    // if (!companyId) {
    //   throw dataNotExistException(MESSAGES.notFound, 'unknown.Company.Not.Found');
    // }

    // // Find the company details using the companyId
    // const companyDetails = await COMPANY.findById(companyId);
    // if (!companyDetails) {
    //   throw dataNotExistException(MESSAGES.notFound, 'unknown.Company.Not.Found');
    // }

    data = {
      status: 200,
      message: messages.success,
      accessToken: token,
      updateUser,
      // companyDetails, // Include company details in the response
    };
    await session.commitTransaction();
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
    if (session) await session.abortTransaction();
  } finally {
    if (session) session.endSession();
  }
  if (error) {
    Logger.error(error);
    return Promise.reject(error);
  } else {
    return Promise.resolve(data);
  }
};

export const updateProfile = async (_id:string , name:string , phone:string , email:string) => {
   let error: Error | HttpException | undefined, session, data: any;
  try {
    Logger.info("updating profile ");
    session = await DASHBOARDUSER.startSession();
    session.startTransaction();

    const id = Object(`${_id}`)

    const isUser = await DASHBOARDUSER.findById(id)
    if (!isUser) {
      throw dataNotExistException(MESSAGES.notFound,'user.not.found');
    }

    if (name) {
      isUser.name = name;
    }

    if (email) {
      isUser.email = email;
    }

    await isUser.save({ session });


    data = {
      status: 200,
      message: messages.success,
      user:isUser
    };

  await session.commitTransaction();
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
    if (session) await session.abortTransaction();
  } finally {
    if (session) session.endSession();
  }
  if (error) {
    Logger.error(error);
    return Promise.reject(error);
  } else {
    return Promise.resolve(data);
  }
};

export const changePassword = async (_id:string , newPassword:string ) => {
   let error: Error | HttpException | undefined, session, data: any;
  try {
    Logger.info("updating profile ");
    session = await DASHBOARDUSER.startSession();
    session.startTransaction();

    const id = Object(`${_id}`)

    const isUser = await DASHBOARDUSER.findById(id)
    if (!isUser) {
      throw dataNotExistException(MESSAGES.notFound,'user.not.found');
    }


    if (newPassword) {
      isUser.password = newPassword;
    }

    await isUser.save({ session });


    data = {
      status: 200,
      message: messages.success,
      user:isUser
    };

  await session.commitTransaction();
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
    if (session) await session.abortTransaction();
  } finally {
    if (session) session.endSession();
  }
  if (error) {
    Logger.error(error);
    return Promise.reject(error);
  } else {
    return Promise.resolve(data);
  }
};