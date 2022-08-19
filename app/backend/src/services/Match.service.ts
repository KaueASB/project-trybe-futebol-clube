import { IAddMatch, ICreatedMatch } from '../interfaces/Interfaces';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import ThrowErrors from '../middlewares/ThrowErros';

export default class MatchService {
  static async getAll() {
    const allMatches = await Match.findAll({
      include: [
        { association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return allMatches;
  }

  static async getProgress(inProgress: boolean) {
    const matches = await Match.findAll({
      where: { inProgress },
      include: [
        { association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  static async exists({ homeTeam, awayTeam }: IAddMatch) {
    const teams = [homeTeam, awayTeam];
    const existTeams = await Promise.all(
      teams.map((team) => Team.findByPk(team, { raw: true })),
    );

    if (!existTeams.every((item) => item)) {
      throw new ThrowErrors('validationError', 'Team(s) Invalid(s)');
    }

    return existTeams;
  }

  static async addMatch({ ...args }: IAddMatch): Promise<ICreatedMatch> {
    const match = await Match.create({
      ...args,
    });
    return match as ICreatedMatch;
  }
}
