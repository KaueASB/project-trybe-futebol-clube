import { Request, Response } from 'express';
import MatchService from '../services/Match.service';

export default class MatchController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const matchesFilter = await MatchService.getProgress(inProgress === 'true');
      return res.status(200).json(matchesFilter);
    }
    const allMatches = await MatchService.getAll();
    res.status(200).json(allMatches);
  }
}
