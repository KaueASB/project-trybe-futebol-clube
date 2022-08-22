import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { ICreatedMatch, ILeaderboard } from '../interfaces/Interfaces';

export default class LeaderboardService {
  static async homeMatches(id: number) {
    const homeTeam = await Match.findAll({
      raw: true,
      where: { homeTeam: id, inProgress: false },
    });
    return homeTeam;
  }

  static createLeaderboard(matches: ICreatedMatch[]): ILeaderboard {
    const totalGames = matches.length;
    const totalVictories = matches.filter((item) => item.homeTeamGoals > item.awayTeamGoals).length;
    const totalDraws = matches.filter((item) => item.homeTeamGoals === item.awayTeamGoals).length;
    const totalLosses = matches.filter((item) => item.homeTeamGoals < item.awayTeamGoals).length;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsFavor = matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
    return { totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency };
  }

  static sortedMatches(leaderBoard: ILeaderboard[]) {
    const sorted = leaderBoard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor || b.goalsOwn - a.goalsOwn);

    return sorted;
  }

  static async getHomeMatches() {
    const allTeams = await Team.findAll();
    const homeLeaderboard = await Promise.all(allTeams.map(async ({ id, teamName }) => {
      const matchesList = await LeaderboardService.homeMatches(id);
      const leaderBoard = LeaderboardService.createLeaderboard(matchesList);
      return {
        name: teamName,
        ...leaderBoard,
      };
    }));
    return homeLeaderboard;
  }
}
