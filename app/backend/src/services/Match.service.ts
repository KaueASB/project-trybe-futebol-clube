// import Team from '../database/models/Team';
// import Team from '../database/models/Team';
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
}
