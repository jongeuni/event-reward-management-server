export class SignInRs {
  constructor(
    readonly accessToken: string,
    readonly refreshToken: string,
  ) {
  }
}
