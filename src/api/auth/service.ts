import {NextFunction, Request, Response} from 'express';
import {compare} from 'bcrypt';
import {sign} from 'jsonwebtoken';

import {loggerFactory} from '../../util';
import * as authInterface from './interface';
import {userModel} from '../user';
import {appConfig} from '../../config/config';
import {ApiResponse} from '../interface';

const logger = loggerFactory('Api auth');

export const login = async (
  req: Request<{}, {}, authInterface.PostLogin>,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.debug('post login');
    const result: ApiResponse = {
      statusCode: 0,
      message: '',
      data: null,
    };
    const {email, password} = req.body;
    const user = await userModel.readUserByEmailWithPassword(email);
    if (!user) {
      result.statusCode = 401;
      result.message = 'authentication failed';
      result.data = 'invalid email';
      throw next(result);
    }
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      result.statusCode = 401;
      result.message = 'authentication failed';
      result.data = 'password incorrect';
      throw next(result);
    }
    const jwt = sign({id: user.id}, appConfig.jwtSecret, {expiresIn: '1h'});
    result.statusCode = 200;
    result.message = 'ogin success';
    result.data = {
      jwt: jwt,
    };
    next(result);
  } catch (err) {
    next(err);
  }
};

const comparePassword = async (
  input: string,
  hashed: string
): Promise<boolean> => {
  return await compare(input, hashed);
};
