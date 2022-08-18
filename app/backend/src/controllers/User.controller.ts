import { Response, Request } from 'express';

import UserService from '../services/User.service';
import validation from '../services/validations';

export default class UserController {
  static async login(req: Request, res: Response) {
    await validation.login(req.body);
    const token = await UserService.login(req.body);
    res.status(200).json({ token });
  }
}
