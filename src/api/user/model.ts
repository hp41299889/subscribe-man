import {QueryFailedError} from 'typeorm';
import {postgres} from '../../database';

import {loggerFactory} from '../../util';
import {userEntity} from './entity';
import {CreateUserDto, PostUser, User} from './interface';
import {ApiResponse} from '../interface';

const logger = loggerFactory('Model user');
const repository = postgres.getRepository(userEntity);

export const createUser = async (dto: CreateUserDto): Promise<User> => {
  try {
    logger.debug('create user');
    return await repository.save(dto);
  } catch (err) {
    const result: ApiResponse = {
      statusCode: 500,
      message: '',
      data: null,
    };
    if (err instanceof QueryFailedError && err.message.includes('UQ_')) {
      result.statusCode = 400;
      result.message = 'Database error';
      result.data = 'Duplicate key error: Email already exists';
      throw result;
    } else {
      console.error(err);
      throw err;
    }
  }
};

export const readUserByEmailWithPassword = async (email: string) => {
  logger.debug('read user by email with password');
  return await repository.findOne({
    where: {
      email: email,
    },
    select: ['email', 'password'],
  });
};

export const readUserById = async (id: number) => {
  logger.debug('read user by id');
  return await repository.findOne({
    where: {
      id: id,
    },
  });
};
