import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { validationException } from './apiErrorHandler';

export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  !errors.isEmpty() ? next(validationException(errors)) : next();
};
