import { Router } from 'express';
import tokenMiddleware from '../middlewares/tokkenMiddleware';
import UserController from '../controllers/User.controller';

const route = Router();

route.post('/', UserController.login);
route.get('/validate', tokenMiddleware, UserController.validateRole);

export default route;
