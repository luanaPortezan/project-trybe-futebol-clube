import { ModelStatic } from 'sequelize';
import Match from '../models/match.model';
import Team from '../models/team.model';

export default class MatchService {
  _model: ModelStatic<Match>;
  _teamModel: ModelStatic<Team>;

  constructor(model: ModelStatic<Match>, teamModel: ModelStatic<Team>) {
    this._model = model;
    this._teamModel = teamModel;
  }

  getAll = async (inProgress: string | undefined):Promise<Match[]> => {
    const result = await this._model.findAll({
      include: [
        { model: this._teamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: this._teamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    if (inProgress) {
      return result.filter((match) => match.inProgress === JSON.parse(inProgress));
    }

    return result;
  };
}
