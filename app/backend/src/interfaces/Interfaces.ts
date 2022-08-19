import { Request } from 'express';
import { Jwt } from 'jsonwebtoken';

export interface ILogin {
  email: string,
  password: string
}

export interface IUserNoPass {
  id: number,
  username: string,
  role: string,
  email: string,
}

export interface IUser extends ILogin {
  id: number,
  username: string,
  role: string
}

export interface IJwt extends Jwt {
  payload: IUserNoPass
}

export interface IRequestUserToken extends Request {
  user?: Jwt
}

export interface ITeam {
  id: number,
  teamName: string
}

export interface IParamsId {
  id?: string
}

export interface IAddMatch {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
}

export interface ICreatedMatch extends IAddMatch {
  id: number,
  inProgress: boolean
}
