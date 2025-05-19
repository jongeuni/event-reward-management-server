import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SignUpRq } from '../auth/rqrs/sign-up.rq';
import { SignUpRs } from '../auth/rqrs/sign-up.rs';
import { ApiOperation } from '@nestjs/swagger';
import { AUTH_SERVER } from '../common/config/constants';

@Controller('/v1/user')
export class UserGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성합니다.' })
  @Post()
  async signUp(@Body() rq: SignUpRq): Promise<SignUpRs> {
    const response = await firstValueFrom(
      this.httpService.post<SignUpRs>(`${AUTH_SERVER}/sign-up`, rq),
    );
    return response.data;
  }
}
