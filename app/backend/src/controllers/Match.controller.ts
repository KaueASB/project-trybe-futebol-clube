import { Request, Response } from 'express';
import validation from '../services/validations';
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

  static async addMatch(req: Request, res: Response) {
    await MatchService.existTeams(req.body);
    const createdMatch = await MatchService.addMatch(req.body);
    res.status(201).json(createdMatch);
  }

  static async finishMatch(req: Request, res: Response) {
    const { id } = await validation.params(req.params);
    await MatchService.getOne(id);
    await MatchService.finishMatch(id);
    res.status(200).json({ message: 'Finished' });
  }

  static async updateMatch(req: Request, res: Response) {
    const { id } = await validation.params(req.params);
    await MatchService.getOne(id);
    await MatchService.updateMatch(id, req.body);
    res.status(200).json({ message: 'Match updated' });
  }
}
