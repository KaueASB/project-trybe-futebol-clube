import Joi = require('joi');
import ThrowErrors from '../middlewares/ThrowErros';
import { ILogin } from '../interfaces/Interfaces';

const validation = {
  async login(body: ILogin) {
    try {
      const schema = Joi.object({
        email: Joi.string().required().email().messages({
          'string.email': 'All fields must be filled',
        }),
        password: Joi.string().min(7).required(),
      });

      const result = await schema.validateAsync(body);
      return result;
    } catch (error) {
      throw new ThrowErrors('validationError', 'All fields must be filled');
    }
  },
};

export default validation;
