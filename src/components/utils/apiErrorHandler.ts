/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Logger } from '../../middleware/log4';
import * as ERROR from '../../constants/errorMessage';

export class HttpException extends Error {
  statusCode?: number;
  message: string;
  errorMessage: string;
  subStatusCode?: number|string;

  constructor(statusCode: number, message: string, subStatusCode: any) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
    this.errorMessage = message;
    this.subStatusCode = subStatusCode;
  }
}

export const validationException = (errors: any,subStatusCode? :number|string) => {
  errors ? Logger.error(errors) : Logger.error("Invalid Value");
  return new HttpException(400,errors?.errors?.[0]?.msg ||errors, errors?.errors?.[0]?.msg || subStatusCode || 1001);
};

export const dataNotExistException = (error: any,subStatusCode? :number|string) => {
  error ? Logger.error(error) : Logger.error(ERROR.DATANOTFOUND);
  return new HttpException(400, error.message || ERROR.DATANOTFOUND,  subStatusCode || 1002);
};

export const userNotActivateException = (error: any) => {
  error ? Logger.error(error) : Logger.error(ERROR.USERNOTACTIVATE);
  return new HttpException(400, error.message || ERROR.USERNOTACTIVATE, 1003);
};

export const dataExceedException = (error: any) => {
  error ? Logger.error(error) : Logger.error(ERROR.DATAEXCEED);
  return new HttpException(400, error.message || ERROR.DATAEXCEED, 1004);
};

export const payjpInvalidCardException = (error: any) => {
  error ? Logger.error(error) : Logger.error(ERROR.PAYJP_INVALID_CARD);
  return new HttpException(400, ERROR.PAYJP_INVALID_CARD, 1005);
};

export const unauthorizedException = (error: any) => {
  error ? Logger.error(error) : Logger.error(ERROR.UNAUTH);
  return new HttpException(401, error.message || ERROR.UNAUTH, 2001);
};
export const dataConflictException = (error : any, subStatusCode? :number|string) => {
  error ? Logger.error(error) : Logger.error(ERROR.CONFLICT);

  return new HttpException(409, error || error.message || ERROR.CONFLICT,  subStatusCode || 3001);
};
export const emailConflictException = (error: any) => {
  error ? Logger.error(error) : Logger.error(ERROR.CONFLICT);
  return new HttpException(409, error.message || ERROR.CONFLICT, 2002);
};

export const pageNoFoundException = (error: any) => {
  error ? Logger.error(error) : Logger.error(ERROR.PAGENOTFOUND);
  return new HttpException(404, error.message || ERROR.PAGENOTFOUND, 4000);
};

export const badImplementationException = (error: any) => {
  error ? Logger.error(error) : Logger.error(ERROR.BADIMPLEMENTATION);
  return new HttpException(500, error.message || ERROR.BADIMPLEMENTATION, 5000);
};
