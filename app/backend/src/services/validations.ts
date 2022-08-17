import Joi = require('joi');
import { ILogin } from '../interfaces/ILogin';

const validation = {
  async login(body: ILogin) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().min(6).required(),
    });

    const result = await schema.validateAsync(body);
    return result;
  },
};

export default validation;
