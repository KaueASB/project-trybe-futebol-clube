import * as bcrypt from 'bcryptjs';
import { Jwt, sign, SignOptions, verify } from 'jsonwebtoken';

import { IUserNoPass, ILogin } from '../interfaces/Interfaces';
import ThrowErrors from '../middlewares/ThrowErros';
import User from '../database/models/User';

const secret = process.env.JWT_SECRET || 'secret';

export default class UserService {
  static createToken(payload: IUserNoPass) {
    const config: SignOptions = {
      expiresIn: '2d',
      algorithm: 'HS256',
    };
    const token = sign(payload, secret, config);
    return token;
  }

  static async login({ email, password }: ILogin) {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) throw new ThrowErrors('unauthorizedError', 'Incorrect email or password');

    const passValid = await bcrypt.compare(password, user.password);
    if (!passValid) throw new ThrowErrors('unauthorizedError', 'Incorrect email or password');

    const { password: pass, ...payload } = user;
    const token = UserService.createToken(payload);

    return token;
  }

  static validateToken(tokenHeader: string): Jwt {
    try {
      const data = verify(tokenHeader, secret, { complete: true });
      return data as Jwt;
    } catch (error) {
      throw new ThrowErrors('jsonWebTokenError', 'Token must be a valid token');
    }
  }
}
