import { Response, Request } from 'express';
import { IRequestUserToken } from '../interfaces/Interfaces';

import UserService from '../services/User.service';
import validation from '../services/validations';

export default class UserController {
  static async validateRole(req: IRequestUserToken, res: Response) {
    res.status(200).json({ role: req.user?.payload.role });
  }

  static async login(req: Request, res: Response) {
    await validation.login(req.body);
    const token = await UserService.login(req.body);
    res.status(200).json({ token });
  }
}
