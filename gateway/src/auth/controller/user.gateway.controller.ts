import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SignUpRq } from './rqrs/sign-up.rq';
import { SignUpRs } from './rqrs/sign-up.rs';
import { ApiOperation } from '@nestjs/swagger';

@Controller('/v1/user')
export class UserGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성합니다.' })
  @Post()
  async signUp(@Body() rq: SignUpRq): Promise<SignUpRs> {
    const response = await firstValueFrom(
      this.httpService.post<SignUpRs>('http://127.0.0.1:3001/sign-up', rq),
    );
    return response.data;
  }
}
