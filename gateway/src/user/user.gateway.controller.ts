import { Body, Controller, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { SignUpRq } from '../auth/rqrs/sign-up.rq';
import { SignUpRs } from '../auth/rqrs/sign-up.rs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AUTH_SERVER } from '../common/constants/constants';

@ApiTags('UserController - 유저 회원가입')
@Controller('/v1/users')
export class UserGatewayController {
  constructor(private readonly httpService: HttpService) {}

  @ApiOperation({ summary: '회원가입 API', description: '회원가입을 합니다.' })
  @Post()
  async signUp(@Body() rq: SignUpRq): Promise<SignUpRs> {
    const response = await firstValueFrom(
      this.httpService.post<SignUpRs>(`${AUTH_SERVER}/sign-up`, rq),
    );
    return response.data;
  }
}
