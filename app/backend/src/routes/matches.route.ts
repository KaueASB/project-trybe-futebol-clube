import { Router } from 'express';
import tokenMiddleware from '../middlewares/tokkenMiddleware';
import MatchController from '../controllers/Match.controller';

const router = Router();

router.patch('/:id/finish', MatchController.finishMatch);

router.patch('/:id', MatchController.updateMatch);

router.post('/', tokenMiddleware, MatchController.addMatch);

router.get('/', MatchController.getAll);

export default router;
