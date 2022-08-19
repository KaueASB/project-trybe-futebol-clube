import { NextFunction, Response } from 'express';
import { IRequestUserToken } from '../interfaces/Interfaces';
import UserService from '../services/User.service';

const tokenMiddleware = (req: IRequestUserToken, _res: Response, next: NextFunction) => {
  const tokenHeader: string | undefined = req.headers.authorization;
  const tokenValid = UserService.validateToken(tokenHeader);
  req.user = tokenValid;
  next();
};

export default tokenMiddleware;
