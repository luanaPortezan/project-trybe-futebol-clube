export interface ILeaderboardSqlResult {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,

}

export interface IFullLeaderboardResult extends ILeaderboardSqlResult {
  efficiency: string,
}
