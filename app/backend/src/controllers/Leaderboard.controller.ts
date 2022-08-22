import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  static async getHomeMatches(_req: Request, res: Response) {
    const homeTeam = await LeaderboardService.getHomeMatches();
    const sorted = LeaderboardService.sortedMatches(homeTeam);
    res.status(200).json(sorted);
  }
}
