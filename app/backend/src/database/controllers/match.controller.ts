import { Request, RequestHandler, Response } from 'express';
import MatchService from '../services/match.service';

export default class MatchController {
  _service: MatchService;

  constructor(service: MatchService) {
    this._service = service;
  }

  getAll:RequestHandler = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    const matches = await this._service.getAll(inProgress as string | undefined);
    return res.status(200).json(matches);
  };
}
