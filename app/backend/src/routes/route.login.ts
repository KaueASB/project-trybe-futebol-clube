import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const loginController = new LoginController();

const route = Router();

route.get('/login', loginController.login);

export default route;
