import { Response, Request } from 'express';

import TeamService from '../services/Team.service';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const response = await TeamService.getAll();
    res.status(200).json(response);
  }
}
