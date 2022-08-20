import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { IRequestUserToken } from '../interfaces/Interfaces';
import ThrowErrors from './ThrowErros';

const secret = process.env.JWT_SECRET || 'secret';

const tokenMiddleware = (req: IRequestUserToken, _res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) throw new ThrowErrors('unauthorizedError', 'Token must be a valid token');

  const token = auth.includes('Bearer') ? auth.split(' ')[1] : auth;

  /* a respeito da function dentro do verify
  https://stackoverflow.com/questions/51849010/json-web-token-verify-return-jwt-malformed
  */
  verify(token, secret, { complete: true }, (err, decoded) => {
    if (err) throw new ThrowErrors('unauthorizedError', 'Token must be a valid token');
    req.user = decoded;
  });

  next();
};

export default tokenMiddleware;
