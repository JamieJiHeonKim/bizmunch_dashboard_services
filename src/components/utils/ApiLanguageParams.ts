import { IS_PRODUCTION } from '../../middleware/env';
import { lang } from './../../@types/lang.d';

import {Request,Response,NextFunction} from 'express';

// this method is used to get the language params for the api calls

// this method is used to get the language params for the api calls

export const ApiLanguageParams = (req: Request, res: Response, next: NextFunction) => {
    const { language } = req.query;
    
    if (!language || (language!=='en' && language!=='ja' || !IS_PRODUCTION)) {
        req.query.language = 'ja';
    }
    next();
    }
