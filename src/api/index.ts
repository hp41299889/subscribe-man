import {authRouter} from './auth';
import {Routers} from './interface';
import {userRouter, userInterface, userModel} from './user';
export {userInterface, userModel};

export const routers: Routers = {
  user: userRouter,
  auth: authRouter,
};
