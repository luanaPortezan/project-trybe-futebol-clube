import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { IAuthToken, IJwtPayload, IToken } from '../interfaces/auth.interface';

dotenv.config();

export default class Token implements IToken {
  private _jwt;
  private _secret: jwt.Secret;
  private _options: jwt.SignOptions;

  constructor() {
    this._jwt = jwt;
    this._secret = process.env.JWT_SECRET || 'VSS20';
    this._options = {
      expiresIn: '5d',
      algorithm: 'HS256',
    };
  }

  generateToken(user: IJwtPayload) {
    const token = this._jwt.sign(user, this._secret, this._options);
    return token;
  }

  authToken(token: string): IAuthToken {
    const result = this._jwt.verify(token, this._secret);
    return result as IAuthToken;
  }
}
