import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SignUpRq } from './rqrs/sign-up.rq';
import { SignUpRs } from './rqrs/sign-up.rs';
import { SignInRq } from './rqrs/sign-in.rq';
import { SignInRs } from './rqrs/sign-in.rs';

@Controller('/v1')
export class UserGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Post('/sign-up')
  async signUp(@Body() rq: SignUpRq): Promise<SignUpRs> {
    const response = await firstValueFrom(
      this.httpService.post<SignUpRs>('http://127.0.0.1:3001/sign-up', rq),
    );
    return response.data;
  }

  @Post('/sign-in')
  async signIn(@Body() rq: SignInRq): Promise<SignInRs> {
    const response = await firstValueFrom(
      this.httpService.post<SignInRs>('http://127.0.0.1:3001/sign-in', rq),
    );
    return response.data;
  }
}
