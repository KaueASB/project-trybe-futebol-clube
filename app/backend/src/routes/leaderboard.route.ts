import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const route = Router();

route.get('/home', LeaderboardController.getHomeMatches);
// route.get('/home', LeaderboardController.getByTypeTeam);

export default route;
