import Match from '../database/models/Match';

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
}
