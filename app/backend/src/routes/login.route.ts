import { Router } from 'express';
import UserController from '../controllers/User.controller';

const route = Router();

route.post('/', UserController.login);

export default route;
