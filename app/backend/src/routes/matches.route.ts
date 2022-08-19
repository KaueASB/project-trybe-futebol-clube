import { Router } from 'express';
import tokenMiddleware from '../middlewares/tokkenMiddleware';
import MatchController from '../controllers/Match.controller';

const route = Router();

// route.get('/:id', MatchController.getOne);
route.post('/', tokenMiddleware, MatchController.addMatch);
route.get('/', MatchController.getAll);

export default route;
