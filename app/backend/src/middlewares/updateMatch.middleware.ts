import { NextFunction, Request, Response } from 'express';

export default class CheckUpdateMatchFields {
  checkFields = (req: Request, res: Response, next: NextFunction) => {
    const { homeTeamGoals, awayTeamGoals } = req.body;

    if (!homeTeamGoals || !awayTeamGoals) {
      return res.status(400).json({ message: 'All fields must be filled correctly' });
    }
    next();
  };
}
