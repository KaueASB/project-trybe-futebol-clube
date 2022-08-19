import { Router } from 'express';
import TeamController from '../controllers/Team.controller';

const route = Router();

route.get('/:id', TeamController.getOne);
route.get('/', TeamController.getAll);

export default route;
