import { compareSync } from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import { ILogin, IToken } from '../../interfaces/auth.interface';
import User from '../models/user.model';

export default class LoginService {
  _model: ModelStatic<User>;
  _token: IToken;

  constructor(model: ModelStatic<User>, token: IToken) {
    this._model = model;
    this._token = token;
  }

  login = async (login:ILogin) => {
    const {
      email,
      password,
    } = login;
    const userDB = await
    this._model.findOne({
      where: { email }, raw: true,
    });

    if (!userDB || !compareSync(
      password,
      userDB.password,
    )) {
      return { type: 'Unauthorized', token: '' };
    }
    const { password: pass, ...rest } = userDB;
    const token = this
      ._token.generateToken({ ...rest });
    return { type: '', token };
  };
}
