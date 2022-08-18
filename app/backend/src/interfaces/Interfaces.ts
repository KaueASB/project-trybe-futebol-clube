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
