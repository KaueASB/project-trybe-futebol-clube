import Joi = require('joi');
import ThrowErrors from '../middlewares/ThrowErros';
import { ILogin, IParamsId } from '../interfaces/Interfaces';

const validation = {
  async login(body: ILogin) {
    try {
      const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(7).required(),
      });
      const result = await schema.validateAsync(body);
      return result;
    } catch (error) {
      throw new ThrowErrors('validationError', 'All fields must be filled');
    }
  },

  async params(paramsId: IParamsId) {
    try {
      const schema = Joi.object({
        id: Joi.number().required().positive().integer(),
      });

      const result = await schema.validateAsync(paramsId);
      return result;
    } catch (error) {
      throw new ThrowErrors('validationError', 'Id Invalid');
    }
  },
};

export default validation;
