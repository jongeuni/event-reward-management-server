import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SignUpRq } from './rqrs/sign-up.rq';
import { SignUpRs } from './rqrs/sign-up.rs';

@Controller('/v1/accounts')
export class AccountGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  async handleUserRequests(@Body() rq: SignUpRq): Promise<SignUpRs> {
    const response = await firstValueFrom(
      this.httpService.post<SignUpRs>('http://127.0.0.1:3001/sign-up', rq),
    );
    return response.data;
  }
}
