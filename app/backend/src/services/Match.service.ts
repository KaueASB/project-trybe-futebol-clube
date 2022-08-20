import { IAddMatch, ICreatedMatch } from '../interfaces/Interfaces';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import ThrowErrors from '../middlewares/ThrowErros';

export default class MatchService {
  static async getOne(id: number) {
    const match = await Match.findByPk(id);
    if (!match) {
      throw new ThrowErrors(
        'validationError',
        'Match not exists',
      );
    }
  }

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

  static async existTeams({ homeTeam, awayTeam }: IAddMatch) {
    if (homeTeam === awayTeam) {
      throw new ThrowErrors(
        'unauthorizedError',
        'It is not possible to create a match with two equal teams',
      );
    }

    const teams = [homeTeam, awayTeam];
    const existTeams = await Promise.all(
      teams.map((team) => Team.findByPk(team, { raw: true })),
    );

    if (!existTeams.every((team) => team)) {
      throw new ThrowErrors('notFoundError', 'There is no team with such id!');
    }

    return existTeams;
  }

  static async addMatch({ ...args }: IAddMatch) {
    const match = await Match.create({
      ...args,
    });
    return match as ICreatedMatch;
  }

  static async finishMatch(id: number) {
    await Match.update({ inProgress: false }, {
      where: {
        id,
      },
    });
  }
}
