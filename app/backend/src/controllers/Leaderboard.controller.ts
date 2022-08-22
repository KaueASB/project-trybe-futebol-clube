import { Response } from 'express';
import { IReqQuery } from '../interfaces/Interfaces';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  static async getHomeMatches(_req: IReqQuery, res: Response) {
    const homeLeaderboard = await LeaderboardService.getHomeMatches();
    const sorted = LeaderboardService.sortedMatches(homeLeaderboard);
    res.status(200).json(sorted);
  }

  static async getAwayMatches(_req: IReqQuery, res: Response) {
    const awayLeaderboard = await LeaderboardService.getAwayMatches();
    const sorted = LeaderboardService.sortedMatches(awayLeaderboard);
    res.status(200).json(sorted);
  }
}
