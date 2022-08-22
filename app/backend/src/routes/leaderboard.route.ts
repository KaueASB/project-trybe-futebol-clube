import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

const route = Router();

route.get('/home', LeaderboardController.getHomeLeaderboard);
route.get('/away', LeaderboardController.getAwayLeaderboard);
route.get('/', LeaderboardController.getGeneralLeaderboard);

export default route;
