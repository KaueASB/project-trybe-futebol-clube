import { ErrorRequestHandler } from 'express';
import ThrowErrors from './ThrowErros';

const errors: Record<string, number> = {
  unauthorizedError: 401,
  jsonWebTokenError: 401,
  notFoundError: 404,
  validationError: 400,
  requiredError: 400,
};

const errorHandler: ErrorRequestHandler = (err: ThrowErrors, _req, res, _next) => {
  const { name, message } = err;

  // if (name === 'JsonWebTokenError') {
  //   return res.status(401).json({ message: 'Token must be a valid token' });
  // }

  const status = errors[name[0].toLowerCase() + name.slice(1)];

  if (!status) return res.status(500).json({ message });
  res.status(status).json({ message });
};

export default errorHandler;
