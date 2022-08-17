import { Response, Request } from 'express';
import validation from '../services/validations';

export default class LoginController {
  login = async (req: Request, res: Response) => {
    const isValid = await validation.login(req.body);

    res.status(200).json(isValid);
  };
}
