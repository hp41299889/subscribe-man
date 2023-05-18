import {NextFunction, Request, Response} from 'express';
import {hash} from 'bcrypt';

import {loggerFactory, response} from '../../util';
import * as userInterface from './interface';
import * as userModel from './model';
import {ApiResponse} from '../interface';

const logger = loggerFactory('Api user');

export const postUser = async (
  req: Request<{}, {}, userInterface.PostUser>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.debug('post user');
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    const createUserDto: userInterface.CreateUserDto = {
      ...req.body,
      password: await hashPassword(req.body.password),
    };
    const user = await userModel.createUser(createUserDto);
    result.statusCode = 201;
    result.message = 'post user success';
    result.data = {
      id: user.id,
      email: user.email,
      name: user.name,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    response(res, result);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request<{id: string}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result: ApiResponse = {
      statusCode: 200,
      message: '',
      data: null,
    };
    logger.debug('get user by id');
    const {id} = req.params;
    const user = await userModel.readUserById(Number(id));
    result.message = 'get user by id success';
    result.data = user;
    response(res, result);
  } catch (err) {
    next(err);
  }
};

const hashPassword = async (p: string): Promise<string> => {
  const salt = 10;
  return await hash(p, salt);
};
