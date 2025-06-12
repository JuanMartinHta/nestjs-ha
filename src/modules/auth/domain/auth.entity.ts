export class AuthSession {
  constructor(
    public id: string,
    public userId: string,
    public token: string,
    public refreshToken: string,
    public expiresIn: number,
    public refreshExpiresIn: number,
  ) {}
}
