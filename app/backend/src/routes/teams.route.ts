import { Router } from 'express';
import TeamController from '../controllers/Teams.controller';

const route = Router();

route.get('/', TeamController.getAll);

export default route;
