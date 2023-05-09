import sequelize from '../models';
import {
  IFullLeaderboardResult,
  ILeaderboardSqlResult,
} from '../../interfaces/leaderboard.interface';
import {
  awayLeaderBoardQuery,
  homeLeaderBoardQuery,
} from '../../middlewares/querys.middleware';

export default class LeaderboardService {
  private getResultLeaderboard =
  async (query:string):Promise<IFullLeaderboardResult[]> => {
    const [result] = await
    sequelize.query(query) as ILeaderboardSqlResult[][];
    const leaderboard = result.map((team) => {
      const percentageEfficiency = ((
        team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2);
      return { ...team, efficiency: percentageEfficiency };
    });
    return leaderboard;
  };

  public getHomeTeams =
  async (): Promise<IFullLeaderboardResult[]> =>
    this.getResultLeaderboard(
      homeLeaderBoardQuery,
    );

  public getAwayTeams =
  async (): Promise<IFullLeaderboardResult[]> =>
    this.getResultLeaderboard(
      awayLeaderBoardQuery,
    );
}
