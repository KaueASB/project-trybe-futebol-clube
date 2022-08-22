import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

export default class LeaderboardController {
  static async getHomeLeaderboard(_req: Request, res: Response) {
    const homeLeaderboard = await LeaderboardService.getHomeMatches();
    const sorted = LeaderboardService.sortedMatches(homeLeaderboard);
    res.status(200).json(sorted);
  }

  static async getAwayLeaderboard(_req: Request, res: Response) {
    const awayLeaderboard = await LeaderboardService.getAwayMatches();
    const sorted = LeaderboardService.sortedMatches(awayLeaderboard);
    res.status(200).json(sorted);
  }

  static async getGeneralLeaderboard(_req: Request, res: Response) {
    const leaderBoardGeneral = await LeaderboardService.getGeneralMatches();
    const sorted = LeaderboardService.sortedMatches(leaderBoardGeneral);
    res.status(200).json(sorted);
  }
}
