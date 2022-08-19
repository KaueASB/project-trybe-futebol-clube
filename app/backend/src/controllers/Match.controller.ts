import { Request, Response } from 'express';
import MatchService from '../services/Match.service';

export default class MatchController {
  static async getAll(_req: Request, res: Response) {
    const allMatches = await MatchService.getAll();
    res.status(200).json(allMatches);
  }
}
