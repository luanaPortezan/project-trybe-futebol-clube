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

  finishMatch:RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await this._service.finishMatch(Number(id));
    if (!result) {
      return res.status(404).json({ message: 'Match not found or already finished' });
    }
    return res.status(200).json({ message: 'Finished' });
  };

  updateMathGoals: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const result = await this._service.updateMathGoals(Number(id), homeTeamGoals, awayTeamGoals);
    if (!result) {
      const match = await this._service.getById(Number(id));
      if (!match) { return res.status(404).json({ message: 'Match not found' }); }
    }
    return res.status(200).json({ message: 'Updated' });
  };
}
