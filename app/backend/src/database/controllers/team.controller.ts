import { Response, Request, RequestHandler } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  _service: TeamService;

  constructor(service: TeamService) {
    this._service = service;
  }

  getAll:RequestHandler = async (_req:Request, res: Response) => {
    const teams = await this._service.getAll();
    return res.status(200).json(teams);
  };
}
