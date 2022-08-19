import { Router } from 'express';
import MatchController from '../controllers/Match.controller';

const route = Router();

// route.get('/:id', MatchController.getOne);
route.get('/', MatchController.getAll);

export default route;
