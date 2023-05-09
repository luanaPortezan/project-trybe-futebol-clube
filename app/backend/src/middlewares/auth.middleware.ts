import { NextFunction, Request, Response } from 'express';
import Token from '../auth/jwt.token';

export default class AuthToken {
  checkValidToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const tokenValidate = new Token();
    try {
      const user = tokenValidate.authToken(authorization);
      req.body.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
