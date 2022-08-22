// import { Op } from 'sequelize';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { ICreatedMatch, ILeaderboard } from '../interfaces/Interfaces';

export default class LeaderboardService {
  // static async generalMatches(id: number) {
  //   const matches = await Match.findAll({
  //     raw: true,
  //     where: {
  //       inProgress: false,
  //       [Op.or]: [
  //         { homeTeam: id },
  //         { awayTeam: id },

  //       ],
  //     },
  //   });

  //   return matches;
  // }

  static async homeMatches(id: number) {
    const homeTeam = await Match.findAll({
      raw: true,
      where: { homeTeam: id, inProgress: false },
    });
    return homeTeam;
  }

  static async awayMatches(id: number) {
    const awayTeam = await Match.findAll({
      raw: true,
      where: { awayTeam: id, inProgress: false },
    });
    return awayTeam;
  }

  static createGeneralLeaderboard(boardHome: ILeaderboard, boardAway: ILeaderboard) {
    const totalGames = boardHome.totalGames + boardAway.totalGames;
    const totalVictories = boardHome.totalVictories + boardAway.totalVictories;
    const totalDraws = boardHome.totalDraws + boardAway.totalDraws;
    const totalLosses = boardHome.totalLosses + boardAway.totalLosses;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsFavor = boardHome.goalsFavor + boardAway.goalsFavor;
    const goalsOwn = boardHome.goalsOwn + boardAway.goalsOwn;
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

  static createLeaderboardHome(matches: ICreatedMatch[]): ILeaderboard {
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

  static createLeaderboardAway(matches: ICreatedMatch[]): ILeaderboard {
    const totalGames = matches.length;
    const totalVictories = matches.filter((item) => item.awayTeamGoals > item.homeTeamGoals).length;
    const totalDraws = matches.filter((item) => item.awayTeamGoals === item.homeTeamGoals).length;
    const totalLosses = matches.filter((item) => item.awayTeamGoals < item.homeTeamGoals).length;
    const totalPoints = (totalVictories * 3) + totalDraws;
    const goalsFavor = matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    const goalsOwn = matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
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

  static async getGeneralMatches() {
    const allTeams = await Team.findAll();
    const general = await Promise.all(allTeams.map(async ({ id, teamName }) => {
      const matchesListHome = await LeaderboardService.homeMatches(id);
      const leaderBoardHome = LeaderboardService.createLeaderboardHome(matchesListHome);

      const matchesListAway = await LeaderboardService.awayMatches(id);
      const leaderBoardAway = LeaderboardService.createLeaderboardAway(matchesListAway);

      const generalLeaderBoard = LeaderboardService
        .createGeneralLeaderboard(leaderBoardHome, leaderBoardAway);
      return { name: teamName, ...generalLeaderBoard };
    }));
    return general;
  }

  static async getHomeMatches() {
    const allTeams = await Team.findAll();
    const homeLeaderboard = await Promise.all(allTeams.map(async ({ id, teamName }) => {
      const matchesList = await LeaderboardService.homeMatches(id);
      const leaderBoard = LeaderboardService.createLeaderboardHome(matchesList);
      return {
        name: teamName,
        ...leaderBoard,
      };
    }));
    return homeLeaderboard;
  }

  static async getAwayMatches() {
    const allTeams = await Team.findAll();
    const awayLeaderboard = await Promise.all(allTeams.map(async ({ id, teamName }) => {
      const matchesList = await LeaderboardService.awayMatches(id);
      const leaderBoard = LeaderboardService.createLeaderboardAway(matchesList);
      return {
        name: teamName,
        ...leaderBoard,
      };
    }));
    return awayLeaderboard;
  }
}
