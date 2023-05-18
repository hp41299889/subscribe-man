import {Router} from 'express';

import {getUserById, postUser} from './service';
import {httpMiddleware} from '../../middleware';

const {verifyJWT} = httpMiddleware;

export const userRouter = Router();

userRouter.route('/').post(postUser);

userRouter.route('/:id').get(verifyJWT, getUserById);
