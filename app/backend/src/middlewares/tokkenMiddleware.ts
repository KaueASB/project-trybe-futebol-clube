import { NextFunction, Response } from 'express';
import { IRequestUserToken } from '../interfaces/Interfaces';
import UserService from '../services/User.service';

const tokenMiddleware = async (req: IRequestUserToken, res: Response, _next: NextFunction) => {
  const tokenHeader: string | undefined = req.headers.authorization;
  const tokenValid = UserService.validateToken(tokenHeader);
  req.user = tokenValid;

  res.status(200).json({ role: tokenValid.payload.role });
};

export default tokenMiddleware;
