export class AuthSession {
  constructor(
    public id: string,
    public userId: string,
    public token: string,
    public createdAt: Date,
    public expiresAt: Date,
  ) {}
}
