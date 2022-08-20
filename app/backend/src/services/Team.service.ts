import ThrowErrors from '../middlewares/ThrowErros';
import { ITeam } from '../interfaces/Interfaces';
import Team from '../database/models/Team';

export default class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const allTeams = await Team.findAll();
    return allTeams;
  }

  static async getById(id: number): Promise<ITeam> {
    const team = await Team.findOne({
      where: { id }, raw: true,
    });

    if (!team) throw new ThrowErrors('unauthorizedError', 'Team not exists');
    return team as ITeam;
  }
}
