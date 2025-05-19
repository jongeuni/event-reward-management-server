export class SuccessRs {
  public readonly success: boolean;
  public readonly message: string;

  constructor(success: boolean = true, message: string = '보상이 지급되었습니다.') {
    this.success = success;
    this.message = message;
  }
}