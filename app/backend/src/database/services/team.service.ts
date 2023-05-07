import { ModelStatic } from 'sequelize';
import Team from '../models/team.model';

export default class TeamService {
  _model: ModelStatic<Team>;

  constructor(model: ModelStatic<Team>) {
    this._model = model;
  }

  getAll = async ():Promise<Team[]> => this._model.findAll();
}
