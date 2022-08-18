import { ITeam } from '../interfaces/Interfaces';
import Team from '../database/models/Team';

export default class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const allTeams = await Team.findAll();
    return allTeams;
  }
}
