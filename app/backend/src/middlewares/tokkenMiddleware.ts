import { NextFunction, Response } from 'express';
// import { Jwt, verify } from 'jsonwebtoken';
import UserService from '../services/User.service';
import { IRequestUserToken } from '../interfaces/Interfaces';
import ThrowErrors from './ThrowErros';

// const secret = process.env.JWT_SECRET || 'secret';

const tokenMiddleware = (req: IRequestUserToken, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) throw new ThrowErrors('unauthorizedError', 'Token must be a valid token');

  const token = auth.includes('Bearer') ? auth.split(' ')[1] : auth;
  const data = UserService.validateToken(token);
  req.user = data;

  next();
};

export default tokenMiddleware;
