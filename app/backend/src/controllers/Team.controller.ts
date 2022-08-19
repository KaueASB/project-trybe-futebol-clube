import { Response, Request } from 'express';
import validation from '../services/validations';

import TeamService from '../services/Team.service';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const response = await TeamService.getAll();
    res.status(200).json(response);
  }

  static async getOne(req: Request, res: Response) {
    const { id } = await validation.params(req.params);
    const response = await TeamService.getById(Number(id));
    res.status(200).json(response);
  }
}
