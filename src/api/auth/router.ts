import {Router} from 'express';

import {login} from './service';

export const authRouter = Router();

authRouter.route('/login').post(login);
