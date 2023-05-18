import {Request, Response, NextFunction} from 'express';
import {verify, VerifyErrors} from 'jsonwebtoken';

import {appConfig} from '../../config/config';
import {ApiResponse} from '../../api/interface';

export const verifyJWT = (req: Request, _: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const result: ApiResponse = {
    statusCode: 0,
    message: '',
    data: null,
  };

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    verify(token, appConfig.jwtSecret, (err: VerifyErrors | null) => {
      if (err) {
        result.statusCode = 403;
        result.message = 'authorization failed';
        result.data = 'jwt failed';
        throw next(result);
      }
      next();
    });
  } else {
    result.statusCode = 401;
    result.message = 'unauthorized';
    result.data = 'jwt failed';
    throw next(result);
  }
};
