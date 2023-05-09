import { ModelStatic } from 'sequelize';
import Match from '../models/match.model';
import Team from '../models/team.model';
import INewMatch from '../../interfaces/newMatch.interface';

export default class MatchService {
  _model: ModelStatic<Match>;
  _teamModel: ModelStatic<Team>;

  constructor(
    model: ModelStatic<Match>,
    teamModel: ModelStatic<Team>,
  ) {
    this._model = model;
    this._teamModel = teamModel;
  }

  getAll = async (
    inProgress: string | undefined,
  ):Promise<Match[]> => {
    const result = await this._model.findAll({
      include: [
        { model: this._teamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        { model: this._teamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    if (inProgress) {
      return result.filter((match) => match.inProgress === JSON.parse(inProgress));
    }
    return result;
  };

  getById = async (
    id:number,
  ) => {
    const result = await
    this._model.findByPk(id);
    return result;
  };

  finishMatch = async (
    id: number,
  ):Promise<boolean> => {
    const updated = await
    this._model.update({
      inProgress: false,
    }, { where: { id } });
    const isFound = updated[0];
    if (!isFound) {
      return false;
    }
    return true;
  };

  updateMathGoals = async (
    id:number,
    homeTeamGoals:number,
    awayTeamGoals:number,
  ):Promise<boolean> => {
    const updated = await
    this._model.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: { id },
    });
    const isFound = updated[0];
    if (!isFound) {
      return false;
    }
    return true;
  };

  insertNewMatch = async (
    body:INewMatch,
  ):Promise<Match> => {
    const {
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    } = body;
    const inserted = await
    this._model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return inserted;
  };
}
